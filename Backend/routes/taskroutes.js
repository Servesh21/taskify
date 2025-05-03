import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getTasks, addTask, markAsDone, markAsunDone, getUpcoming, deleteTask
} from '../controllers/taskControllers.js';

const router = express.Router();


router.get('/',authenticate, getTasks);
router.post('/',authenticate, addTask);
router.patch('/:id/done',authenticate, markAsDone);
router.patch('/:id/undone',authenticate, markAsunDone);
router.get('/upcoming/:range',authenticate, getUpcoming);
router.delete('/:id',authenticate, deleteTask);

export default router;
