import { useUser } from "@clerk/nextjs";
import { Badge } from "../ui/badge";

export const GreetUser = () => {
  const { user } = useUser();
  if (user?.publicMetadata?.role === "teacher") {
    return <div className="flex flex-col items-end w-full text-1xl text-black ">Hi, teacher {user?.username}!
    <Badge className="bg-[#fa822c]">
      Teacher
      </Badge></div>;
  }
  return <div className="flex flex-col items-end w-full text-1xl text-black ">Hi, {user?.username}!
    <Badge className="bg-[#37567a]">
      Student
      </Badge></div>;
};
