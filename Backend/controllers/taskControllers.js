const pool = require('../db/index');
const { generateRecurringDates } = require('../utils/recurrenceUtils');

exports.getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTask = async (req, res) => {
  const { title, startDate, recurrenceType, interval, endDate } = req.body;
  try {
    await pool.query(
      'INSERT INTO tasks (title, start_date, recurrence_type, interval, end_date, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [title, startDate, recurrenceType, interval, endDate, 'pending']
    );
    res.status(201).json({ message: 'Task added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markAsDone = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('UPDATE tasks SET status = $1 WHERE id = $2', ['completed', id]);
    res.json({ message: 'Task marked as completed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUpcoming = async (req, res) => {
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
