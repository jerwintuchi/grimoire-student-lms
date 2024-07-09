import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import getChapter from "@/actions/get-chapter";
import Banner from "@/components/banner";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";

import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";
import { File } from "lucide-react";
import { db } from "@/lib/db";
import { CourseProgressButton } from "./_components/course-progress-button";
import CourseUnenrollButton from "./_components/course-unenroll-button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    enrollment
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const courseDetails = await db.course.findUnique({
    where: { id: params.courseId },
    select: {
      userId: true,
      title: true,
      description: true,
    },
  });

  const courseOwner = await db.user.findUnique({
    where: {
      clerkId: courseDetails?.userId,
    },
    select: {
      clerkAttributes: true,
    },
  });

  if (!courseDetails || !courseOwner) {
    return redirect("/");
  }

  const { username } = (courseOwner!.clerkAttributes as { attributes: { username: string } }).attributes || {};

  const enroll = await db.enrollment.findFirst({
    where: {
      userId: userId,
      courseId: params.courseId,
    },
  });
  const isEnrolled = !!enroll;
  const isLocked = !chapter.isFree && !enrollment;
  const completeOnEnd = !!enrollment && !userProgress?.isCompleted;

  // Debugging logs
  console.log('userId:', userId);
  console.log('isEnrolled:', isEnrolled);
  console.log('isLocked:', isLocked);
  console.log('completeOnEnd:', completeOnEnd);

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner label="You have mastered this chapter" variant="success" />
      )}

      {isLocked && (
        <Banner
          label="You need to enroll first in this course to view this chapter"
          variant="warning"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          {enrollment ? (
            <VideoPlayer
              chapterId={params.chapterId}
              title={chapter.title}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              playbackId={muxData?.playbackId!}
              isLocked={isLocked}
              completeOnEnd={completeOnEnd}
              isEnrolled={isEnrolled}
            />
          ) : (
            <Card className="p-4">
              <CardHeader>
                <Badge className="w-20 justify-center">
                  Publisher
                </Badge>
                <strong>{username}</strong>
              </CardHeader>
              <CardDescription>
                {courseDetails.description}
              </CardDescription>
            </Card>
          )}
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center">
            <h2 className="text-2xl font-semibold mb-2 text-gray-600 mr-4">
              {chapter.title}
            </h2>
            {enrollment ? (
              <div className="flex flex-row items-center gap-4">
                <div>
                  <CourseProgressButton
                    chapterId={params.chapterId}
                    courseId={params.courseId}
                    nextChapterId={nextChapter?.id}
                    isCompleted={!!userProgress?.isCompleted}
                  />
                </div>
                <div>
                  <CourseUnenrollButton
                    courseId={params.courseId}
                    tier={course?.tier?.id!}
                    userId={userId}
                    isEnrolled={isEnrolled}
                  />
                </div>
              </div>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                tier={course?.tier?.id!}
                userId={userId}
                isEnrolled={isEnrolled}
              />
            )}
          </div>
          <Separator className="mb-4 bg-gray-600" />
          {(enrollment || chapter.isFree) && (
            <>
              <div>
                <Preview value={chapter.description!} />
              </div>
              <Card className="p-4">
                <CardHeader>
                  <h3 className="text-xl font-semibold">Quiz</h3>
                </CardHeader>
                <CardContent>
                  Sample Quiz Content for {chapter.title}
                </CardContent>
                <CardDescription>
                  Question 1: Sample Question?
                  <br />
                  Options: Sample Answer 1, Sample Answer 2, Sample Answer 3, Sample Answer 4
                  <br />
                </CardDescription>
              </Card>
              {!!attachments?.length && (
                <>
                  <Separator />
                  <div className="p-4">
                    {attachments.map((attachment) => (
                      <a
                        href={attachment.url}
                        target="_blank"
                        key={attachment.id}
                        className="flex items-center p-3 w-full bg-gray-500 hover:bg-gray-600 border rounded-md hover:underline"
                      >
                        <File />
                        <p className="line-clamp-1">{attachment.name}</p>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
