"use client";

import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PieChart, Goal, Timer } from "lucide-react";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Timer,
  },
  {
    title: "Statistics",
    url: "/stats",
    icon: PieChart,
  },
  {
    title: "Goals",
    url: "/goals",
    icon: Goal,
  },
];

export const SideBarMenuItems = () => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            asChild
            className={`py-3 transition-colors hover:bg-primary/10 ${
              pathname === item.url ? "bg-primary/10 text-primary" : ""
            }`}
          >
            <Link href={item.url}>
              <item.icon className="h-5 w-5" />
              <span className="font-medium ml-3 truncate">{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};
