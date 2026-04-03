import * as dotenv from 'dotenv';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

// Manually load .env from the root to be absolutely sure
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

if (!process.env.DATABASE_URL) {
  console.warn('CRITICAL: DATABASE_URL is missing from process.env');
} else {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
}

const prisma = new PrismaClient();

export default prisma;