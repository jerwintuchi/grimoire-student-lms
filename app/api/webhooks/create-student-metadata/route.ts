import { Prisma, PrismaClient } from "@prisma/client";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";
import { IncomingHttpHeaders } from "http";
import { NextResponse } from "next/server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

const prisma = new PrismaClient();
const webhookSecret = process.env.STUDENT_PROD_WEBHOOK_METADATA || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  const wh = new Webhook(webhookSecret);

  type EventType = "user.created" | "user.updated" | "user.deleted";

  interface ClerkEvent {
    data: {
      id: string;
      publicMetadata?: Record<string, any>;
      privateMetadata?: Record<string, any>;
    };
    object: "event";
    type: EventType;
  }

  let evt: ClerkEvent | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as ClerkEvent;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType = evt.type;

  const { id, publicMetadata, privateMetadata } = evt.data;
  const defaultrole = privateMetadata?.role || "student"; // Default role to 'student'
  let userdata: Prisma.UserCreateInput;

  const user = await currentUser();
  //LOGIC FOR FIRST TIME USER CREATION
  if (eventType === "user.created") {
    await clerkClient.users.updateUserMetadata(id, {
      publicMetadata: {
        role: defaultrole,
      },
    });
    await prisma.user.create({
      data: {
        clerkId: id,
        clerkAttributes: {
          publicMetadata: {
            role: defaultrole,
          },
        },
        role: defaultrole, // Add this line
      },
    });
    return NextResponse.json(
      { message: "User is created as student by default" },
      { status: 200 }
    );
  }

  if (eventType === "user.updated") {
    const updatedUser = await clerkClient.users.getUser(evt.data.id);
    const newRole = updatedUser.privateMetadata?.role as string; // Access user role from custom attribute
    await prisma.user.update({
      where: { clerkId: evt.data.id },
      data: {
        role: defaultrole, // Update role column in Prisma based on Clerk data
        clerkAttributes: {
          privateMetadata: {
            role: defaultrole,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "User is now teacher" },
      { status: 200 }
    );
  } else if (eventType === "user.deleted") {
    await prisma.user.delete({
      where: { clerkId: evt.data.id },
    });

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  }

  return NextResponse.json(
    { message: "Unhandled event type" },
    { status: 400 }
  );
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
