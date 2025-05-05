import { PieChart, Goal, LogOut, Timer, Axe } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";

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

export function AppSidebar() {
  return (
    <Sidebar className="overflow-x-hidden">
      <SidebarHeader className="py-4">
        <div className="flex items-center justify-center mb-2">
          <Axe className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold ml-2">Keiri</h1>
        </div>
        <div className="px-4">
          <div className="h-1 w-16 bg-primary/20 mx-auto rounded-full" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-medium px-2 py-1.5">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-3 transition-colors hover:bg-primary/10"
                  >
                    <Link href={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium ml-3 truncate">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t py-4">
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/placeholder.svg?height=36&width=36"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">User</p>
                <p className="text-xs text-muted-foreground">
                  user@example.com
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
