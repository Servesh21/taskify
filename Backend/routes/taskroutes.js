import express from 'express';
import { getTasks, addTask, markAsDone, getUpcoming,markAsunDone } from '../controllers/taskControllers.js';
const router = express.Router();
router.get('/', getTasks);
router.post('/', addTask);
router.put('/:id/done', markAsDone);
router.get('/:id/undone', markAsunDone);
router.get('/upcoming/:range', getUpcoming);

export default router;
