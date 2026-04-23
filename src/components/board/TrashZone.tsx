"use client";

import { Droppable } from "@hello-pangea/dnd";

export const TrashZone = () => {
  return (
    <Droppable droppableId="trash">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`
            mt-6 p-4 
            border-2 border-dashed rounded-lg 
            transition-all duration-200
            flex items-center justify-center
            ${
              snapshot.isDraggingOver
                ? "border-red-500 bg-red-50 dark:bg-red-900/20 scale-105"
                : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50"
            }
          `}
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="font-medium">
              {snapshot.isDraggingOver
                ? "Suelta para eliminar"
                : "Arrastra aquí para eliminar tarea"}
            </span>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
