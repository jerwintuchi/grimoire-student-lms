"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { LucideBookPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; // Use next/navigation for useRouter

interface CourseEnrollButtonProps {
  tier: string;
  courseId: string;
  userId: string;
  isEnrolled: boolean;
}

const CourseEnrollButton = ({
  tier,
  courseId,
  userId,
  isEnrolled,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/enroll`, {
        courseId,
        userId,
      });

      if (response.status === 200) {
        toast.success("Successfully enrolled");
        router.refresh();
        //router.push(`/courses/${courseId}`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading || isEnrolled}
      size="lg"
      className="w-full text-md md:w-auto text-gray-600 bg-green-500 hover:text-white hover:bg-green-600 rounded-full"
    >
      <LucideBookPlus className="w-4 h-4 mr-2" />
      {isEnrolled ? "Already Enrolled" : `Enroll for ${tier}`}
    </Button>
  );
};

export default CourseEnrollButton;
