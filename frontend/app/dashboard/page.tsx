'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/UseAuthStore';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskOverview from '../components/TaskOverview';
export default function DashboardPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [tasks, setTasks] = useState<any[]>([]);

  const handleAddTask = (task: any) => {
    setTasks((prev) => [...prev, { ...task, completed: false }]);
 };

  const handleToggle = (index: number) => {
    setTasks((prev) =>
        prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    );
};


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated]);


  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <button
          onClick={() => {
            logout();
            router.push('/');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <TaskForm onAdd={handleAddTask} />
      <TaskList tasks={tasks} onToggle={handleToggle} />
      <TaskOverview tasks={tasks} />

    </div>
  );
}
