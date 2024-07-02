import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);
  } catch (error: any) {
    console.log(`Webhook Error: ${error.message}`, { status: 400 });
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  // const courseId = session?.metadata?.courseId;
  const tierId = session?.metadata?.tierId;
  //console.log("Missing Metadata (userIddddd or tierId)", { userId, tierId });
  if (event.type.match("checkout.session.completed")) {
    if (!userId || !tierId) {
      console.log(" (!userId || !tierId) Missing Metadata (userI or tierId)", { userId, tierId });
      return new NextResponse(
        "Webhook Error : Missing Metadata (userI or tierId)",
        { status: 400 }
      );
    }
    const subscription = await db.stripeCustomer.update({
      where: {
        //stripeCustomerId: userId,
        userId: userId,
        //tier: tierId,
      },
      data: {
        tier: tierId,
        userId: userId,
        
      }
    })
    const updatedUser = await db.user.update({
      where: {
        clerkId: userId,
      },
      data: {
        tierId: tierId,
      }
    })
    if(!updatedUser){
      return new NextResponse("User Not Found", { status: 404 });
    }

    if(!subscription){
      console.log(subscription)
      return new NextResponse("Subscription Not Found", { status: 404 });
    }

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