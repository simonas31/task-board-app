import { TabsContent } from "../ui/tabs";
import useKanban from "@/hooks/use-kanban";

export default function KanbanBoardContent() {
  const { project } = useKanban();

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
