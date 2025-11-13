import { Link } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Home } from "lucide-react";

const data = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <Home />,
  },
];

export default function NavMain() {
  return (
    <SidebarGroup>
      {data.map((item, index) => {
        return (
          <SidebarGroupContent key={index}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        );
      })}
    </SidebarGroup>
  );
}
