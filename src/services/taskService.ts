import { Status } from '@prisma/client';
import * as taskRepository from '../repositories/taskRepository';
import { emitTaskCreated, emitTaskUpdated } from '../sockets/socket';
import redisClient from '../config/redis';

const TASKS_CACHE_KEY = 'tasks:all';

export class TaskService {
  async createTask(data: { title: string; description?: string; status?: Status }) {
    const task = await taskRepository.createTask(data);
    await redisClient.del(TASKS_CACHE_KEY);
    await emitTaskCreated(task);
    return task;
  }

  async getAllTasks() {
    const cachedTasks = await redisClient.get(TASKS_CACHE_KEY);
    if (cachedTasks) {
      // Serving from cache for speed
      return JSON.parse(cachedTasks);
    }

    const tasks = await taskRepository.getAllTasks();
    await redisClient.setEx(TASKS_CACHE_KEY, 3600, JSON.stringify(tasks));
    return tasks;
  }

  async updateTaskStatus(id: string, status: Status) {
    const task = await taskRepository.updateTaskStatus(id, status);
    await redisClient.del(TASKS_CACHE_KEY);
    await emitTaskUpdated(task);
    return task;
  }

  async getTaskById(id: string) {
    return await taskRepository.getTaskById(id);
  }
}