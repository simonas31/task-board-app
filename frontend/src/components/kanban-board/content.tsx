import type { KanbanProject } from "@/pages/projects/view-project-page";
import { TabsContent } from "../ui/tabs";

type KanbanBoardContentProps = {
  project?: KanbanProject;
  loadingProject: boolean;
};

export default function KanbanBoardContent({
  project,
}: KanbanBoardContentProps) {
  // USE CONTEXT PROVIDER BECAUSE loadingProject needs to be prop drilled... and also its better
  return (
    <>
      {project?.boards?.map((board) => {
        return (
          <TabsContent key={board.id} value={board.name}>
            {board.name}'s kanban board content
          </TabsContent>
        );
      })}
    </>
  );
}
