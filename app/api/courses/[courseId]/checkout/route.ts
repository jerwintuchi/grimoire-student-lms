// import { db } from "@/lib/db";

// import { currentUser } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe";

// export async function POST(
//   req: Request,
//   { params }: { params: { courseId: string } }
// ) {
//   try {
//     const user = await currentUser();
//     if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     const course = await db.course.findUnique({
//       where: {
//         id: params.courseId,
//         isPublished: true,
//       },
//       include: {
//         tier: true,
//       },
//     });
//     const purchase = await db.purchase.findUnique({
//       where: {
//         userId_courseId: {
//           userId: user.id,
//           courseId: params.courseId,
//         },
//       },
//     });
//     //if the user has already purchased the course, return an error
//     if (purchase) {
//       return new NextResponse("Already purchased", { status: 400 });
//     }

//     if (!course) {
//       return new NextResponse("Course Not Found", { status: 404 });
//     }

//     const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
//     //if the course is free
//     if (course.tier?.price === 0) {
//       line_items.push({
//         quantity: 1,
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: course.title,
//             description: course.description!,
//           },
//           unit_amount: 0,
//         },
//       });
//     } else {
//       line_items.push({
//         quantity: 1,
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: course.title,
//             description: course.description!,
//           },
//           unit_amount: course?.tier?.price! * 100,
//         },
//       });
//     }

//     let stripeCustomer = await db.stripeCustomer.findUnique({
//       where: {
//         userId: user.id,
//       },
//       select: {
//         stripeCustomerId: true,
//       },
//     });
//     //first time purchase
//     if (!stripeCustomer) {
//       const customer = await stripe.customers.create({
//         email: user.emailAddresses?.[0]?.emailAddress,
//       });
//       //create the user data to stripe db
//       stripeCustomer = await db.stripeCustomer.create({
//         data: {
//           userId: user.id,
//           stripeCustomerId: customer.id,
//         },
//       });
//     }

//     const session = await stripe.checkout.sessions.create({
//       customer: stripeCustomer.stripeCustomerId,
//       line_items, // add in the line items
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?cancelled=1`,
//       metadata: {
//         courseId: course.id, // this course ------------------------------------------
//         userId: user.id, //lets the webhook know that this user purchases the course ^^^
//       },
//     });

//     return NextResponse.json({ url: session.url });
//   } catch (error) {
//     console.log("[COURSE_ID_CHECKOUT] Error:", error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
