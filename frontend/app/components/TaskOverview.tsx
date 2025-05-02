'use client';
import { useState } from 'react';

type UpcomingTask = {
  title: string;
  upcomingDates: string[]; // Dates in string format from backend
};

const TaskOverview = ({
  week,
  month,
}: {
  week: UpcomingTask[];
  month: UpcomingTask[];
}) => {
  const [viewPeriod, setViewPeriod] = useState<'week' | 'month'>('week');
  const data = viewPeriod === 'week' ? week : month;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Upcoming Tasks</h2>
        <div>
          <button
            onClick={() => setViewPeriod('week')}
            className={`px-4 py-2 ${
              viewPeriod === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setViewPeriod('month')}
            className={`px-4 py-2 ${
              viewPeriod === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-300'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p>No upcoming tasks</p>
        ) : (
          data.map((task, i) => (
            <div
              key={i}
              className="border p-4 rounded-lg bg-white shadow-md space-y-1"
            >
              <h3 className="font-medium text-lg">{task.title}</h3>
              {task.upcomingDates.map((date, j) => (
                <p key={j} className="text-sm text-gray-600">
                  {new Date(date).toLocaleDateString()}
                </p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskOverview;
