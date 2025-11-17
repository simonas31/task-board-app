import { Tabs } from "../ui/tabs";
import KanbanBoardHeader from "./header";
import KanbanBoardContent from "./content";
import useKanban from "@/hooks/use-kanban";

export default function KanbanBoard() {
  const { project } = useKanban();
  const firstBoard = project?.boards?.at(0);

  return (
    <>
      <Tabs defaultValue={firstBoard?.name}>
        <KanbanBoardHeader />
        <KanbanBoardContent />
      </Tabs>
    </>
  );
}
