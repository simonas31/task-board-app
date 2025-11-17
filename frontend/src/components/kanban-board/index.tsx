import { Tabs } from "../ui/tabs";
import KanbanBoardHeader from "./header";
import KanbanBoardContent from "./content";
import useKanban from "@/hooks/use-kanban";
import * as React from "react";

export default function KanbanBoard() {
  const { project, activeBoard, setActiveBoard } = useKanban();
  const firstBoard = project?.boards?.at(0);

  React.useEffect(() => {
    if (firstBoard) {
      setActiveBoard(firstBoard);
    }
  }, [firstBoard, setActiveBoard]);

  return (
    <>
      <Tabs value={activeBoard?.name ?? ""}>
        <KanbanBoardHeader />
        <KanbanBoardContent />
      </Tabs>
    </>
  );
}
