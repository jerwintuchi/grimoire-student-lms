"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import qs from "query-string";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: currentCategoryId,
          title: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedValue, currentCategoryId, router, pathname]);

  return (
    <div className="relative">
      <SearchIcon className=" h-4 w-4 absolute top-3 left-3 text-[#b91c1c]" />
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        className="w-full md:w-[300px] pl-9 rounded-full bg-[#242227] focus-visible:ring-[#b91c1c] border border-[#b91c1c] text-[#b91c1c] "
        placeholder="Find Spells to learn..."
      />
    </div>
  );
};
