# AI Usage Report

Building this Task Activity System was a mix of automated help and manual heavy lifting. Here's how I used AI to get it across the finish line.

## Where AI stepped in
- **The Blueprint**: Used AI to quickly draft the Clean Architecture structure. It saved me a lot of time on folder organization and basic class templates.
- **The Tech Stack**: Got some solid advice on using Redis for Pub/Sub. It's a great way to keep the WebSockets scalable without overcomplicating things.
- **Bootstrapping**: Had the AI generate the boilerplate for the Express routes and the Prisma schema. It's much faster than typing it all out by hand.
- **Design Patterns**: Used AI to implement the Proxy-based lazy loading for the database and redis clients. It's a nice touch that prevents connection errors if the services aren't perfectly synced at startup.

## What it really helped with
- **Saving Time**: It handles the repetitive "boring" stuff (boilerplate, types) so I could focus on the logic.
- **Debugging**: When Prisma gave me some weird client generation errors, the AI helped me figure out it was a provider issue in the schema.
- **Inspiration**: It suggested the TDD approach early on, which helped me define the API boundaries even though I eventually streamlined the final build for delivery.

## Where I took over
- **Logic Refinement**: The AI's first pass at the service layer was a bit too generic. I manually refined the Redis caching and invalidation to make sure it actually stays in sync with the DB.
- **System Polishing**: Manually adjusted the socket emissions to make sure they're only firing when they should. 
- **The Final Polish**: Cleaned up the comments and removed any fluff to keep the codebase looking professional.