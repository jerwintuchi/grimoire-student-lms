import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event!: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (error: any) {
    console.log(`Webhook Error: ${error.mesage}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;
  const tierId = session?.metadata?.tierId;

  if (event.type.match("checkout.session.completed")) {
    if (!userId || !courseId || !tierId) {
      return new NextResponse(
        "Webhook Error : Missing Metadata (userI or courseId)",
        { status: 400 }
      );
    }
    await db.purchase.create({
        data: {
          userId,
          tierId,
          courseId,
      },
    });
  } else {
    return new NextResponse(
      `Webhook Error : Unhandled event type ${event.type}`,
      {
        status: 200,
      }
    );
  }

  return NextResponse.json(null, { status: 200 });
}
