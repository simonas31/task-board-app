import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Boxes, Home } from "lucide-react";
import { Link } from "react-router";
import * as React from "react";
import NavProjects from "../sidebar/nav-projects";

interface NavItemType {
  title: string;
  url: string;
  icon?: React.JSX.Element;
}

interface SidebarNavDataType {
  groups: NavItemType[];
}

// temporary items
const data: SidebarNavDataType = {
  groups: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home />,
    },
  ],
};

export default function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      {/* SidebarHeader */}
      <SidebarContent>
        <SidebarGroup>
          {data.groups.map((group, index) => {
            return (
              <SidebarGroupContent key={index}>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to={group.url}>
                        {group.icon}
                        <span>{group.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            );
          })}
        </SidebarGroup>
        <NavProjects />
      </SidebarContent>
      {/* SidebarFooter */}
    </Sidebar>
  );
}
