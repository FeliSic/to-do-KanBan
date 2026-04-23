// src/components/board/TaskCard.tsx
"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/src/lib/types/task.types";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`
            bg-white dark:bg-gray-800 
            p-4 mb-3 
            rounded-md 
            shadow-sm 
            border border-gray-200 dark:border-gray-700
            transition-shadow duration-200
            ${snapshot.isDragging ? "shadow-lg rotate-1 scale-105" : ""}
          `}
        >
          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
            {task.title}
          </h4>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {format(new Date(task.dueDate), "dd MMM yyyy", { locale: es })}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

/*
 Explicación de Tailwind en TaskCard
snapshot.isDragging ? 'shadow-lg rotate-1 scale-105' : '': Efecto visual cuando el usuario arrastra la tarjeta (rotación ligera y aumento de escala).

line-clamp-2: Limita la descripción a 2 líneas con puntos suspensivos (requiere @tailwindcss/line-clamp, pero viene incluido en Tailwind v3.3+).

transition-shadow duration-200: Suaviza el cambio de sombra al arrastrar.

border-gray-200 dark:border-gray-700: Bordes que cambian en modo oscuro.
*/
