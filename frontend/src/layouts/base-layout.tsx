import AppSidebar from "@/components/partials/app-sidebar";
import Header from "@/components/partials/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

const BaseLayout = () => {
  // create auth provider which will check if user is authenticated
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default BaseLayout;
