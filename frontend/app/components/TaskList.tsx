'use client';

import { deleteTask,fetchTasks } from '../lib/api'; // Make sure this points to your deleteTask function
import { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  start_date: string | Date;
  recurrence_type: string;
  interval: number;
  endDate?: string | Date | null;
  completed: boolean;
}

export default function TaskList({
  tasks,
  markasdone,
  markasundone,
  onDelete,
}: {
  tasks: Task[];
  markasdone: (id: number) => void;
  markasundone: (id: number) => void;
  onDelete?: (id: number) => void; 
}) {
  if (!Array.isArray(tasks)) return <p>Invalid task data</p>;

  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        alert('Task deleted');
        if (onDelete) onDelete(id); 
      } catch (error) {
        alert('Failed to delete task');
        console.error(error);
      }
    }
  };

  const renderTask = (task: Task) => {
    const start = new Date(task.start_date);
    const end = task.endDate ? new Date(task.endDate) : null;

    return (
      <li
        key={task.id}
        className="p-3 bg-white rounded shadow-sm border flex justify-between items-center"
      >
        <div>
          <strong>{task.title}</strong>
          <div className="text-sm text-gray-600">
            Starts on: {start.toLocaleDateString()}
            {task.recurrence_type !== 'none' && (
              <div>
                Repeats {task.recurrence_type}
                {end && `, until ${end.toLocaleDateString()}`}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              task.completed ? markasundone(task.id) : markasdone(task.id)
            }
            className={`px-3 py-1 rounded text-sm ${
              task.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
            }`}
          >
            {task.completed ? 'Undo' : 'Mark as Done'}
          </button>
          <button
            onClick={() => handleDelete(task.id)}
            className="px-3 py-1 rounded text-sm bg-red-500 text-white"
          >
            Delete
          </button>
        </div>
      </li>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Pending</h3>
        <ul className="space-y-2">
          {pending.length ? pending.map(renderTask) : <p className="text-gray-500">No pending tasks</p>}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Completed</h3>
        <ul className="space-y-2">
          {completed.length ? completed.map(renderTask) : <p className="text-gray-500">No completed tasks</p>}
        </ul>
      </div>
    </div>
  );
}
