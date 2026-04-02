import { Request, Response } from 'express';
import { TaskService } from '../services/taskService';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator';
import { Status } from '@prisma/client';

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  createTask = async (req: Request, res: Response) => {
    try {
      validateCreateTask(req.body);
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAllTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  updateTaskStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      validateUpdateTask(req.body);
      const task = await this.taskService.updateTaskStatus(id as string, req.body.status);
      res.json(task);
    } catch (error: any) {
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  };
}