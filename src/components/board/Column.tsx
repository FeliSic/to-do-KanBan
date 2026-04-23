// src/components/board/Column.tsx
"use client";

import { Droppable } from "@hello-pangea/dnd";
import { Task } from "@/src/lib/types/task.types";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  id: string;
  title: string;
  tasks: Task[];
}

export const Column = ({ id, title, tasks }: ColumnProps) => {
  return (
    <div className="w-full md:w-1/3 p-4">
      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 h-full">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
          {title}
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </h3>
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                min-h-[200px] 
                transition-colors duration-200
                ${snapshot.isDraggingOver ? "bg-blue-50 dark:bg-blue-900/20" : ""}
              `}
            >
              {tasks.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

/*  
Explicación de Tailwind en Column
min-h-[200px]: Altura mínima personalizada para que la zona de drop sea clicable incluso vacía.

snapshot.isDraggingOver ? 'bg-blue-50 dark:bg-blue-900/20' : '': Fondo azul claro cuando una tarea se arrastra sobre la columna, dando feedback visual inmediato.

md:w-1/3: En pantallas medianas (≥768px), cada columna ocupa 1/3 del ancho.

h-full: La columna ocupa toda la altura disponible. 
*/
