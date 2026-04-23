// src/lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "./types/task.types";

// 1. Definimos la interfaz del Store
interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  moveTask: (taskId: string, newStatus: Task["status"]) => void;
  deleteTask: (taskId: string) => void; // <-- Nueva acción
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      moveTask: (taskId, newStatus) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, status: newStatus } : t,
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== taskId),
        })),
    }),
    { name: "kanban-storage" },
  ),
);
