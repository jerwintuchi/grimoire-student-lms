"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IconBadge } from "@/components/ui/icon-badge";
import { BookOpenText } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  imageUrl: string;
  chaptersLength: number;
  tier: string;
  progress: number | null;
  category: string | null;
}

const getTierStyles = (tier: string) => {
  switch (tier.toLowerCase()) {
    case "magister":
      return {
        borderColor: "#daa520", // gold
        titleColor: "#6a1b9a", // purple
        badgeColor: "#daa520", // gold
      };
    case "academic":
      return {
        borderColor: "#1565c0", // blue
        titleColor: "#90caf9", // light blue
        badgeColor: "#1565c0", // blue
      };
    case "free":
      return {
        borderColor: "#2e7d32", // green
        titleColor: "#a5d6a7", // light green
        badgeColor: "#2e7d32", // green
      };
    default:
      return {
        borderColor: "#291839", // purple
        titleColor: "#b98ee4", // light purple
        badgeColor: "#291839", // purple
      };
  }
};

export const CourseCard = ({
  id,
  title,
  imageUrl,
  chaptersLength,
  tier,
  progress,
  category,
}: CourseCardProps) => {
  const { borderColor, titleColor, badgeColor } = getTierStyles(tier);

  return (
    <Link href={`/courses/${id}`}>
      <div
        className="group hover:shadow-sm transition overflow-hidden border-2 rounded-lg h-full hover:text-[#cdb6e4] relative"
        style={{
          borderColor, // Set border color based on tier
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            unoptimized
            fill
            className="object-cover"
            alt={title}
            src={imageUrl}
          />
        </div>
        <div className="relative z-10 flex flex-col justify-end h-full  p-3">
          <div className="absolute top-0 right-0 m-2 p-1 rounded  bg-opacity-70 text-white">
            <Badge
              className="text-white"
              style={{
                backgroundColor: badgeColor, // Set badge color based on tier
              }}
            >
              {tier}
            </Badge>
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 p-2 rounded bg-opacity-70 text-white">
            <Badge
              className="text-white"
              style={{
                backgroundColor: badgeColor, // Set badge color based on tier
              }}
            >
              {category}
            </Badge>
          </div>
          <div className=" p-3 rounded">
            <div
              className="font-medium text-lg text-center transition line-clamp-2"
              style={{
                color: titleColor, // Set title color based on tier
              }}
            >
              {title}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Badge
                className="text-white"
                style={{
                  backgroundColor: badgeColor, // Set badge color based on tier
                }}
              >
                {category}
              </Badge>
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1" style={{ color: titleColor }}>
                <IconBadge size="sm" icon={BookOpenText} />
                <span>
                  {chaptersLength}{" "}
                  {chaptersLength === 1 ? "Chapter only" : "Chapters"}
                </span>
              </div>
            </div>
            <div>
              {progress !== null ? (
                <div>TODO: PROGRESS COMPONENT</div>
              ) : (
                <p className="text-[#f3e66e]">For {tier} tier users</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
