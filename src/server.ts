import 'dotenv/config';
import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app';
import { initSocket } from './sockets/socket';
import taskRoutes from './routes/tasks';
import redisClient, { subscriberClient } from './config/redis';

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

initSocket(io);

app.use('/tasks', taskRoutes());

const PORT = process.env.PORT || 3000;

(async () => {
  await Promise.all([
    redisClient.connect(),
    subscriberClient.connect(),
  ]);
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();