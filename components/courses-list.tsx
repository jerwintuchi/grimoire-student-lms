import { Category, Course } from "@prisma/client";
import { CourseCard } from "./course-card";
import CourseCardServer from "./course-card-server";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CoursesListProps {
  items: CourseWithProgressWithCategory[];
  enrolled: boolean;
}

export const CoursesList = ({ items,enrolled }: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md: grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCardServer
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            tier={item.tierId!}
            progress={item.progress}
            category={item.category?.name!}        
             />
        ))}
      </div>
      <div className="text-center text-md text-gray-700 mt-10">
        {items.length === 0 && <div>No Spells found</div>}
      </div>
    </div>
  );
};
