import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItemProps } from "./sidebar-routes";
import "../../../app/globals.css";
export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  href,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") || // If we are on the root page
    pathname === href || // For checking if we're on the exact same page
    pathname?.startsWith(`${href}/`); // For specific cases where we can be in a subroute of a specific route

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-gray-600 text-sm font-semibold pl-6 transition-all hover:text-black-500 hover:bg-gray-800 hover:border-l-8 hover:border-gray-900",
        isActive &&
          "text-white bg-gray-600 hover:bg-gray-600 hover:text-gray-200 border-l-8 border-gray-900" // Add transition class here
      )}>
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-gray-600", isActive && "text-white")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto h-full transition-all", // Remove opacity manipulation
          isActive && "border-red-500 " // Add border on active state
        )}
      />
    </button>
  );
};
