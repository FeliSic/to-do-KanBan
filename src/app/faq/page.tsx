import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver al tablero
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Preguntas Frecuentes
        </h1>

        <div className="space-y-6">
          <FaqItem
            question="¿Cómo creo una nueva tarea?"
            answer="Haz clic en el botón '+ Nueva Tarea' en la esquina superior derecha. Completa el título, descripción (opcional) y fecha límite. La tarea se agregará automáticamente a la columna 'Pendiente'."
          />
          <FaqItem
            question="¿Cómo muevo una tarea entre columnas?"
            answer="Simplemente arrastra la tarjeta de la tarea y suéltala en la columna deseada. Recibirás una notificación confirmando el cambio."
          />
          <FaqItem
            question="¿Puedo buscar tareas específicas?"
            answer="Sí, utiliza la barra de búsqueda en la parte superior. Filtra por texto en el título o descripción de las tareas."
          />
          <FaqItem
            question="¿Qué significan los filtros de fecha?"
            answer="Puedes filtrar tareas que vencen 'Hoy', 'Esta semana' o que están 'Vencidas'. Estos filtros se combinan con la búsqueda de texto."
          />
          <FaqItem
            question="¿Mis tareas se guardan si cierro el navegador?"
            answer="¡Sí! Todas tus tareas se almacenan automáticamente en el almacenamiento local de tu navegador. Al volver a abrir la página, recuperarás tu tablero exactamente como lo dejaste."
          />
          <FaqItem
            question="¿Necesito crear una cuenta para usar la aplicación?"
            answer="No, la aplicación está diseñada para ser simple y sin fricción. No se requiere registro ni inicio de sesión."
          />
          <FaqItem
            question="¿Cómo puedo contactar al soporte?"
            answer="Puedes enviarnos un correo a soporte@kanban-app.com o visitar nuestra sección de contacto (próximamente)."
          />
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {question}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{answer}</p>
    </div>
  );
}
