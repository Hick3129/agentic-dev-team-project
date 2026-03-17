# Todo App - Backend

Express API with SQLite (Prisma ORM)

## Setup

```bash
npm install
cp .env.example .env   # 修改 DATABASE_URL
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## Endpoints

- `GET    /api/todos`        - list all (query: ?completed=true)
- `GET    /api/todos/:id`    - get one
- `POST   /api/todos`        - create (body: {title, description?})
- `PATCH  /api/todos/:id`    - update
- `DELETE /api/todos/:id`    - delete
- `GET    /health`           - health check

## Notes

- Port: 3000
- CORS enabled for all origins (dev)
- Rate limit: 60 req/min
- SQLite database stored in `prisma/dev.db`