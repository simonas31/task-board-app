import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import NavProjects from "../sidebar/nav-projects";
import NavMain from "../sidebar/nav-main";

export default function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      {/* SidebarHeader */}
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      {/* SidebarFooter */}
    </Sidebar>
  );
}
