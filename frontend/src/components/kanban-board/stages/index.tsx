import StageContent from "./stage-content";
import StageHeader from "./stage-header";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";
import * as React from "react";

type StageProps = {
  name: string;
  stage: TaskStatus;
  indicatorColor?: "gray" | "blue" | "yellow" | "green";
};

export default function Stage({ name, stage, indicatorColor }: StageProps) {
  const [open, setOpen] = React.useState(false);
  const { activeBoard, getStageTasks, toggleCreationSheet, setFormValues } =
    useKanban();

  if (!activeBoard) {
    return <></>;
  }

  const tasksInStage = getStageTasks(activeBoard, stage).length || undefined;

  return (
    <div className="flex flex-col flex-1 max-w-[300px] min-w-[300px] mt-3">
      <StageHeader
        name={name}
        indicatorColor={indicatorColor}
        tasksInStage={tasksInStage}
        addHandler={() => {
          toggleCreationSheet(true);
          setFormValues({ status: stage });
        }}
      />
      <StageContent stage={stage} open={open} setOpen={setOpen} />
    </div>
  );
}

export {};
