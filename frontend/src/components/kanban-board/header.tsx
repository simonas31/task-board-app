import { KanbanSquareDashed, Search } from "lucide-react";
import { TabListContainer, TabsList, TabsTrigger } from "../ui/tabs";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Separator } from "../ui/separator";
import CreateNewTaskButton from "./create-new-task";
import useKanban from "@/hooks/use-kanban";

export default function KanbanBoardHeader() {
  const { project, loadingProject } = useKanban();

  return (
    <TabListContainer>
      <TabsList>
        {project?.boards?.map((board) => {
          return (
            <TabsTrigger
              key={board.id}
              value={board.name}
              className="max-w-fit"
            >
              <KanbanSquareDashed />
              <span>{board.name}</span>
            </TabsTrigger>
          );
        })}
      </TabsList>
      <div className="flex items-center space-x-3 h-9">
        <InputGroup className="max-w-fit">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search ..." />
        </InputGroup>
        <Separator orientation="vertical" />
        <CreateNewTaskButton
          project={project}
          loadingProject={loadingProject}
        />
      </div>
    </TabListContainer>
  );
}
