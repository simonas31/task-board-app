import KanbanBoard from "@/components/kanban-board";
import KanbanProvider from "@/components/kanban-board/context";
import ProjectHeader from "@/components/projects/project-header";
import { Separator } from "@/components/ui/separator";

export default function ViewProjectPage() {
  return (
    <KanbanProvider>
      <div className="space-y-5">
        <ProjectHeader />
        <Separator />
        <KanbanBoard />
      </div>
    </KanbanProvider>
  );
}
