import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Button } from "~/components/ui/button";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
        <SidebarTrigger />
      <div className="h-screen w-screen grid place-items-center">
        <Button>Hello World</Button>
      </div>
    </SidebarProvider>
  );
}
