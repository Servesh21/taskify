'use client';
import { useState } from 'react';

interface Task {
  title: string;
  startDate: Date;
  recurrenceType: string;
  interval: number;
  endDate?: Date | null;
  completed: boolean;
}

export default function TaskList({ tasks, onToggle }: {
  tasks: Task[];
  onToggle: (index: number) => void;
}) {
  const pending = tasks.filter((task) => !task.completed);
  const completed = tasks.filter((task) => task.completed);

  const renderTask = (task: Task, idx: number) => (
    <li key={idx} className="p-3 bg-white rounded shadow-sm border flex justify-between items-center">
      <div>
        <strong>{task.title}</strong>
        <div className="text-sm text-gray-600">
          Starts on: {new Date(task.startDate).toLocaleDateString()}
          {task.recurrenceType !== 'none' && (
            <div>
              Repeats every {task.interval} {task.recurrenceType}
              {task.endDate && `, until ${new Date(task.endDate).toLocaleDateString()}`}
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => onToggle(idx)}
        className={`px-3 py-1 rounded text-sm ${
          task.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {task.completed ? 'Undo' : 'Mark as Done'}
      </button>
    </li>
  );

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
