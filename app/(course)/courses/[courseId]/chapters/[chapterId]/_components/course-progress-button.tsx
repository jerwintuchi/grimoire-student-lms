"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { BookOpenCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
interface CourseProgressButtonProps {
    userId: string;
    courseId: string;
    chapterId: string;
    isCompleted: boolean;
    nextChapterId?: string;
}
export const CourseProgressButton = ({
    userId,
    courseId,
    chapterId,
    isCompleted,
    nextChapterId,
}: CourseProgressButtonProps) => {
    const Icon = isCompleted ? CircleX : BookOpenCheck;
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const onClick = async () => {
        try {
            setIsLoading(true);
            
            await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
                isCompleted: !isCompleted,
            })

            if(!isCompleted && !nextChapterId){ //if not completed and no next chapter, means we reached end of the course

            }
            if(!isCompleted && nextChapterId){ // as long as there is a next chapter, we can go to the next chapter
                router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
            toast.success("Progress Updated");

        } catch (error) {
            toast.error("Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Button
            onClick={onClick}
            disabled={isLoading}
            type="button"
            variant={isCompleted ? "outline" : "success"}
            className="flex w-full md:w-auto"
            >
                {isCompleted ? "Not mastered yet" : "Complete Chapter"}
                <Icon className="h-4 w-4 ml-2"/>
            </Button>
        </div>
    )
}
