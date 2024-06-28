"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { GreetUser } from "./greetings/greetuser";

const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex items-center justify-between w-full px-4">
      {isPlayerPage && (
        <div>
          <Link href="/search">
            <Button
              size="sm"
              className="flex text-white bg-red-500 hover:bg-red-800 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        <GreetUser />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default NavbarRoutes;
