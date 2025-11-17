import Task from "../tasks";
import type { Board, TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";

type StageContentProps = {
  board: Board;
  stage: TaskStatus;
};

export default function StageContent({ board, stage }: StageContentProps) {
  const { getStageTasks } = useKanban();
  const tasks = getStageTasks(board, stage);

  return (
    <div className="flex flex-col gap-3 py-5">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
