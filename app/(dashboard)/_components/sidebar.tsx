import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

const Sidebar = () => {
  return (
    <>
      <div className="h-full flex border-r-2 flex-col overflow-y-auto bg-white shadow-sm">
        <div className="p-4 text-black border-radius-3xl">
          Your Rank is (chuchuchu)
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
        <div className="flex-grow"></div>
        <div className="mt-auto mb-4 w-full text-center text-size-xs text-red-700 font-bold">
          <div className="flex items-center justify-center">
            <Logo />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xs">© 2024 Grimoire</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
