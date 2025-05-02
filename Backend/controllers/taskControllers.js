import pool from '../db/index.js'; // Assuming you have a database connection file
import  generateRecurringDates  from '../utils/recurenceUtils.js'; // Assuming you have a utility function to generate dates

const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY start_date DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addTask = async (req, res) => {
  const { title, startDate, recurrenceType, interval, endDate,selectedWeekdays,nthWeek,nthWeekday } = req.body;
  console.log(recurrenceType, interval, startDate, endDate, selectedWeekdays, nthWeek, nthWeekday)
  // console.log(req.body)
  try {
    await pool.query(
      `INSERT INTO tasks 
       (title, start_date, end_date, recurrence_type, interval, selected_weekdays, nth_week, nth_weekday) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [ title, startDate, endDate, recurrenceType, interval, selectedWeekdays, nthWeek, nthWeekday]
    );
    res.status(201).json({ message: 'Task added' });
    console.log('Task added successfully');
  } catch (err) {
    console.error('Error adding task:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const markAsDone = async (req, res) => {
  const { id } = req.params;
  console.log('Marking task as done:', id);
  try {
    await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2', [true, id]);
    console.log('Task marked as completed');
    res.json({ message: 'Task marked as completed' });
  } catch (err) {
    console.error('Error marking task as done:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const markAsunDone = async (req, res) => {
  const { id } = req.params;
  console.log('Marking task as undone:', id);
  try {
    await pool.query('UPDATE tasks SET completed = $1 WHERE id = $2', [false, id]);
    console.log('Task marked as uncompleted');
    res.json({ message: 'Task marked as uncompleted' });
  }
  catch (err) {
    console.error('Error marking task as undone:', err.message);
    res.status(500).json({ error: err.message });
  }
}

const getUpcoming = async (req, res) => {
  const { range } = req.params; // 'week' or 'month'
  try {
    const result = await pool.query('SELECT * FROM tasks');
    const today = new Date();
    const limitDate = new Date(today);
    range === 'week' ? limitDate.setDate(today.getDate() + 7) : limitDate.setMonth(today.getMonth() + 1);

    const upcoming = [];

    result.rows.forEach(task => {
      const dates = generateRecurringDates(task.start_date, task.recurrence_type, task.interval, task.end_date);
      const upcomingDates = dates.filter(d => d >= today && d <= limitDate);
      if (upcomingDates.length) {
        upcoming.push({ ...task, upcomingDates });
      }
    });

    res.json(upcoming);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export  {  
  
  getTasks,
  addTask,
  markAsDone,
  markAsunDone,
  getUpcoming,
} 