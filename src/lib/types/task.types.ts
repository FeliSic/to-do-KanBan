// src/lib/types/task.types.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: "PENDIENTE" | "EN_PROGRESO" | "HECHO";
}
