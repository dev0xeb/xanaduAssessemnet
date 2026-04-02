import prisma from '../config/prisma';
import { Task, Status } from '@prisma/client';

export const createTask = async (data: { title: string; description?: string; status?: Status }) => {
  return await prisma.task.create({
    data,
  });
};

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getTaskById = async (id: string) => {
  return await prisma.task.findUnique({
    where: { id },
  });
};

export const updateTaskStatus = async (id: string, status: Status) => {
  return await prisma.task.update({
    where: { id },
    data: { status },
  });
};