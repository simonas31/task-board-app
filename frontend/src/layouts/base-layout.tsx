import { AuthProvider } from "@/providers/auth-provider";
import AppSidebar from "@/components/partials/app-sidebar";
import Header from "@/components/partials/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { Card, CardContent } from "@/components/ui/card";

const BaseLayout = () => {
  // create auth provider which will check if user is authenticated
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Header />
          <Card className="m-3">
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </main>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default BaseLayout;
