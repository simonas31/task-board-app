import { ChevronDown, FolderGit2, Plus } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { Link } from "react-router";
import { useSidebarProjects } from "@/hooks/use-sidebar-projects";

export default function NavProjects() {
  const { data: projects, isLoading } = useSidebarProjects();

  return (
    <SidebarGroup>
      <Collapsible className="group/collapsible" disabled={isLoading}>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              Projects
              <ChevronDown className="ml-auto group-data-[state=open]/collapsible:-rotate-180 transition-transform" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {projects?.map((project) => (
                <SidebarMenuSubItem key={project.name}>
                  <SidebarMenuSubButton asChild isActive={false}>
                    <Link to={`/projects/${project.id}`}>
                      <FolderGit2 />
                      <span>{project.name}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}

              {/* Project creation link */}
              <SidebarMenuSubItem>
                <SidebarMenuSubButton asChild isActive={false}>
                  <Link to="/projects/create">
                    <Plus /> <span>Create project</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarGroup>
  );
}
