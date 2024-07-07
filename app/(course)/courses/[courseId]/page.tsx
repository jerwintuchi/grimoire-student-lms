import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { useState, useEffect } from "react";
import CourseEnrollButton from "./chapters/[chapterId]/_components/course-enroll-button";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const user = await currentUser();

  if (!user) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
      },
      enrollments: true,
      tier: true,
    },
  });

  if (!course) {
    return redirect("/");
  }


  const usertier = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      tier: true,
    },
  });

  if (!usertier?.tierId) {
    console.log("no tier");
    return redirect("/");
  }

  const currentUserTier = usertier.tierId.toLowerCase();
  const selectedCourseTier = course.tierId?.toLowerCase() || "free";

  const accessMap: { [key: string]: string[] } = {
    free: ["free"],
    academic: ["free", "academic"],
    magister: ["free", "academic", "magister"],
  };

  if (!accessMap[currentUserTier].includes(selectedCourseTier)) {
    return redirect("/subscription");
  }

  const isEnrolled = course.enrollments.some(
    (enrollment) => enrollment.userId === user.id
  );

  if (!course) {
    return redirect("/");
  }

  return redirect(
    `/courses/${params.courseId}/chapters/${course.chapters[0].id}`
  );
};

export default CourseIdPage;
