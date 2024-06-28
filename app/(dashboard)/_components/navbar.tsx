import NavbarRoutes from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    //NAVBAR WITH THE AVATARBOX
    <div className="p-4 h-full flex bg-transparent backdrop-filter backdrop-blur-sm items-center bg-red-700">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
