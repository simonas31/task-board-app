import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import useKanban from "@/hooks/use-kanban";

export default function CreateNewTaskButton() {
  const { loadingProject } = useKanban();

  return (
    <Button type="button" isLoading={loadingProject}>
      <Plus />
      <span>New Task</span>
    </Button>
  );
}
