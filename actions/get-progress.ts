import { db } from "@/lib/db";

export const getProgress = async (
  userId: string,
  courseId: string
): Promise<number> => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId: courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await db.userProgress.findMany({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
      },
      select: {
        isCompleted: true,
      },
    });

    const progresPercentage =
      (validCompletedChapters.length / publishedChapters.length) * 100;

    return progresPercentage;
  } catch (error) {
    console.log("GET_PROGRESS_ERROR", error);
    return 0;
  }
};
