"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskStore } from "@/src/lib/store";
import { Column } from "./Column";
import { FilterBar, DateFilterType } from "../filters/FilterBar";
import { useState, useMemo } from "react";
import { Task } from "@/src/lib/types/task.types";
import { AddTaskModal } from "../modal/TaskModal";
import { toast } from "react-hot-toast";
import { isToday, isThisWeek, isPast, parseISO } from "date-fns";
import Link from "next/link";
import { TrashZone } from "./TrashZone";

export const BoardScreen = () => {
  const { tasks, moveTask, deleteTask } = useTaskStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<DateFilterType>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtro combinado: texto + fecha
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Filtro de texto
      const matchesText =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesText) return false;

      // Filtro de fecha
      const dueDate = new Date(task.dueDate);
      switch (dateFilter) {
        case "TODAY":
          return isToday(dueDate);
        case "THIS_WEEK":
          return isThisWeek(dueDate, { weekStartsOn: 1 }); // Lunes como inicio
        case "OVERDUE":
          return isPast(dueDate) && !isToday(dueDate);
        default:
          return true;
      }
    });
  }, [tasks, searchTerm, dateFilter]);

  const pendingTasks = filteredTasks.filter((t) => t.status === "PENDIENTE");
  const inProgressTasks = filteredTasks.filter(
    (t) => t.status === "EN_PROGRESO",
  );
  const doneTasks = filteredTasks.filter((t) => t.status === "HECHO");

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Si se suelta fuera de cualquier droppable
    if (!destination) return;

    // Si se suelta en la papelera
    if (destination.droppableId === "trash") {
      deleteTask(draggableId);
      toast.success("Tarea eliminada");
      return;
    }

    // Si no cambió de columna ni posición
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Movimiento entre columnas
    const newStatus = destination.droppableId as Task["status"];
    moveTask(draggableId, newStatus);
    toast.success(`Tarea movida a ${newStatus}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Cabecera con botones FAQ y Nueva Tarea */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Tablero Kanban
        </h1>
        <div className="flex gap-3">
          <Link
            href="/faq"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            FAQ
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + Nueva Tarea
          </button>
        </div>
      </div>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onDateFilterChange={setDateFilter}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <Column id="PENDIENTE" title="Pendiente" tasks={pendingTasks} />
          <Column
            id="EN_PROGRESO"
            title="En Progreso"
            tasks={inProgressTasks}
          />
          <Column id="HECHO" title="Hecho" tasks={doneTasks} />
        </div>
        <TrashZone />
      </DragDropContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
/*
Explicación de Tailwind en BoardScreen
max-w-[1600px] mx-auto: Ancho máximo personalizado de 1600px con centrado automático.

flex-col md:flex-row: En móvil las columnas se apilan verticalmente; en desktop se alinean horizontalmente.

gap-4: Espacio uniforme entre columnas.
*/
