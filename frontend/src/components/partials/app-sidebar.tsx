import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Boxes, ChevronDown, Home, Plus } from "lucide-react";
import { Link } from "react-router";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import * as React from "react";

interface NavItemType {
  title: string;
  url: string;
  icon?: React.JSX.Element;
}

interface NavGroupType extends NavItemType {
  items?: NavItemType[];
}

interface SidebarNavDataType {
  groups: NavGroupType[];
}

// temporary items
const data: SidebarNavDataType = {
  groups: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <Home />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <Boxes />,
      items: [
        // dynamically add projects from api
        {
          title: "Create New",
          url: "/projects/create",
          icon: <Plus />,
        },
      ],
    },
  ],
};

export default function AppSidebar() {
  const buildCollapsibleGroup = React.useCallback((group: NavGroupType) => {
    return (
      <Collapsible key={group.title} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              {group.title}{" "}
              <ChevronDown className="ml-auto group-data-[state=open]/collapsible:-rotate-180 transition-transform" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          {group.items?.length ? (
            <CollapsibleContent>
              <SidebarMenuSub>
                {group.items.map((item) => (
                  <SidebarMenuSubItem key={item.title}>
                    <SidebarMenuSubButton asChild isActive={false}>
                      <Link to={item.url}>
                        {item.icon ? item.icon : ""}
                        {item.title}
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          ) : null}
        </SidebarMenuItem>
      </Collapsible>
    );
  }, []);

  const buildGroup = React.useCallback((group: NavGroupType) => {
    return (
      <SidebarGroupContent>
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
  }, []);

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        {data.groups.map((group) => {
          const isCollapsible =
            typeof group.items === "undefined" || group.items.length === 0;

          return (
            <SidebarGroup>
              {isCollapsible ? buildGroup(group) : buildCollapsibleGroup(group)}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
