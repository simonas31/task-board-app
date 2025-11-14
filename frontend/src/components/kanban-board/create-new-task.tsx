import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import type { KanbanProject } from "@/pages/projects/view-project-page";

type CreateNewTaskButtonProps = {
  project?: KanbanProject;
  loadingProject: boolean;
};

export default function CreateNewTaskButton({
  project,
  loadingProject,
}: CreateNewTaskButtonProps) {
  return (
    <Button type="button" isLoading={loadingProject}>
      <Plus />
      <span>New Task</span>
    </Button>
  );
}
