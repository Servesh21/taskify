const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks);
router.post('/', taskController.addTask);
router.put('/:id/done', taskController.markAsDone);
router.get('/upcoming/:range', taskController.getUpcoming);

module.exports = router;
