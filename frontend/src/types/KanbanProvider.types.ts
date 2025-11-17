import type { Project } from "@/components/projects/create-project-form";
import type React from "react";
import type { KeyedMutator } from "swr";

export type TaskStatus = "Todo" | "InProgress" | "InReview" | "Completed";

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: Date;
  priority: string;
  tags: number[];
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
  activeBoard: Board | null;
  setActiveBoard: React.Dispatch<React.SetStateAction<Board | null>>;
};

export type KanbanProviderProps = {
  children: React.ReactNode;
};
