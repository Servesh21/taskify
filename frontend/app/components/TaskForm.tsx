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

  // Display interval options for recurring tasks
  const showIntervalOptions = () => {
    if (recurrenceType !== 'none' && recurrenceType !== 'weekday' && recurrenceType !== 'nthWeekday') {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Repeat Every</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={interval}
              onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
              className="w-20 border border-gray-300 rounded px-3 py-2"
            />
            <span className="text-gray-600">
              {recurrenceType === 'daily' && 'day(s)'}
              {recurrenceType === 'weekly' && 'week(s)'}
              {recurrenceType === 'monthly' && 'month(s)'}
              {recurrenceType === 'yearly' && 'year(s)'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">Create New Task</h2>
      
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMM d, yyyy"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date (Optional)</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="MMM d, yyyy"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholderText="No end date"
            isClearable
            minDate={startDate || new Date()}
          />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Recurrence</label>
        <select
          value={recurrenceType}
          onChange={(e) => setRecurrenceType(e.target.value as any)}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="none">No Recurrence</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
          <option value="weekday">Specific Weekdays</option>
          <option value="nthWeekday">Nth Weekday of Month</option>
        </select>
      </div>

      {showIntervalOptions()}

      {recurrenceType === 'weekday' && (
        <div className="mb-5 bg-gray-50 p-4 rounded-md border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Days</label>
          <div className="grid grid-cols-7 gap-2 text-sm">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
              <div key={day} className="flex flex-col items-center">
                <button
                  type="button"
                  className={`w-10 h-10 rounded-full flex items-center justify-center focus:outline-none ${
                    selectedWeekdays.includes(i)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setSelectedWeekdays((prev) =>
                      prev.includes(i)
                        ? prev.filter((d) => d !== i)
                        : [...prev, i]
                    );
                  }}
                >
                  {day}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {recurrenceType === 'nthWeekday' && (
        <div className="mb-5 bg-gray-50 p-4 rounded-md border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Which Weekday</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Week</label>
              <select
                value={nthWeek}
                onChange={(e) => setNthWeek(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>First</option>
                <option value={2}>Second</option>
                <option value={3}>Third</option>
                <option value={4}>Fourth</option>
                <option value={5}>Fifth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-500 mb-1">Day</label>
              <select
                value={nthWeekday}
                onChange={(e) => setNthWeekday(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>
      )}

      {recurrenceType !== 'none' && startDate && (
        <div className="mb-5 bg-blue-50 p-4 rounded-md border border-blue-100">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Recurrence Summary</h3>
          <p className="text-sm text-blue-700">
            {recurrenceType === 'daily' && `Repeats every ${interval} day(s)`}
            {recurrenceType === 'weekly' && `Repeats every ${interval} week(s)`}
            {recurrenceType === 'monthly' && `Repeats every ${interval} month(s)`}
            {recurrenceType === 'yearly' && `Repeats every ${interval} year(s)`}
            {recurrenceType === 'weekday' && `Repeats on selected weekdays`}
            {recurrenceType === 'nthWeekday' && 
              `Repeats on the ${['first', 'second', 'third', 'fourth', 'fifth'][nthWeek-1]} ${
                ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][nthWeekday]
              } of each month`
            }
            {endDate ? ` until ${endDate.toLocaleDateString()}` : ' with no end date'}
          </p>
        </div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setStartDate(new Date());
            setRecurrenceType('none');
            setInterval(1);
            setEndDate(null);
            setSelectedWeekdays([]);
          }}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={!title.trim()}
        >
          Add Task
        </button>
      </div>
    </form>
  );
}