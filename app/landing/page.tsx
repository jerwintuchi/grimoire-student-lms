import React from "react";
import MainNav from "./mainnav";
import Image from "next/image";

const LandingPage = () => {
  return (
  <>
  <div className="relative h-screen">
      <video
        src={
          "https://utfs.io/f/d8a27213-f787-464b-ab88-0adad6026201-sav6v1.mp4"
        }
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0" // comment for prod
      />
      <div className="z-10">
       <MainNav /> 
      </div>
      
      <div className="absolute inset-0 h-[calc(100vh-72px)] text-white bg-full flex flex-col justify-center items-center z-20">
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
  </>
    
  );
};

export default LandingPage;
