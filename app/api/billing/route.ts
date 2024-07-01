import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: Request,
  // { params }: { params: { courseId: string } }
) {
  try {
    const body = await req.json();
    const { tierId } = body
    const user = await currentUser();
    if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const usertier = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        tier: true,
      },
    })

    if (!usertier) {
      return new NextResponse("User with a tierNot Found", { status: 404 });
    }


    const tier = await db.tier.findUnique({
      where: {
        id: tierId,
      }
    })
    if(!tier){
      return new NextResponse("Tier Not Found", { status: 404 });
    }
    // const course = await db.course.findUnique({
    //   where: {
    //     id: params.courseId,
    //     isPublished: true,
    //   },
    //   include: {
    //     tier: true,
    //   },
    // });
    const purchase = await db.purchase.findUnique({
      where: {
        userId_tierId: {
          userId: user.id,
          tierId: tier.id,
        },
      },
    });
    //if the user has already purchased the tier, return an error
    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    // if (!course) {
    //   return new NextResponse("Course Not Found", { status: 404 });
    // }


    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    //if the tier is free
    if (usertier?.tier?.price === 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: tier.name[0].toUpperCase() + tier.name.slice(1) + " Tier",
            description: tier.description,
          },
          unit_amount: 0,
        },
      });
    } else {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "usd",
          product_data: {
            name: tier.name[0].toUpperCase() + tier.name.slice(1) + " Tier",
            description: tier.description,
          },
          unit_amount: tier.price * 100,
        },
      });
    }

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });
    //first time purchase
    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        email: user.emailAddresses?.[0]?.emailAddress,
      });
      //create the user data to stripe db
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items, // add in the line items
      mode: "payment", // one-time
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/?cancelled=1`,
      metadata: {
        tierId: tier.id,
        userId: user.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[TIER_ID_CHECKOUT] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
