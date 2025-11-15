import KanbanBoard from "@/components/kanban-board";
import KanbanProvider from "@/components/kanban-board/context";
import ProjectHeader from "@/components/projects/project-header";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import type { KanbanProject } from "@/types/KanbanProvider.types";
import * as React from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

const projectFetcher = (url: string) => api.get(url).then((res) => res.data);

export default function ViewProjectPage() {
  const { projectId } = useParams();

  const {
    data: project,
    isLoading,
    error,
  } = useSWR<KanbanProject>(`/projects/${projectId}`, projectFetcher);

  React.useEffect(() => {
    if (error) {
      toast.error("Could not fetch project. Please wait or try again");
    }
  }, [error]);

  return (
    <KanbanProvider project={project} loadingProject={isLoading}>
      <div className="space-y-5">
        <ProjectHeader />
        <Separator />
        <KanbanBoard />
      </div>
    </KanbanProvider>
  );
}
