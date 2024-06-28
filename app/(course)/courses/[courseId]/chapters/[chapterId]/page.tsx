import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";
import { formatPrice } from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
const ChapterIdPage = async ({
  params,
}: {
  params: { chapterId: string; courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }
  if (course) {
    const tierId = course?.tier?.id;
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;
  const freeUser = chapter.isFree && !purchase;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have finished this chapter" variant="success" />
      )}

      {isLocked && (
        <Banner
          label="You need to purchase a tier for this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center">
            <h2 className="text-2xl font-semibold mb-2 text-[#b98ee4] mr-4 ">
              {chapter.title}
            </h2>
            {purchase ? (
              <div>{/* TODO Add CourseProgressButton */}</div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                tier={formatPrice(course?.tier?.price!)}
              />
            )}
          </div>
          <Separator className="mb-4 bg-[#b98ee4]" />
          <div>
            <Preview value={chapter.description!} />
          </div>
          {!!attachments?.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments?.map((attachment) => (
                  <a
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-[#853bce] hover:bg-[#853bce] border rounded-md hover:underline">
                    <File />
                    <p className="line-clamp-1">{attachment.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
