import { NextResponse } from "next/server";
import { isTeacher } from "./lib/teacher";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(
  (auth, req) => {
    const { sessionClaims } = auth();
    const role = sessionClaims?.metadata?.role;

    if (isProtectedRoute(req)) {
      auth().protect();
      if (role === "student") {
        console.log("role is ", role);
        auth().protect();
      }
    }
  }
  //{ debug: true }
);

const isProtectedRoute = createRouteMatcher([
  "/",
  "/student(.*)", //kapag wala pang subroutes don't put (.*)
]);

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: [
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/landing(.*)",
    "/about",
    "/unauthorized",
  ],
};
