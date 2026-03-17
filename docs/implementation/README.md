# Todo App - Implementation Docs

## 專案結構

```
agentic-dev-team-project/
├── frontend/          # React + Vite + TS + Tailwind
│   ├── src/
│   │   ├── pages/
│   │   │   └── TodoList.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── todoApi.ts
│   │   ├── stores/
│   │   │   └── todoStore.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── backend/           # Node + Express + Prisma + SQLite
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   └── todos.ts
│   │   └── middleware/
│   │       └── errorMiddleware.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── .env.example
├── docs/
│   ├── requirements/
│   ├── architecture/
│   └── implementation/ (here)
└── ...
```

---

## 快速開始

### 後端

```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

伺服器跑在 `http://localhost:3000`

### 前端

```bash
cd frontend
npm install
npm run dev
```

開發伺服器跑在 `http://localhost:5173`，API 代理到 `/api`。

---

## API Endpoints

- `GET    /api/todos`
- `GET    /api/todos/:id`
- `POST   /api/todos`
- `PATCH  /api/todos/:id`
- `DELETE /api/todos/:id`
- `GET    /health`

詳見 `../architecture/api-specs.md`

---

## 狀態管理 (前端)

- Zustand store (`src/stores/todoStore.ts`)
- 包含 CRUD methods 和 localStorage 同步
- 使用 axios 與後端通訊

---

## 錯誤處理

- 後端：統一 error middleware，回傳 `{ success: false, error: "...", message: "..." }`
- 前端：axios interceptor + UI alert

---

## 待辦 (TODO)

- [ ] 單元測試 (Jest + React Testing Library)
- [ ] E2E 測試 (Cypress)
- [ ] 部署指南
- [ ] 效能優化

---