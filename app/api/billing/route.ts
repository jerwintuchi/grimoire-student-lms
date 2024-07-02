import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { tierId, userId } = await req.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const tier = await db.tier.findUnique({
      where: { id: tierId },
    });

    if (!tier) {
      return new NextResponse("Tier not found", { status: 404 });
    }

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: { userId },
      select: { stripeCustomerId: true },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user?.emailAddresses?.[0]?.emailAddress,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId,
          stripeCustomerId: customer.id,
        },
      });
    }

    const priceId = tierId === "Academic" ? process.env.STRIPE_ACADEMIC_PRICE_ID : process.env.STRIPE_MAGISTER_PRICE_ID;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?cancelled=1`,
      metadata: { tierId, userId },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[TIER_ID_CHECKOUT] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
