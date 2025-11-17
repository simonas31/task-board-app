import Task from "../tasks";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";
import {
  HiddenHeader,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import TaskForm from "../tasks/task-form";

type StageContentProps = {
  stage: TaskStatus;
};

export default function StageContent({ stage }: StageContentProps) {
  const { activeBoard, getStageTasks } = useKanban();

  if (!activeBoard) {
    return <></>;
  }

  const tasks = getStageTasks(activeBoard, stage);

  return (
    <div className="flex flex-col gap-3 py-5">
      <Sheet>
        {tasks.map((task) => (
          <SheetTrigger key={task.id}>
            <Task task={task} />
          </SheetTrigger>
        ))}
        <SheetContent className="w-full sm:min-w-[540px] px-5 py-3">
          <HiddenHeader />
          <p className="text-2xl font-semibold">Update task</p>
          <TaskForm mode="Create" board={activeBoard} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
