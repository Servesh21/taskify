'use client';
import { generateRecurringDates } from '../utils/generateRecurringDates';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskForm({ onAdd }: { onAdd: (task: any) => void }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [recurrenceType, setRecurrenceType] = useState<'none' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'weekday' | 'nthWeekday'>('none');
  const [interval, setInterval] = useState(1);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([]); // For specific weekdays
  const [nthWeek, setNthWeek] = useState<number>(1); // For nth weekday
  const [nthWeekday, setNthWeekday] = useState<number>(0); // For nth weekday (e.g., Monday = 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title,
        startDate,
        recurrenceType,
        interval,
        endDate,
        selectedWeekdays,
        nthWeek,
        nthWeekday,
      });
      setTitle('');
      setStartDate(new Date());
      setRecurrenceType('none');
      setInterval(1);
      setEndDate(null);
      setSelectedWeekdays([]);
      setNthWeek(1);
      setNthWeekday(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-6 space-y-4">
      <div>
        <label className="block font-medium">Task Title</label>
        <input
          className="w-full p-2 border rounded mt-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div>
        <label className="block font-medium">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Recurrence Type</label>
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value as any)}
          className="w-full border px-3 py-2 rounded mb-3"
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="weekday">Specific Weekdays</option>
          <option value="nthWeekday">Nth Weekday of Month</option>
        </select>
      </div>

      {recurrenceType === 'weekday' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Select Days</label>
          <div className="grid grid-cols-4 gap-2 text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <label key={day} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={i}
                  checked={selectedWeekdays.includes(i)}
                  onChange={(e) => {
                    const day = Number(e.target.value);
                    setSelectedWeekdays((prev) =>
                      prev.includes(day)
                        ? prev.filter((d) => d !== day)
                        : [...prev, day]
                    );
                  }}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'nthWeekday' && (
        <div className="mb-4">
          <label className="block font-medium mb-1">Which Weekday</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={nthWeek}
              onChange={(e) => setNthWeek(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <select
              value={nthWeekday}
              onChange={(e) => setNthWeekday(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(
                (day, i) => (
                  <option key={day} value={i}>
                    {day}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      )}

      {/* {recurrenceType !== 'none' && startDate && (
        <div>
          <label className="block font-medium mb-1">Preview Recurrence</label>
          <div className="bg-gray-100 p-2 rounded text-sm text-gray-700 space-y-1">
            {startDate &&
              generateRecurringDates(
                startDate,
                recurrenceType,
                interval,
                endDate || undefined,
                { selectedWeekdays, nthWeek, nthWeekday }
              ).map((date, idx) => (
                <div key={idx}>• {date.toLocaleDateString()}</div>
              ))}
          </div>
        </div>
      )} */}

      <div>
        <label className="block font-medium">End Date (optional)</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          className="w-full p-2 border rounded mt-1"
          placeholderText="No end date"
          isClearable
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
      >
        Add Task
      </button>
    </form>
  );
}
