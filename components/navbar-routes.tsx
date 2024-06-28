"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { isTeacher } from "@/lib/teacher";
import { GreetUser } from "./greetings/greetuser";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      { isPlayerPage && (
        <div>
          <Link href="/search">
            <Button
              size="sm"
              className="text-white bg-red-500 hover:bg-red-800 hover:text-white size-auto">
              <LogOut className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div> //isTeacher is from .env and teacherUser is from sessionClaims
      )}
      <GreetUser />

      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default NavbarRoutes;
