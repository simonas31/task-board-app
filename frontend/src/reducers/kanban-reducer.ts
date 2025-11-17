import type {
  KanbanProject,
  Board,
  Task,
  KanbanState,
} from "@/types/KanbanProvider.types";

type Action =
  | { type: "SET_PROJECT"; payload: KanbanProject }
  | { type: "SET_ACTIVE_BOARD"; payload: Board | null }
  | { type: "SET_SELECTED_TASK"; payload: Task | null }
  | { type: "DELETE_BOARD"; payload: { boardId: number } }
  | { type: "ADD_TASK"; payload: { boardId: number; task: Task } }
  | { type: "UPDATE_TASK"; payload: { boardId: number; task: Task } }
  | { type: "DELETE_TASK"; payload: { boardId: number; taskId: number } };

export function kanbanReducer(state: KanbanState, action: Action) {
  switch (action.type) {
    case "SET_PROJECT":
      return { ...state, project: action.payload };

    case "SET_ACTIVE_BOARD":
      return { ...state, activeBoard: action.payload };

    case "SET_SELECTED_TASK":
      return { ...state, selectedTask: action.payload };

    case "DELETE_BOARD": {
      if (!state.project) return state;

      const { boardId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          boards: state.project?.boards?.filter((b) => b.id !== boardId),
        },
      };
    }

    case "ADD_TASK": {
      if (!state.project) return state;

      const { boardId, task } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          boards: state.project?.boards?.map((b) =>
            b.id === boardId ? { ...b, tasks: [...b.tasks, task] } : b
          ),
        },
      };
    }

    case "UPDATE_TASK": {
      if (!state.project) return state;

      const { boardId, task } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          boards: state.project?.boards?.map((b) =>
            b.id === boardId
              ? {
                  ...b,
                  tasks: b.tasks.map((t) => (t.id === task.id ? task : t)),
                }
              : b
          ),
        },
      };
    }

    case "DELETE_TASK": {
      if (!state.project) return state;

      const { boardId, taskId } = action.payload;

      return {
        ...state,
        project: {
          ...state.project,
          boards: state.project?.boards?.map((b) =>
            b.id === boardId
              ? {
                  ...b,
                  tasks: b.tasks.filter((t) => t.id !== taskId),
                }
              : b
          ),
        },
      };
    }

    default:
      throw new Error("type is not defined in kanbanReducer");
  }
}
