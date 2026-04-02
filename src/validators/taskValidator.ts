import { Status } from '@prisma/client';

export const validateCreateTask = (data: any) => {
  if (!data.title || typeof data.title !== 'string') {
    throw new Error('Title is required and must be a string');
  }
  if (data.description && typeof data.description !== 'string') {
    throw new Error('Description must be a string');
  }
  if (data.status && !Object.values(Status).includes(data.status)) {
    throw new Error('Invalid status');
  }
};

export const validateUpdateTask = (data: any) => {
  if (!data.status || !Object.values(Status).includes(data.status)) {
    throw new Error('Valid status is required');
  }
};