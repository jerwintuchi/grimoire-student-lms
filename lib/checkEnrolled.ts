import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db";

export const checkEnrolled = async (courseId: string) => {
    const { userId } = auth();
    if (!userId) {return redirect("/");}

    const course = await db.course.findUnique({
    where: {
        id: courseId,
    },
    include: {
        chapters: true,
    },
    })

    const enrolled = await db.enrollment.findUnique({
    where: {
        userId_courseId: {
        userId,
        courseId: course?.id!,
        },
    },
    })

    if(enrolled){
        return true;
    }
    else
    {
        return false;
    }
}
