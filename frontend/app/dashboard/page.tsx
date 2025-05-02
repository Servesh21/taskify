'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/UseAuthStore';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskOverview from '../components/TaskOverview';
import { fetchTasks, addTask, markAsDone, fetchUpcoming,markasUndone } from '../lib/api';

export default function DashboardPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const [tasks, setTasks] = useState<any[]>([]);
  const [upcomingWeek, setUpcomingWeek] = useState<any[]>([]);
  const [upcomingMonth, setUpcomingMonth] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    } else {
      loadTasks();
      loadUpcoming();
    }
  }, [isAuthenticated]);

  const loadTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const loadUpcoming = async () => {
    const week = await fetchUpcoming('week');
    const month = await fetchUpcoming('month');
    setUpcomingWeek(week);
    setUpcomingMonth(month);
  };

  const handleAddTask = async (task: any) => {
    await addTask(task);
    loadTasks();
    loadUpcoming();
  };

  const handlemarkAsDone = async (id: number) => {
    console.log('Toggling task with ID:', id);
    await markAsDone(id);
    loadTasks();
  };
  const MarkAsundone = async (id: number) => {
    console.log('Toggling task with ID:', id);
    await markasUndone(id);
    loadTasks();
  };

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
      <TaskList tasks={tasks} markasdone={handlemarkAsDone} markasundone={MarkAsundone} />
      <TaskOverview week={upcomingWeek} month={upcomingMonth} />
    </div>
  );
}
