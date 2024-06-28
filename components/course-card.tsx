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
        hoverColor: "#ffd700", // bright gold
      };
    case "academic":
      return {
        borderColor: "#1565c0", // blue
        titleColor: "#90caf9", // light blue
        badgeColor: "#1565c0", // blue
        hoverColor: "#1e88e5", // bright blue
      };
    case "free":
      return {
        borderColor: "#2e7d32", // green
        titleColor: "#a5d6a7", // light green
        badgeColor: "#2e7d32", // green
        hoverColor: "#43a047", // bright green
      };
    default:
      return {
        borderColor: "#291839", // purple
        titleColor: "#b98ee4", // light purple
        badgeColor: "#291839", // purple
        hoverColor: "#7e57c2", // bright purple
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
  const { borderColor, titleColor, badgeColor, hoverColor } = getTierStyles(tier);

  return (
    <Link href={`/courses/${id}`}>
      <div
        className="group transition overflow-hidden border-2 rounded-lg h-full relative bg-white"
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
        <div
          className="absolute inset-0 border-4 m-2 rounded-lg pointer-events-none transition-all duration-300 group-hover:border-opacity-50"
          style={{
            borderColor: borderColor, // Set decorative border color based on tier
          }}
        ></div>
        <div className="relative z-10 flex flex-col justify-end h-full p-3 bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="absolute top-2 right-2 p-1 rounded bg-opacity-70 text-white transition-all duration-300"
            style={{
              backgroundColor: badgeColor, // Set badge background color based on tier
            }}
          >
            <Badge className="text-white group-hover:bg-opacity-100">{category}</Badge>
          </div>
          <div className="bg-black bg-opacity-70 p-3 rounded transition-all duration-300 group-hover:bg-opacity-20 mt-auto">
            <div
              className="font-medium text-lg text-center transition pt-6 pb-6 line-clamp-2"
              style={{
                color: titleColor, // Set title color based on tier
              }}
            >
              {title}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <Badge className="text-white transition-all duration-300 group-hover:bg-opacity-100"
                style={{
                  backgroundColor: badgeColor, // Set badge background color based on tier
                }}
              >
                {tier}
              </Badge>
            </p>
            <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
              <div className="flex items-center gap-x-1 transition-all duration-300 group-hover:text-opacity-80" style={{ color: titleColor }}>
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
        <style jsx>
          {`
          .group:hover .font-medium {
            color: ${hoverColor} !important;
          }
          .group:hover .absolute,
          .group:hover .border-2 {
            border-color: ${hoverColor} !important;
          }
        `}</style>
      </div>
    </Link>
  );
};
