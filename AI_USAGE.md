# AI Usage Report

This project was built with selective use of AI to accelerate development while maintaining full control over design and implementation decisions.

## How AI was used

- **Project scaffolding**: Used AI to quickly generate an initial folder structure and basic boilerplate (controllers, services, and routes).
- **Technology validation**: Explored options for the real-time layer and confirmed Redis pub/sub as a suitable approach for decoupled event broadcasting.
- **Boilerplate generation**: Assisted in generating repetitive setup code such as Express route handlers and Prisma schema definitions.
- **Debugging assistance**: Used AI to troubleshoot issues during Prisma client generation and configuration.

## What AI helped with

- Reduced time spent on repetitive setup and boilerplate
- Provided quick references for integrating Redis pub/sub with WebSockets
- Helped validate implementation approaches during development

## What I handled manually

- **Architecture decisions**: Defined the overall system design, including the use of PostgreSQL as the source of truth and Redis for event-driven communication.
- **Service layer logic**: Refined business logic to ensure correct interaction between the database and real-time layer.
- **Event flow design**: Ensured task creation and updates trigger the appropriate Redis events and WebSocket broadcasts.
- **Code review and simplification**: Reviewed all generated code, removed unnecessary complexity, and aligned implementation with the project scope.

## Summary

AI was used as a productivity tool to accelerate development, particularly for boilerplate and debugging. All core decisions, system design, and final implementation details were reviewed and controlled manually to ensure correctness and alignment with the assessment requirements.