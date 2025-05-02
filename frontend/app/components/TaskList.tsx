'use client';
import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  startDate: string | Date;
  recurrenceType: string;
  interval: number;
  endDate?: string | Date | null;
  completed: boolean;
}

export default function TaskList({
  tasks,
  markasdone,
  markasundone,
}: {
  tasks: Task[];
  markasdone: (id: number) => void;
  markasundone: (id: number) => void;
}) {
  if (!Array.isArray(tasks)) return <p>Invalid task data</p>;
  
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  const renderTask = (task: Task, idx: number) => {
    const start = new Date(task.startDate);
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
            {task.recurrenceType !== 'none' && (
              <div>
                Repeats every {task.interval} {task.recurrenceType}
                {end && `, until ${end.toLocaleDateString()}`}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => task.completed ? markasundone(task.id) : markasdone(task.id)}
          className={`px-3 py-1 rounded text-sm ${
            task.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
          }`}
        >
          {task.completed ? 'Undo' : 'Mark as Done'}
        </button>
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
