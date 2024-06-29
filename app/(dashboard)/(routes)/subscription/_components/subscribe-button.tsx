"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SubscribeButton = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSubscribe = () => {
    // Redirect to payment page or handle subscription initiation

    return;
  };

  const handleTierChange = (tier: string) => {
    // Update the user's tier

    return;
  };

  return (
    <>
      <button
        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded focus:outline-none"
        onClick={() => setIsOpen(true)}
      >
        Subscribe Now
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a Tier</DialogTitle>
            <DialogDescription>
              Select the tier you want to subscribe to.
            </DialogDescription>
            <DialogDescription className="text-yellow-800">
              NOTE: Subscribing to a tier is a one-time purchase only.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-row gap-x-2 justify-evenly pb-6 items-center">
            <Button
              onClick={() => handleTierChange("academic")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Academic
            </Button>
                or 
            <Button
              onClick={() => handleTierChange("magister")}
              className="bg-amber-400 hover:bg-amber-500 text-white"
            >
              Magister
            </Button>
          </div>

          <DialogClose>
            <Button className="bg-red-500 hover:bg-red-600 text-white">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscribeButton;