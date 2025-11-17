import type { Project } from "@/components/projects/create-project-form";
import type { KeyedMutator } from "swr";

export type TaskStatus = "Todo" | "InProgress" | "InReview" | "Completed";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
};

export type Board = {
  id: number;
  name: string;
  tasks: Task[];
};

export interface KanbanProject extends Project {
  boards?: Board[];
}

export type KanbanState = {
  project?: KanbanProject;
  loadingProject: boolean;
  getStageTasks: (board: Board, stage: TaskStatus) => Task[];
  setProject: KeyedMutator<KanbanProject>;
};

export type KanbanProviderProps = {
  children: React.ReactNode;
};
