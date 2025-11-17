import { TabsContent } from "../ui/tabs";
import useKanban from "@/hooks/use-kanban";
import Stage from "./stages";

export default function KanbanBoardContent() {
  const { project } = useKanban();

  return (
    <div className="overflow-x-scroll">
      {project?.boards?.map((board) => {
        return (
          <TabsContent key={board.id} value={board.name} className="flex gap-3">
            <Stage name="To-do" stage="Todo" />
            <Stage
              name="In Progress"
              stage="InProgress"
              indicatorColor="blue"
            />
            <Stage name="In Review" stage="InReview" indicatorColor="yellow" />
            <Stage name="Completed" stage="Completed" indicatorColor="green" />
          </TabsContent>
        );
      })}
    </div>
  );
}
