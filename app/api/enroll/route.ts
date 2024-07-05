import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId, courseId } = await req.json();
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!userId) {
      return new Response("User not found", { status: 404 });
    }

    if (!course) {
      return new Response("Course not found", { status: 404 });
    }

    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingEnrollment) {
      return new Response("Already enrolled", { status: 400 });
    }

    const enrollment = await db.enrollment.create({
      data: {
        userId: userId,
        courseId: courseId,
      },
    });
    const enrollToTrue = await db.course.update({
        where: {
            id: courseId
        },
        data: {
            enroll: true
        }
    })
    
    return new Response(JSON.stringify(enrollment), { status: 200 });
  } catch (error) {
    console.log("[ENROLL]: ", error);
    return new Response("Error", { status: 500 });
  }
}
