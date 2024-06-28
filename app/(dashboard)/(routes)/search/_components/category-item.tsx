"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons/lib";
import qs from "query-string";
interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
}

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");

  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-1 px-3 text-sm border border-gray-600 rounded-full hover:border-gray-900 hover:text-gray-900 flex items-center gap-x-1 transition",
        isSelected &&
          "bg-red-600 border-red-600 text-white hover:text-white" //change style if active
      )}>
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};
