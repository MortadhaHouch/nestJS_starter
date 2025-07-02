import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import type { TaskPriority } from "../../../utils/types";
export default function Draggable({ id,title,description,priority }: { id: string,title: string,description: string,priority: TaskPriority }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-200 text-red-800 border-red-300";
      case "MEDIUM":
        return "bg-yellow-200 text-yellow-800 border-yellow-300";
      case "LOW":
        return "bg-green-200 text-green-800 border-green-300";
      default:
        return "bg-gray-200 text-gray-800 border-gray-300";
    }
  };
  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative flex flex-col items-center justify-center w-full gap-1 p-2 px-4 py-2 font-bold text-white transition-all duration-200 ease-in-out bg-blue-400 border border-blue-700 rounded shadow-md dark:bg-blue-800 border-ring-200 hover:shadow-lg hover:scale-105 active:scale-100 active:shadow-sm active:bg-blue-800 active:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 dark:hover:bg-blue-700 dark:active:bg-blue-800 dark:active:border-blue-900 dark:text-white dark:border-blue-700 dark:hover:border-blue-800 dark:hover:text-white"
    >
      {title}
        <p className="text-sm text-gray-300">{description.length > 20 ? description.slice(0, 20) + "..." : description}</p>
        <span className={`text-xs font-bold border-2 rounded-md px-1 py-0.5 text-center ${getPriorityColor(priority)} position-absolute top-2 right-2`}>{priority}</span>
    </button>
  );
}