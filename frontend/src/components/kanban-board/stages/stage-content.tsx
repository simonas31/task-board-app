import Task from "../tasks";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import TaskSheetContent from "../tasks/sheet-content";
import * as React from "react";

type StageContentProps = {
  stage: TaskStatus;
};

export default function StageContent({ stage }: StageContentProps) {
  const [open, setOpen] = React.useState(false);

  const closeSheet = () => {
    setOpen(false);
  };

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
        <TaskSheetContent closeSheet={closeSheet} />
      </Sheet>
    </div>
  );
}
