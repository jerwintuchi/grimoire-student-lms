import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

const getChapter = async ({ userId, courseId, chapterId }: GetChapterProps) => {
  try {

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        tier: true,
        enroll: true,
        enrollments: true,
      },
    });
    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;


      attachments = await db.attachment.findMany({
        where: {
          courseId: courseId,
        },
      });
  

    if (chapter.isFree ) { // TODO : CONVERT
      muxData = await db.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId: courseId,
          isPublished: true,
          position: {
            gt: chapter?.position, // next chapter position is greater than the current chapter's position
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]: ", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChatper: null,
      userProgress: null,
      purchase: null,
    };
  }
};

export default getChapter;
