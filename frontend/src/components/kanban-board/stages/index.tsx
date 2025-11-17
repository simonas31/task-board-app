import * as React from "react";
import StageContent from "./stage-content";
import StageHeader from "./stage-header";
import type { Board, TaskStatus } from "@/types/KanbanProvider.types";
import useKanban from "@/hooks/use-kanban";

type StageProps = {
  name: string;
  board: Board;
  stage: TaskStatus;
  indicatorColor?: "gray" | "blue" | "yellow" | "green";
};

export default function Stage({
  name,
  stage,
  board,
  indicatorColor,
}: StageProps) {
  const { getStageTasks } = useKanban();
  const tasksInStage = getStageTasks(board, stage).length || undefined;

  return (
    <div className="flex flex-col flex-1 max-w-[300px] min-w-[300px] mt-3">
      <StageHeader
        name={name}
        indicatorColor={indicatorColor}
        tasksInStage={tasksInStage}
      />
      <StageContent board={board} stage={stage} />
    </div>
  );
}

export {};
