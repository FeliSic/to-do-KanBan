DOCUMENTACIÓN SOBRE EL PROYECTO

1. Propuesta de Librerías y Justificación (Fundamental para UX y DnD)
   Siguiendo tu pedido de ejemplificación, estas son mis recomendaciones con el "por qué":

a) Drag & Drop: @hello-pangea/dnd

¿Por qué esta y no react-beautiful-dnd? react-beautiful-dnd (del equipo de Atlassian) es el estándar de facto, pero no se actualiza para React 18/Next.js 13+ y causa errores de hidratación. @hello-pangea/dnd es un fork mantenido activamente que soluciona exactamente esos problemas de compatibilidad con App Router y Strict Mode.

Explicación UX: Esta librería maneja la accesibilidad por defecto (teclado para reordenar), la física del arrastre (soltar suavemente) y la sensación de "levantar" el elemento. Implementar esto desde cero con useState y eventos del mouse es un infierno de bugs (scroll fantasma, placeholders que parpadean).

Ejemplificación de uso: Envolveremos las columnas en un <DragDropContext> y cada tarea en un <Draggable>. Es más sencillo de lo que parece una vez montado.

b) Gestión de Estado Global + Persistencia: Zustand + Persist Middleware

¿Por qué no Context API o Redux? Context es malo para rendimiento en DnD (cada movimiento de mouse re-renderizaría toda la app). Redux es excesivo. Zustand es minimalista, no requiere providers, y su middleware persist guarda automáticamente en localStorage con una sola línea de código.

Cumple tu requisito: El usuario no se logea. Al recargar la página, el estado de las columnas y tareas se recupera mágicamente del navegador.

Ejemplificación:

typescript
// store/taskStore.ts
export const useTaskStore = create(
persist(
(set) => ({ tasks: [], addTask: ... }),
{ name: 'kanban-storage' } // <- Clave de LocalStorage
)
);
c) Fechas y Filtros: date-fns

¿Por qué? Es ligero, modular y maneja zonas horarias y formateo relativo ("Vence mañana", "Hace 2 días") sin el peso de Moment.js. Esto es crucial para el filtro de "Fecha Límite".

d) UX Quality of Life: react-hot-toast

Explicación: Drag & Drop es divertido, pero el usuario necesita saber qué pasó. "Tarea movida a Hecho", "No puedes mover eso ahí" (validación). Son notificaciones flotantes no intrusivas, estilizables con Tailwind.

2. Arquitectura y Estructura de Carpetas Propuesta
   Basado en tu esquema App Router, propongo la siguiente organización refinada para que controllers y components no se mezclen con la lógica de enrutamiento de Next.js.

text
📁 src/
├── 📁 app/ # Zona de Ruteo (Solo Pages y Layouts)
│ ├── 📄 layout.tsx # HTML global, Fonts, Providers (Zustand/Toast)
│ ├── 📄 page.tsx # Punto de entrada -> <HomeScreen />
│ ├── 📁 api/ # Endpoints (Simples pasamanos)
│ │ └── 📁 tasks/
│ │ └── 📄 route.ts # GET, POST -> Llama a controllers/taskController
│ └── 📁 faq/ # Página de Dudas Frecuentes (Ejemplo de page routing)
│ └── 📄 page.tsx
│
├── 📁 components/ # Lógica de UI y Vistas (Aquí vive Tailwind)
│ ├── 📁 ui/ # Botones, Cards, Modales (Dumb Components)
│ │ ├── 📄 Button.tsx
│ │ └── 📄 KanbanCard.tsx
│ ├── 📁 board/ # Componentes específicos del Kanban
│ │ ├── 📄 BoardScreen.tsx # Contenedor principal con DragDropContext
│ │ ├── 📄 Column.tsx # Droppable area
│ │ └── 📄 TaskItem.tsx # Draggable item
│ │ └── 📄 TrashZone.tsx # Papelera para eliminar Task
│ ├── 📁 modal/ # Componentes específicos del Kanban
│ │ ├── 📄 TaskModal.tsx # Modal para crear nuevas tareas con validaciones básicas.
│ ├── 📁 filters/ # Barra de búsqueda y filtros por fecha
│ │ └── 📄 FilterBar.tsx
│
├── 📁 bknd/ # Backend For Frontend (Tu carpeta sugerida)
│ ├── 📁 controllers/
│ │ └── 📄 taskController.ts # Lógica pura de arrays: mover, borrar, editar
│ ├── 📁 models/ # (Opcional ahora) Types de TS
│ │ └── 📄 Task.types.ts
│ └── 📄 index.ts # Barrel export
│
├── 📁 lib/ # Utilidades transversales
│ ├── 📄 store.ts # Zustand Store (State Global)
│ ├── 📄 utils.ts # Helpers de fechas (date-fns)
│ └── 📄 constants.ts # Estados: PENDIENTE, EN_PROGRESO, HECHO
│
└── 📁 styles/ # Tailwind Config
└── 📄 globals.css
Aclaración importante sobre el flujo:

Usuario arrastra una tarea -> Componente BoardScreen llama a la función del Store de Zustand (moveTask).

El Store actualiza el array de tareas en memoria y el middleware persist lo guarda en localStorage.

NO se llama a /api/tasks. ¿Por qué? Porque no hay Base de Datos. La fuente de la verdad es localStorage y el State. La carpeta app/api quedaría ahí lista para el día que quieras sincronizar con un backend real, pero ahora mismo sería redundante. (Si te parece bien, podemos incluso comentarla/obviarla en esta primera fase).

3. ¿Cómo empezamos? (El Plan de Acción Paso a Paso)
   Para evitar el caos de clases de Tailwind que mencionás, propongo arrancar con Piedra Fundamental.

Fase 1: Setup y Modelo de Datos (HOY)

Inicializar Next.js con Tailwind y TypeScript.

Crear la carpeta lib/store.ts y definir el tipo Task (id, título, descripción, fechaLímite, estado).

Configurar Zustand con persist para un mock inicial de 3 tareas de ejemplo.

Consulta previa: Mostrarte el tipado de Task y el Store inicial para ver si querés más campos (prioridad, etiquetas, etc.).

Fase 2: La UI Base (Consulta de Tailwind)

Crear HomeScreen.tsx con un layout de 3 columnas usando Grid de Tailwind.

Maquetar una <KanbanCard /> básica (sin drag aún).

Momento Clave: Te voy a explicar por qué uso w-full md:w-1/3, flex flex-col gap-4, etc., para que no sea una caja negra de clases.

Fase 3: Drag & Drop + Lógica de Movimiento

Instalar @hello-pangea/dnd.

Conectar el contexto y hacer que las tareas se muevan visualmente entre columnas.

Explicación detallada: Cómo la librería maneja el onDragEnd y cómo conectamos ese evento a nuestra función moveTask del Store de Zustand.

Fase 4: Filtros y Fechas Límite

Implementar un buscador por texto (filtra título/descripción en memoria).

Añadir botones para filtrar por "Vence hoy / Esta semana".

Fase 5: Quality of Life y Página de FAQ

Añadir Toasts de confirmación.

Crear la página de FAQ estática con preguntas tipo "¿Cómo creo una tarea?".

¿Qué opinás de esta hoja de ruta?
Si estás de acuerdo con:

Usar Zustand (State) en vez de app/api para esta fase sin DB.

Usar Pangea DnD para el arrastre.

La estructura de carpetas detallada arriba.

Resumen del proyecto entregado
Característica Estado
Tablero Kanban con 3 columnas (Pendiente, En Progreso, Hecho) ✅
Drag & Drop funcional (con @hello-pangea/dnd) ✅
Creación de tareas con modal y validaciones ✅
Búsqueda por texto (título/descripción) ✅
Filtros por fecha (Hoy, Esta semana, Vencidas) ✅
Persistencia automática en localStorage (Zustand) ✅
Eliminación de tareas arrastrando a papelera ✅
Notificaciones toast para cada acción ✅
Página de FAQ estática con navegación ✅
Soporte para tema oscuro con Tailwind ✅
Totalmente responsive (mobile/desktop) ✅
🚀 Posibles mejoras futuras (si quisieras expandirlo)
Edición de tareas: doble clic en la tarjeta para modificar título, descripción o fecha.

Prioridades: etiquetas visuales (Alta, Media, Baja) con colores.

Modo oscuro manual: switch para forzar tema claro/oscuro.

Exportar/Importar: backup de tareas en archivo JSON.

Testing unitario: con Jest y React Testing Library.
