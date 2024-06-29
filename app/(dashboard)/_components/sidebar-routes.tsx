"use client";
import {
  BarChart2Icon,
  Gem,
  Layout,
  List,
  ListCollapse,
  ListFilter,
  ListXIcon,
  LucideIcon,
  Search,
  TableProperties,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

export interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const guestRoutes = [
  {
    Icon: Layout, // Dashboard Icon
    label: "Dashboard",
    href: "/",
  },
  {
    Icon: Search, //Dashboard Icon (Non-Teacher)
    label: "Browse",
    href: "/search",
  },
  {
    Icon: Gem, //Pricing Icon
    label: "Subscription",
    href: "/subscription",
  }
];


export const SidebarRoutes = () => {

  const routes =  guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.Icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
