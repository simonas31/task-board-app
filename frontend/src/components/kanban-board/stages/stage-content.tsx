import Task from "../tasks";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import TaskSheetContent from "../tasks/sheet-content";

type StageContentProps = {
  stage: TaskStatus;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function StageContent({
  stage,
  open,
  setOpen,
}: StageContentProps) {
  const { activeBoard, setSelectedTask, getStageTasks } = useKanban();

  if (!activeBoard) {
    return <></>;
  }

  const tasks = getStageTasks(activeBoard, stage);

  return (
    <div className="flex flex-col gap-3 py-5">
      <Sheet open={open} onOpenChange={setOpen}>
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
        <TaskSheetContent closeSheet={() => setOpen(false)} />
      </Sheet>
    </div>
  );
}
