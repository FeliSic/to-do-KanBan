"use client";

import { useState } from "react";
import { isToday, isThisWeek, isPast, parseISO } from "date-fns";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDateFilterChange?: (filter: DateFilterType) => void;
}

export type DateFilterType = "ALL" | "TODAY" | "THIS_WEEK" | "OVERDUE";

export const FilterBar = ({
  searchTerm,
  onSearchChange,
  onDateFilterChange,
}: FilterBarProps) => {
  const [activeDateFilter, setActiveDateFilter] =
    useState<DateFilterType>("ALL");

  const handleDateFilterClick = (filter: DateFilterType) => {
    setActiveDateFilter(filter);
    onDateFilterChange?.(filter);
  };

  const filterButtonClass = (isActive: boolean) => `
    px-3 py-1.5 text-sm font-medium rounded-full transition-colors
    ${
      isActive
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
    }
  `;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="relative w-full sm:w-80">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar tareas..."
          className="
            block w-full pl-10 pr-3 py-2 
            border border-gray-300 dark:border-gray-600 
            rounded-md 
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          "
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleDateFilterClick("ALL")}
          className={filterButtonClass(activeDateFilter === "ALL")}
        >
          Todas
        </button>
        <button
          onClick={() => handleDateFilterClick("TODAY")}
          className={filterButtonClass(activeDateFilter === "TODAY")}
        >
          Hoy
        </button>
        <button
          onClick={() => handleDateFilterClick("THIS_WEEK")}
          className={filterButtonClass(activeDateFilter === "THIS_WEEK")}
        >
          Esta semana
        </button>
        <button
          onClick={() => handleDateFilterClick("OVERDUE")}
          className={filterButtonClass(activeDateFilter === "OVERDUE")}
        >
          Vencidas
        </button>
      </div>
    </div>
  );
};

/*
 Explicación de Tailwind en FilterBar
inset-y-0 left-0 pl-3: Posiciona el icono de búsqueda de forma absoluta en la izquierda.

focus:ring-2 focus:ring-blue-500: Anillo de enfoque azul accesible al hacer clic en el input.

sm:w-80: En pantallas pequeñas ocupa todo el ancho; en pantallas mayores a 640px ocupa 320px.
*/
