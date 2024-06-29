import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";

export async function getUserSubscriptionTier(userId: string) {
    const currentuser = auth();


    if (!currentuser){
        return redirect("/");
    }

    const usertier = await db.user.findUnique({
        where: {
            clerkId: userId,
        },
        include: {
            tier: true,
        }
    });
    return usertier?.tier;

    //const isSubscribed = 
}