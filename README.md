# Server (Express)

## Install
```bash
cd server
npm install
```

## Run
```bash
npm run start
# or for development with auto-reload:
npm run dev
```

The server exposes REST APIs on:
- GET /api/tasks
- GET /api/tasks/:id
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

Tasks are persisted to `tasks.json` in the server folder (simple file persistence for this demo).
