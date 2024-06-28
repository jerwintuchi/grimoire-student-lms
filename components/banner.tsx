import { CircleAlert, CheckCircle2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-orange-400 border-red-300 text-primary items-center",
        success: "bg-emerald-200/80 border-emerald-30 text-secondary",
      },
      defaultVariants: {
        variant: "warning",
      },
    },
  }
);
const iconMap = {
  warning: CircleAlert,
  success: CheckCircle2,
};

interface BannerProps extends VariantProps<typeof bannerVariants> {
  label: string;
}
const Banner = ({ label, variant }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(bannerVariants({ variant }))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};

export default Banner;
