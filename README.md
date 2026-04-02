# Xanadu Digital - Task Activity System

A scalable backend system for managing tasks with real-time updates, built with Node.js, TypeScript, PostgreSQL, and Redis.

## Features

- **Core API**: Create, list, and update task statuses.
- **Real-Time Updates**: Instant notification to all connected clients when tasks are created or updated using Socket.io and Redis Pub/Sub.
- **Persistent Storage**: PostgreSQL (Prisma) for reliable relational data storage.
- **High-Performance Caching**: Redis integration to cache task lists and improve response times.
- **Clean Architecture**: Modular structure separating Controllers, Services, and Repositories for maintainability and scalability.

## Tech Stack

- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **SQL Database**: PostgreSQL (via Prisma ORM)
- **NoSQL Database**: Redis (for Pub/Sub and Caching)
- **WebSocket Library**: Socket.io

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (running locally)
- Redis (running locally on port 6379)

### 1. Installation
```bash
npm install
```

### 2. Database Configuration
1. Create a PostgreSQL database (e.g., `taskdb`).
2. Copy `.env.example` to `.env` (already done) and update the `DATABASE_URL`.
3. Run migrations to set up the schema:
   ```bash
   npx prisma migrate dev
   ```

### 3. Generate Prisma Client
```bash
npm run generate
```

### 4. Running the Application
```bash
# Development mode
npm run dev

# Production build and run
npm run build
npm start
```

## API Endpoints

- **POST `/tasks`**: Create a new task.
  - Body: `{ "title": "...", "description": "..." }`
- **GET `/tasks`**: List all tasks (cached via Redis).
- **PATCH `/tasks/:id`**: Update task status (e.g., `PENDING`, `IN_PROGRESS`, `COMPLETED`).
  - Body: `{ "status": "IN_PROGRESS" }`

## Real-Time Events

Connect to `http://localhost:3000` via Socket.io and listen for:
- `task:created`: Data includes the newly created task object.
- `task:updated`: Data includes the updated task object.

## Design Decisions

- **Clean Architecture**: Separating the business logic (Services) from data access (Repositories) and transport (Controllers) ensures the system is testable and easy to extend.
- **Redis for Pub/Sub**: By using Redis Pub/Sub for WebSockets, the system can scale horizontally across multiple application instances without losing real-time event consistency.
- **Redis Caching**: Caching the task list significantly reduces database load for frequent read operations, especially as the system scales.
- **Prisma ORM**: Chosen for its type safety and developer productivity.
- **Custom Validation**: Implemented lightweight manual validation to minimize external dependencies while ensuring data integrity.

## Trade-offs

- **Manual Testing vs. Automated**: Focused on a TDD-informed design and manual integration verification to prioritize core logic delivery.
- **Simple Auth**: Skipped authentication to focus purely on the "Task Activity System" requirements provided.
- **In-Memory Cache vs. External**: Used Redis over simple in-memory caching to demonstrate production-ready scalability.

## Manual Verification Results

- Verified real-time updates via Socket.io by observing events on multiple client connections.
- Verified Redis cache invalidation on task creation and status updates.
- Verified database relational integrity and error handling for invalid status transitions.