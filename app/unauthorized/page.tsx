import React from "react";
import MainNav from "../landing/mainnav";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const UnauthorizedPage = () => {
  return (
    <div>
      {/* Navbar */}
      <MainNav />

      {/* Unauthorized Page Content */}
      <div className="bg-black h-[calc(100vh-72px)] text-white flex flex-col justify-center items-center">
        <Image
          width={50} // specify the width of the image
          height={50} // specify the height of the image
          src="error.svg"
          alt="Unauthorized Access"
          className="h-auto w-auto mb-4"
        />
        <h1 className="text-4xl">Uh oh! Access Denied</h1>
        <p className="text-lg mb-4">
          It looks like you tried to access a page you don't have permission
          for.
        </p>
        <Link href="/landing">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            <SignOutButton redirectUrl="/sign-in">Sign in again</SignOutButton>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
