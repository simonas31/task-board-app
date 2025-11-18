import { HiddenHeader, SheetContent } from "@/components/ui/sheet";
import TaskForm from "./task-form";
import useKanban from "@/hooks/use-kanban";

export default function TaskSheetContent() {
  const { selectedTask } = useKanban();

  return (
    <SheetContent className="w-full sm:min-w-[540px] px-5 py-3">
      <HiddenHeader />
      <p className="text-2xl font-semibold">Update "{selectedTask?.title}"</p>
      <TaskForm mode="Update" />
    </SheetContent>
  );
}
