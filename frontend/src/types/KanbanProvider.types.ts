import type { Project } from "@/components/projects/create-project-form";
import type React from "react";

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
  project: KanbanProject | null;
  loadingProject: boolean;
  getStageTasks: (board: Board, stage: TaskStatus) => Task[];
  setProject: () => void;
  activeBoard: Board | null;
  setActiveBoard: (board: Board) => void;
  deleteBoard: (boardId: number) => void;
  addTask: (boardId: number, task: Task) => void;
  updateTask: (boardId: number, task: Task) => void;
  deleteTask: (boardId: number, taskId: number) => void;
};

export type KanbanProviderProps = {
  children: React.ReactNode;
};
