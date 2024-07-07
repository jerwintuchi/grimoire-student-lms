"use client";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import LoadingCircles from "@/components/loading-circles";
import { Lock } from "lucide-react";

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: string;
  nextChapterId?: string;
  isLocked?: boolean;
  completeOnEnd?: boolean;
  title: string;
  isEnrolled?: boolean;
}

const VideoPlayer = ({
  playbackId,
  courseId,
  chapterId,
  nextChapterId,
  isLocked,
  completeOnEnd,
  title,
  isEnrolled,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="h-[50vh] w-[70vw] inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20 border border-gray-700/10 rounded-2xl">
          <LoadingCircles />
        </div>
      )}
      {isLocked && (
        <div className="h-[50vh] w-[70vw] inset-0 flex items-center justify-center flex-col gap-y-2 text-secondary bg-gray-800 border border-[#853bce] rounded-2xl">
          <Lock className="h-8 w-8" />
          <p className="text-sm">This chapter is locked</p>
        </div>
      )}
      {!isLocked && isEnrolled && (
        <MuxPlayer
          title={title}
          className={isReady ? "" : "hidden"}
          onCanPlay={() => setIsReady(true)}
          playbackId={playbackId}
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
