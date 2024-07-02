import React from "react";
import { Check, X } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import SubscribeButton from "./_components/subscribe-button";

const SubscriptionPage = async () => {
    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }
  
    // Fetch user data including tier
    const usertier = await db.user.findUnique({
      where: {
        clerkId: userId,
      },
      include: {
        tier: true,
      },
    });

    const tiers = await db.tier.findMany();
  
    // Determine the current tier of the user
    let currentTier = "free"; // Default to free tier if not found
    if (usertier && usertier.tierId) {
      currentTier = usertier.tierId; // Assuming tierId is either "free", "academic", or "magister"
    }
  


  return (
    <>
     <div className="flex-col via-pink-500 to-red-500 w-full h-full flex items-center justify-center p-5">
        <div className="bg-white items-center overflow-hidden w-full max-w-4xl">
          <h2 className="text-center text-3xl  mt-8 pb-2">
            Your Current Tier is {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
          </h2>
          <div className="flex justify-center pb-2">
            {
              currentTier === "Magister" ?
               (
                <div></div>
              ) : (
                <SubscribeButton userId={userId} currentTier={currentTier}/>
              )
            }
            
            </div> 
        </div>
    
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          <thead>
            <tr className="hover:bg-gray-100">
              <th className="w-1/4 text-center p-4 bg-indigo-700 text-white font-bold">Features</th>
              <th className="w-1/4 text-center p-4 bg-green-600 text-white font-bold">{tiers[0].id}</th>
              <th className="w-1/4 text-center p-4 bg-indigo-500 text-white font-bold">{tiers[1].id}</th>
              <th className="w-1/4 text-center p-4 bg-amber-400 text-white font-bold">{tiers[2].id}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Price</td>
              <td className="text-center p-4">${tiers[0].price}</td>
              <td className="text-center p-4">${tiers[1].price}</td>
              <td className="text-center p-4">${tiers[2].price}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Basic Spells</td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Advanced Spells</td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Master Spells</td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Access to Spell Library</td>
              <td className="text-center p-4">Limited</td>
              <td className="text-center p-4">Extensive</td>
              <td className="text-center p-4">Unlimited</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Community Access</td>
              <td className="text-center p-4">Limited</td>
              <td className="text-center p-4">Full</td>
              <td className="text-center p-4">VIP</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Apprenticeship</td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4">Monthly</td>
              <td className="text-center p-4">Weekly</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="text-center p-4 font-semibold">Earn Runes for Rank</td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4"><X className="inline-block text-red-500" /></td>
              <td className="text-center p-4"><Check className="inline-block text-green-500" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default SubscriptionPage;
