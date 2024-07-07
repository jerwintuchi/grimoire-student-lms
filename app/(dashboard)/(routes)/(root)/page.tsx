import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { Roles } from "@/app/types/globals";
import { CoursesList } from "@/components/courses-list";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { BookCheck, BookDashed } from "lucide-react";
import { redirect } from "next/navigation";
import { InfoCard } from "./_components/info-card";

export default async function Dashboard() {
  const { userId } = auth();
  if(!userId){
    return redirect("/");
  }

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
          icon={BookDashed}
          label="Still Mastering"
          numberOfItems={coursesInProgress.length}
          />

      <InfoCard
          icon={BookCheck}
          label="Mastered"
          numberOfItems={completedCourses.length}
          variant="success"
          />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]} enrolled={false}/>
    </div>
  );
}
