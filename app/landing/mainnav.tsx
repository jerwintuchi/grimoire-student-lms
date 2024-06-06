"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const MainNav = () => {
  return (
    <nav className="bg-red-700 text-white p-4 sticky top-0 z-50">
      <div className="flex justify-start">
        <Link href="/landing">
          <Button variant="ghost" className="hover:bg-red-600 ">
            Home
          </Button>
        </Link>
        <Link href="/landing/about">
          <Button variant="ghost" className="hover:bg-red-600 ">
            About
          </Button>
        </Link>

        {/* FOR SIGN UP BUTTONS */}
        <NavigationMenu>
          <NavigationMenuList className="bg-red-700">
            <NavigationMenuItem className="bg-red-700">
              <NavigationMenuTrigger className="bg-red-500 hover:bg-red-600">
                Start Now
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-red-700">
                <NavigationMenuLink>
                  <Link href="/sign-in">
                    <Button className="bg-red-700 hover:bg-orange-600 hover:text-white">
                      Sign In
                    </Button>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href="/sign-up">
                    <Button className="bg-red-700 hover:bg-orange-600 hover:text-white">
                      Register
                    </Button>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default MainNav;
