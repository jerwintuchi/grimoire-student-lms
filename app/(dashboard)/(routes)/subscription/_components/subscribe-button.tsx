"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscribeButtonProps {
  userId: string;
  currentTier: string;
}

const SubscribeButton = ({ userId, currentTier }: SubscribeButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (tierId: string) => {
    if (currentTier === tierId) {
      toast.error("You are already subscribed to this tier.");
      return;
    }
    if ((currentTier === "Magister" && tierId === "Academic") || (currentTier === "Magister" && tierId === "Free") || (currentTier === "Academic" && tierId === "Free")) {
      toast.error("Downgrading is not allowed.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/billing", {
        tierId,
        userId,
      });
      window.location.assign(response.data.url);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        {
          currentTier === "Free" && "Upgrade to Academic" ||
          currentTier === "Academic" && "Upgrade to Magister"
        }
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Tier</DialogTitle>
            <DialogDescription className="text-lg text-center">
              {
                currentTier === "Free" && ("Select the tier you want to subscribe to.") ||
                currentTier === "Academic" && "Upgrade to Magister Tier" ||
                currentTier === "Magister" && "You are now on Magister Tier. Enjoy the powerful spells."
              }
              
            </DialogDescription>
            <DialogDescription className="text-yellow-800 text-center pb-4">
              NOTE: Subscribing to a tier is a one-time purchase only.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-x-2 justify-evenly pb-6 items-center">
            <Button
              disabled={isLoading || currentTier === "Academic" || currentTier === "Magister"}
              onClick={() => handleSubscribe("Academic")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Academic
            </Button>
            <span>or</span>
            <Button
              disabled={isLoading || currentTier === "Magister"}
              onClick={() => handleSubscribe("Magister")}
              className="bg-amber-400 hover:bg-amber-500 text-white"
            >
              Magister
            </Button>
          </div>

          <DialogClose>
            <Button disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white">
              Cancel
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeButton;
