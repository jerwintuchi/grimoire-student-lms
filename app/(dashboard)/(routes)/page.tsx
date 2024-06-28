import { Roles } from "@/app/types/globals";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function TeacherDashBoard(role: Roles) {
  const user = await currentUser();

  // if (checkRole("teacher") && user) {
  //   // Redirect to root for teacher or publicMetadata.role === "teacher"
  //   return redirect("/");
  // } else
  // if (role === "student" && user) {
  //   //from checkRole("student") to role
  //   return redirect("/student");
  // }

  // if (!user) {
  //   return redirect("/unauthorized");
  // }

  return (
    <div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
