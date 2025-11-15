import type { Project } from "@/components/projects/create-project-form";

export type Board = {
  id: number;
  name: string;
};

export interface KanbanProject extends Project {
  boards?: Board[];
}

export type KanbanState = {
  project?: KanbanProject;
  loadingProject: boolean;
};

export type KanbanProviderProps = {
  children: React.ReactNode;
  project?: KanbanProject;
  loadingProject: boolean;
};
