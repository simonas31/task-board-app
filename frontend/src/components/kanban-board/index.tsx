import { Tabs } from "../ui/tabs";
import KanbanBoardHeader from "./header";
import KanbanBoardContent from "./content";

export default function KanbanBoard() {
  return (
    <>
      <Tabs defaultValue="UI/UX">
        <KanbanBoardHeader />
        <KanbanBoardContent />
      </Tabs>
    </>
  );
}
