import * as React from "react";
import type {
  Board,
  KanbanProject,
  KanbanProviderProps,
  KanbanState,
  Task,
  TaskStatus,
} from "@/types/KanbanProvider.types";
import { api } from "@/lib/axios";
import { useParams } from "react-router";
import useSWR from "swr";
import { toast } from "sonner";
import { kanbanReducer } from "@/reducers/kanban-reducer";

const initialState: KanbanState = {
  project: null,
  loadingProject: false,
  getStageTasks: () => [],
  setProject: () => {},
  activeBoard: null,
  setActiveBoard: () => {},
  selectedTask: null,
  setSelectedTask: () => {},
  deleteBoard: () => {},
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
};

const KanbanProviderContext = React.createContext<KanbanState>(initialState);

const projectFetcher = (url: string) => api.get(url).then((res) => res.data);

export default function KanbanProvider({
  children,
  ...props
}: KanbanProviderProps) {
  const { projectId } = useParams();

  const [state, dispatch] = React.useReducer(kanbanReducer, initialState);

  const {
    data: project,
    isLoading,
    error,
  } = useSWR<KanbanProject>(`/projects/${projectId}`, projectFetcher);

  React.useEffect(() => {
    if (error) {
      toast.error("Could not fetch project. Please wait or try again");
      return;
    }

    if (!project) return;

    if (state.project?.id !== project.id) {
      dispatch({ type: "SET_PROJECT", payload: project });

      const firstBoard = project.boards?.[0] ?? null;
      dispatch({ type: "SET_ACTIVE_BOARD", payload: firstBoard });
    }
  }, [error, project, state.project?.id]);

  const getStageTasks = React.useCallback((board: Board, stage: TaskStatus) => {
    return board.tasks.filter((task) => task.status === stage);
  }, []);

  const value = {
    ...state,
    loadingProject: isLoading,
    getStageTasks,

    setActiveBoard: (board: Board) =>
      dispatch({ type: "SET_ACTIVE_BOARD", payload: board }),

    setSelectedTask: (task: Task) =>
      dispatch({ type: "SET_SELECTED_TASK", payload: task }),

    addTask: (boardId: number, task: Task) =>
      dispatch({ type: "ADD_TASK", payload: { boardId, task } }),

    updateTask: (boardId: number, task: Task) =>
      dispatch({ type: "UPDATE_TASK", payload: { boardId, task } }),

    deleteTask: (boardId: number, taskId: number) =>
      dispatch({ type: "DELETE_TASK", payload: { boardId, taskId } }),
  };

  return (
    <KanbanProviderContext.Provider {...props} value={value}>
      {children}
    </KanbanProviderContext.Provider>
  );
}

export { KanbanProviderContext };
