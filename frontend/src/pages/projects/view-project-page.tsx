import KanbanBoard from "@/components/kanban-board";
import { type Project } from "@/components/projects/create-project-form";
import ProjectHeader from "@/components/projects/project-header";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios";
import * as React from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

const projectFetcher = (url: string) => api.get(url).then((res) => res.data);

type Board = {
  id: number;
  name: string;
};

export interface KanbanProject extends Project {
  boards?: Board[];
}

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
    <div className="space-y-5">
      <ProjectHeader project={project} isLoading={isLoading} />
      <Separator />
      <KanbanBoard project={project} loadingProject={isLoading} />
    </div>
  );
}
