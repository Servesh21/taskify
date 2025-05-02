'use client';
import { useState, useEffect } from 'react';
import { generateRecurringDates } from '../utils/generateRecurringDates';

type Task = {
  title: string;
  startDate: Date;
  recurrenceType: string;
  interval: number;
  endDate?: Date;
  selectedWeekdays?: number[];
  nthWeek?: number;
  nthWeekday?: number;
};

const TaskOverview = ({ tasks }: { tasks: Task[] }) => {
  const [viewPeriod, setViewPeriod] = useState<'week' | 'month'>('week');
  const [upcomingTasks, setUpcomingTasks] = useState<{ title: string; date: Date }[]>([]);


  useEffect(() => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
  
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
  
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  
    const result: { title: string; date: Date }[] = [];
  
    tasks.forEach((task) => {
      const dates = generateRecurringDates(
        new Date(task.startDate),
        task.recurrenceType,
        task.interval,
        task.endDate ? new Date(task.endDate) : undefined,
        {
          selectedWeekdays: task.selectedWeekdays,
          nthWeek: task.nthWeek,
          nthWeekday: task.nthWeekday,
        }
      );
  
      dates.forEach((date) => {
        if (
          (viewPeriod === 'week' && date >= startOfWeek && date <= endOfWeek) ||
          (viewPeriod === 'month' && date >= startOfMonth && date <= endOfMonth)
        ) {
          result.push({ title: task.title, date });
        }
      });
    });
  
    // Sort by date
    result.sort((a, b) => a.date.getTime() - b.date.getTime());
  
    setUpcomingTasks(result);
  }, [viewPeriod, tasks]);
  

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
        <div>
          <button
            onClick={() => setViewPeriod('week')}
            className={`px-4 py-2 ${viewPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Week
          </button>
          <button
            onClick={() => setViewPeriod('month')}
            className={`px-4 py-2 ${viewPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {upcomingTasks.length === 0 ? (
  <p>No upcoming tasks</p>
) : (
  upcomingTasks.map((task, index) => (
    <div key={index} className="border p-4 rounded-lg bg-white shadow-md">
      <h3 className="font-medium text-lg">{task.title}</h3>
      <p>{task.date.toLocaleDateString()}</p>
    </div>
  ))
)}

      </div>
    </div>
  );
};

export default TaskOverview;
