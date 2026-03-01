import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import useKanban from "@/hooks/use-kanban";
import {
  HiddenHeader,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../ui/sheet";
import TaskForm from "./task-form";

export default function CreateNewTaskButton() {
  const {
    loadingProject,
    isFormSheetOpen,
    toggleCreationSheet,
    creationFormValues,
  } = useKanban();

  return (
    <Sheet open={isFormSheetOpen} onOpenChange={toggleCreationSheet}>
      <SheetTrigger asChild>
        <Button type="button" isLoading={loadingProject}>
          <Plus />
          <span>New Task</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:min-w-[540px] px-5 py-3">
        <HiddenHeader />
        <p className="text-2xl font-semibold">Create new task</p>
        <TaskForm
          mode="Create"
          closeSheet={() => toggleCreationSheet(false)}
          values={creationFormValues}
        />
      </SheetContent>
    </Sheet>
  );
}
