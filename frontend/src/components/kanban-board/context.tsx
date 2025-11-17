import * as React from "react";
import type {
  Board,
  KanbanProject,
  KanbanProviderProps,
  KanbanState,
  TaskStatus,
} from "@/types/KanbanProvider.types";
import { api } from "@/lib/axios";
import { useParams } from "react-router";
import useSWR from "swr";
import { toast } from "sonner";

const initialState: KanbanState = {
  loadingProject: false,
  getStageTasks: () => [],
  setProject: async () => undefined,
};

const KanbanProviderContext = React.createContext<KanbanState>(initialState);

const projectFetcher = (url: string) => api.get(url).then((res) => res.data);

export default function KanbanProvider({
  children,
  ...props
}: KanbanProviderProps) {
  const { projectId } = useParams();

  const {
    data: project,
    isLoading,
    error,
    mutate,
  } = useSWR<KanbanProject>(`/projects/${projectId}`, projectFetcher);

  React.useEffect(() => {
    if (error) {
      toast.error("Could not fetch project. Please wait or try again");
    }
  }, [error]);

  const getStageTasks = React.useCallback((board: Board, stage: TaskStatus) => {
    return board.tasks.filter((task) => task.status === stage);
  }, []);

  const value = {
    project,
    loadingProject: isLoading,
    getStageTasks,
    setProject: mutate,
  };

  return (
    <KanbanProviderContext.Provider {...props} value={value}>
      {children}
    </KanbanProviderContext.Provider>
  );
}

export { KanbanProviderContext };
