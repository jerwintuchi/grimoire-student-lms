// components/course-card-server.tsx
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { CourseCard } from "./course-card";


interface CourseCardServerProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  tier: string;
  progress: number | null;
  category: string | null;
}

const CourseCardServer = async ({
  id,
  title,
  imageUrl,
  chaptersLength,
  tier,
  progress,
  category,
}: CourseCardServerProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const enrolled = await db.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: id,
      },
    },
  });

  return (
    <CourseCard
      id={id}
      title={title}
      imageUrl={imageUrl}
      chaptersLength={chaptersLength}
      tier={tier}
      progress={progress}
      category={category}
      enrolled={!!enrolled}
    />
  );
};

export default CourseCardServer;
