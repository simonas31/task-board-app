import type { KanbanProject } from "@/pages/projects/view-project-page";
import {
  TabListContainer,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { KanbanSquareDashed, Plus, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type KanbanBoardProps = {
  project: KanbanProject | undefined;
  loadingProject: boolean;
};

export default function KanbanBoard({
  project,
  loadingProject,
}: KanbanBoardProps) {
  return (
    <>
      <Tabs defaultValue="account">
        <TabListContainer>
          <TabsList>
            <TabsTrigger value="account" className="max-w-fit">
              <KanbanSquareDashed />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="password" className="max-w-fit">
              <KanbanSquareDashed />
              <span>Password</span>
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-3 h-9">
            <InputGroup className="max-w-fit">
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search ..." />
            </InputGroup>
            <Separator orientation="vertical" />
            <Button type="button">
              <Plus />
              <span>New Task</span>
            </Button>
          </div>
        </TabListContainer>
        {/* Kanban board content */}
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </>
  );
}
