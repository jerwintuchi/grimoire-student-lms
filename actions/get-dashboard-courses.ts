
import { Category, Course, Chapter } from "@prisma/client";
import { db } from "@/lib/db";
import { getProgress } from "./get-progress";
type CourseWithProgressWithCategory = Course & {
    category: Category;
    chapters: Chapter[];
    progress: number | null
}
type DashboardCourses = {
    completedCourses: CourseWithProgressWithCategory[];
    coursesInProgress:CourseWithProgressWithCategory[];
}
export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
    try {
        const enrolledCourses = await db.enrollment.findMany({
            where: {
                userId
            },
            select: {
                course: {
                    include: {
                        category: true,
                        chapters: {
                            where: {
                                isPublished: true,
                            }
                        }
                    }
                }
            }
        })

        const courses = enrolledCourses.map((enroll) => enroll.course) as 
        CourseWithProgressWithCategory[];

        for (let course of courses) {
            const progress = await getProgress(userId, course.id);
            course["progress"] = progress;
        }

        const completedCourses = courses.filter((course) => course.progress === 100);
        const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);
    
        return {
            completedCourses,
            coursesInProgress
        }
    } catch (error) {
        console.log("[GET_DASHBOARD_COURSES]", error);
        return {
            completedCourses: [],
            coursesInProgress: [],
        }
    }
}