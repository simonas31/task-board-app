import StageContent from "./stage-content";
import StageHeader from "./stage-header";
import type { TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";

type StageProps = {
  name: string;
  stage: TaskStatus;
  indicatorColor?: "gray" | "blue" | "yellow" | "green";
};

export default function Stage({ name, stage, indicatorColor }: StageProps) {
  const { activeBoard, getStageTasks } = useKanban();

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
      />
      <StageContent stage={stage} />
    </div>
  );
}

export {};
