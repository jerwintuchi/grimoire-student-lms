// import { useUser } from "@clerk/nextjs";

// export async function isTeacher (userId?: string | null) {
//   const user = useUser();
//   if (userId === process.env.NEXT_PUBLIC_TEACHER_ID) {
//     //if an .env variable is set to a valid user id, then it's a teacher
//     return true;
//   } else if (user?.user?.publicMetadata?.role !== "student" || "") {
//     //else if the publicmetadata is not set to student or empty
//     return true;
//   } else {
//     return false;
//   }
// };