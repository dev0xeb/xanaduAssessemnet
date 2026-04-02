import { Server } from 'socket.io';
import redisClient, { subscriberClient } from '../config/redis';

export const initSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // Use Redis for real-time task events
  subscriberClient.subscribe('task:created', (message) => {
    const task = JSON.parse(message);
    io.emit('task:created', task);
  });

  subscriberClient.subscribe('task:updated', (message) => {
    const task = JSON.parse(message);
    io.emit('task:updated', task);
  });
};

export const emitTaskCreated = async (task: any) => {
  await redisClient.publish('task:created', JSON.stringify(task));
};

export const emitTaskUpdated = async (task: any) => {
  await redisClient.publish('task:updated', JSON.stringify(task));
};