import { Router } from 'express';
import { TaskController } from '../controllers/taskController';
import { TaskService } from '../services/taskService';

const router = Router();

export default () => {
  const taskService = new TaskService();
  const taskController = new TaskController(taskService);

  router.post('/', taskController.createTask);
  router.get('/', taskController.getAllTasks);
  router.patch('/:id', taskController.updateTaskStatus);

  return router;
};