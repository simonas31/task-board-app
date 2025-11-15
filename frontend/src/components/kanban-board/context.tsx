import * as React from "react";
import type {
  KanbanProviderProps,
  KanbanState,
} from "@/types/KanbanProvider.types";

const initialState: KanbanState = {
  loadingProject: false,
};

const KanbanProviderContext = React.createContext<KanbanState>(initialState);

export default function KanbanProvider({
  children,
  project,
  loadingProject,
  ...props
}: KanbanProviderProps) {
  const value = {
    project,
    loadingProject,
  };

  return (
    <KanbanProviderContext.Provider {...props} value={value}>
      {children}
    </KanbanProviderContext.Provider>
  );
}

export { KanbanProviderContext };
