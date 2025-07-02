import { useState } from 'react'
import { DndContext, type DragEndEvent } from "@dnd-kit/core"
import Droppable from './Droppable'
import Draggable from './Draggable'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { tasks } from '../../../utils/constants'
import type { TaskOverview, TaskPriority, TaskStatus } from "../../../utils/types";
import { Dialog } from './Dialog';
import AddTaskForm from './AddTaskForm';
export default function KanbanBoard() {
  const [taskList, setTaskList] = useState(tasks);
  const [columns, setColumns] = useState(taskList.reduce((acc, task) => {
    const col = acc.find(col => col.id === task.status);
    if (col) {
      col.items.push(task.id);
    } else {
      acc.push({ id: task.status, items: [task.id] });
    }
    return acc;
  }, [] as { id: TaskStatus; items: string[] }[]));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Find source column and index
    let fromColIdx = -1, fromItemIdx = -1;
    columns.forEach((col, colIdx) => {
      const idx = col.items.indexOf(active.id as string);
      if (idx !== -1) {
        fromColIdx = colIdx;
        fromItemIdx = idx;
      }
    });

    // Find target column and index
    let toColIdx = -1, toItemIdx = -1;
    columns.forEach((col, colIdx) => {
      const idx = col.items.indexOf(over.id as string);
      if (idx !== -1) {
        toColIdx = colIdx;
        toItemIdx = idx;
      }
    });

    // If dropped on a column (not an item), fallback to column id
    if (toColIdx === -1) {
      toColIdx = columns.findIndex(col => col.id === over.id);
      toItemIdx = columns[toColIdx]?.items.length ?? -1;
    }

    if (fromColIdx === -1 || toColIdx === -1) return;

    const newColumns = columns.map(col => ({ ...col, items: [...col.items] }));
    const [moved] = newColumns[fromColIdx].items.splice(fromItemIdx, 1);
    // If same column and reordering
    if (fromColIdx === toColIdx) {
      newColumns[toColIdx].items.splice(toItemIdx, 0, moved);
    } else {
      newColumns[toColIdx].items.splice(toItemIdx, 0, moved);
    }
    setColumns(newColumns);
  }
  const addtask = (title: string, description: string, status: TaskStatus, priority: TaskPriority) => {
    const newTask: TaskOverview = {
      id: `task-${Date.now()}`,
      title,
      description,
      status,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTaskList(prevTasks => [...prevTasks, newTask]);
  };
  const getTitleStyle = (status: TaskStatus) => {
    switch (status) {
      case "OVERDUE":
        return "bg-gray-200 text-gray-800";
      case "PENDING":
        return "bg-blue-200 text-blue-800";
      case "DONE":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  return (
    <div className="flex flex-wrap items-start justify-center min-h-screen gap-4 p-4 bg-gray-100 dark:bg-gray-900">
      <DndContext onDragEnd={handleDragEnd}>
        {columns.map(col => (
          <Droppable key={col.id} id={col.id}>
            <SortableContext 
              id={col.id} 
              items={col.items}
              strategy={verticalListSortingStrategy}
            >
              <p className={`${getTitleStyle(col.id)} font-bold w-full text-center text-xl py-2`}>{col.id}</p>
              {col.items.map(itemId => {
                const task = tasks.find(task => task.id === itemId);
                return task ? (
                  <Draggable
                    key={itemId}
                    id={itemId}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                  />
                ) : null;
              })}
            </SortableContext>
          </Droppable>
        ))}
      </DndContext>
      <Dialog actionTitle="Add Task" title="New Task" description="Create a new task" action={() => addtask("New Task", "Task Description", "PENDING", "MEDIUM")} >
        <AddTaskForm />
      </Dialog>
    </div>
  )
}