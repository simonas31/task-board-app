import { KanbanProviderContext } from "@/components/kanban-board/context";
import React from "react";

export default function useKanban() {
  const state = React.useContext(KanbanProviderContext);

  if (state === undefined)
    throw new Error("useKanban must be used within a KanbanProvider");

  return state;
}
