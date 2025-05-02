function generateRecurringDates(startDate, type, interval, endDate) {
    const dates = [];
    let current = new Date(startDate);
    endDate = endDate ? new Date(endDate) : new Date(current.getFullYear() + 1, 0, 1);
  
    while (current <= endDate) {
      dates.push(new Date(current));
      switch (type) {
        case 'daily': current.setDate(current.getDate() + interval); break;
        case 'weekly': current.setDate(current.getDate() + interval * 7); break;
        case 'monthly': current.setMonth(current.getMonth() + interval); break;
        case 'yearly': current.setFullYear(current.getFullYear() + interval); break;
        default: return []; // No recurrence
      }
    }
  
    return dates;
  }
  
  module.exports = { generateRecurringDates };
  