import { db } from "@/lib/db";
import { Categories } from "./_components/categories";

import { getCourses } from "@/actions/get-courses";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
import { SearchInput } from "@/components/search-input";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="w-full">
        <div className="px-6 pt-6 md:mb-0 block">
          <SearchInput />
        </div>
        <div className="p-6 space-y-4 text-gray-600">
          <Categories items={categories} />
          <CoursesList items={courses} enrolled={false} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
