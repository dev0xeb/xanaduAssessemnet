import 'dotenv/config';
import { createClient } from 'redis';

export const redisClient = createClient();
export const subscriberClient = createClient();

redisClient.on('error', (err) => console.log('Redis Main Error', err));
subscriberClient.on('error', (err) => console.log('Redis Sub Error', err));

export default redisClient;