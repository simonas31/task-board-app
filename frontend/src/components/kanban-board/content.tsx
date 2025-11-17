import { TabsContent } from "../ui/tabs";
import useKanban from "@/hooks/use-kanban";
import Stage from "./stage";

export default function KanbanBoardContent() {
  const { project } = useKanban();

  return (
    <div className="overflow-x-scroll">
      {project?.boards?.map((board) => {
        return (
          <TabsContent key={board.id} value={board.name} className="flex gap-3">
            <Stage name="To-do" board={board} stage="Todo" />
            <Stage
              name="In Progress"
              board={board}
              stage="InProgress"
              indicatorColor="blue"
            />
            <Stage
              name="In Review"
              board={board}
              stage="InReview"
              indicatorColor="yellow"
            />
            <Stage
              name="Completed"
              board={board}
              stage="Completed"
              indicatorColor="green"
            />
          </TabsContent>
        );
      })}
    </div>
  );
}
