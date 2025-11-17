import Task from "../tasks";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import TaskSheetContent from "../tasks/sheet-content";

type StageContentProps = {
  stage: TaskStatus;
};

export default function StageContent({ stage }: StageContentProps) {
  const { activeBoard, setSelectedTask, getStageTasks } = useKanban();

  if (!activeBoard) {
    return <></>;
  }

  const tasks = getStageTasks(activeBoard, stage);

  return (
    <div className="flex flex-col gap-3 py-5">
      <Sheet>
        {tasks.map((task) => (
          <SheetTrigger
            key={task.id}
            onClick={() => {
              setSelectedTask(task);
            }}
          >
            <Task task={task} />
          </SheetTrigger>
        ))}
        <TaskSheetContent />
      </Sheet>
    </div>
  );
}
