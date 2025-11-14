import type { KanbanProject } from "@/pages/projects/view-project-page";
import { Tabs } from "../ui/tabs";
import KanbanBoardHeader from "./header";
import KanbanBoardContent from "./content";

type KanbanBoardProps = {
  project?: KanbanProject;
  loadingProject: boolean;
};

export default function KanbanBoard({
  project,
  loadingProject,
}: KanbanBoardProps) {
  return (
    <>
      <Tabs defaultValue="UI/UX">
        <KanbanBoardHeader project={project} loadingProject={loadingProject} />
        <KanbanBoardContent project={project} loadingProject={loadingProject}/>
      </Tabs>
    </>
  );
}
