import React from "react";
import MainNav from "./mainnav";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <MainNav />
      {/* Landing Page Content */}
      <div className="bg-white h-[calc(100vh-72px)] text-white bg-full flex flex-col justify-center items-center">
        <Image
          width={50}
          height={50}
          src="grimoire-logo.svg"
          alt="Logo"
          className="pb-16 h-auto w-auto mb-4"
        />
        <h1 className="text-4xl">Welcome to Our Website!</h1>
      </div>
    </div>
  );
};

export default LandingPage;
