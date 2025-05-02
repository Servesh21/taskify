import {
    addDays,
    addWeeks,
    addMonths,
    addYears,
    isAfter,
    setDate,
    getDay,
    startOfMonth,
  } from 'date-fns';
  
  export function generateRecurringDates(
    startDate: Date,
    recurrence: string,
    interval: number,
    endDate?: Date,
    options?: {
      selectedWeekdays?: number[];
      nthWeek?: number;
      nthWeekday?: number;
    }
  ): Date[] {
    const dates: Date[] = [];
    let current = new Date(startDate);
    let count = 0;
  
    while (count < 10) {
      if (endDate && isAfter(current, endDate)) break;
  
      if (recurrence === 'weekday' && options?.selectedWeekdays?.includes(current.getDay())) {
        dates.push(new Date(current));
      } else if (recurrence === 'nthWeekday') {
        const monthStart = startOfMonth(current);
        let weekdayCount = 0;
  
        for (let d = 1; d <= 31; d++) {
          const temp = setDate(monthStart, d);
          if (temp.getMonth() !== current.getMonth()) break;
          if (temp.getDay() === options?.nthWeekday) {
            weekdayCount++;
            if (weekdayCount === options.nthWeek) {
              dates.push(temp);
              break;
            }
          }
        }
      } else if (recurrence !== 'none' && recurrence !== 'weekday' && recurrence !== 'nthWeekday') {
        dates.push(new Date(current));
      }
  
      switch (recurrence) {
        case 'daily':
          current = addDays(current, interval);
          break;
        case 'weekly':
          current = addWeeks(current, interval);
          break;
        case 'monthly':
          current = addMonths(current, interval);
          break;
        case 'yearly':
          current = addYears(current, interval);
          break;
        default:
          current = addDays(current, 1);
      }
  
      count++;
    }
  
    return dates;
  }
  