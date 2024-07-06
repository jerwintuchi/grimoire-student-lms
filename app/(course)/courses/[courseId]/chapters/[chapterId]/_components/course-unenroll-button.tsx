"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CourseUnenrollButtonProps {
  tier: string;
  courseId: string;
  userId: string;
  isEnrolled: boolean;
}

const CourseUnenrollButton = ({
  tier,
  courseId,
  userId,
  isEnrolled,
}: CourseUnenrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.delete(`/api/unenroll/${courseId}`, {
        data: {
          userId,
        },
      });

      if (response.status === 200) {
        toast.success("Successfully unenrolled");
        router.refresh();
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
      disabled={isLoading}
      size="lg"
      className="w-full text-md md:w-auto text-gray-600 bg-green-500 hover:text-white hover:bg-green-600 rounded-full"
    >
      {isEnrolled && "Unenroll from this course"}
    </Button>
  );
};

export default CourseUnenrollButton;
