import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: Request, { params }: { params: { courseId: string } }) {
  try {
    const { userId } = await req.json();
    const courseId = params.courseId;

    if (!userId || !courseId) {
      return new NextResponse("Missing userId or courseId", { status: 400 });
    }

    const user = await auth();
    if (!user || user.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const enrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (!enrollment) {
      return new NextResponse("Enrollment not found", { status: 404 });
    }

    await db.enrollment.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return new NextResponse("Successfully unenrolled", { status: 200 });
  } catch (error) {
    console.error("[UNENROLL]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
