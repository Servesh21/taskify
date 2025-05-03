'use client';

import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar';
import { 
  format, 
  parse, 
  startOfWeek, 
  getDay, 
  parseISO, 
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { fetchUpcoming } from '../lib/api';

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {},
});

type UpcomingTask = {
  title: string;
  upcomingDates: string[];
};

type CalendarEvent = {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};

export default function TaskOverview() {
  const [tasks, setTasks] = useState<UpcomingTask[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDateTasks, setSelectedDateTasks] = useState<UpcomingTask[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const loadData = async () => {
      const allTasks = await fetchUpcoming('month'); // or 'all' if you support it
      setTasks(allTasks);

      // Convert to calendar events
      const calendarEvents: CalendarEvent[] = [];
      allTasks.forEach((task: { upcomingDates: any[]; title: any; }) => {
        task.upcomingDates.forEach(dateStr => {
          const date = parseISO(dateStr);
          calendarEvents.push({
            title: task.title,
            start: date,
            end: date,
            allDay: true,
          });
        });
      });
      setEvents(calendarEvents);
    };

    loadData();
  }, []);

  const handleDateClick = (slotInfo: { start: Date }) => {
    const clickedDate = slotInfo.start;
    const filteredTasks = tasks.filter(task =>
      task.upcomingDates.some(dateStr =>
        isSameDay(parseISO(dateStr), clickedDate)
      )
    );
    setSelectedDateTasks(filteredTasks);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const currentMonthDisplay = format(currentDate, 'MMMM yyyy');

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Calendar View</h2>
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handlePreviousMonth}
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          
          <span className="text-lg font-medium">{currentMonthDisplay}</span>
          
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            onClick={handleNextMonth}
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="h-[70vh] bg-white shadow rounded p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable
          onSelectSlot={handleDateClick}
          views={['month']}
          date={currentDate}
          onNavigate={(date) => {
            setCurrentDate(date);
          }}
          toolbar={false} // Remove default toolbar
          style={{ height: '100%' }}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mt-4">Tasks on Selected Date:</h3>
        {selectedDateTasks.length === 0 ? (
          <p className="text-gray-600">No tasks on this date.</p>
        ) : (
          <ul className="list-disc list-inside text-gray-800">
            {selectedDateTasks.map((task, i) => (
              <li key={i}>{task.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}