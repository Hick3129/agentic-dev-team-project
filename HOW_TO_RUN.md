# 如何運行 Todo App (HOW_TO_RUN)

本指南說明如何在本地開發環境中運行 Agentic Dev Team 專案的 Todo App。

---

## 📦 前置條件

- **Node.js** 20+ (LTS)
- **npm** 10+ 或 **yarn**
- **Git**
- **OpenClaw host** 或類似 Linux/macOS 環境

---

## 🚀 快速開始（預期正常情況）

### 1. 複製專案

```bash
git clone https://github.com/Hick3129/agentic-dev-team-project.git
cd agentic-dev-team-project
```

### 2. 安裝後端相依套件

```bash
cd backend
npm install
cp .env.example .env   # 編輯 .env 若需要
npx prisma generate
npx prisma db push     # 建立 SQLite 資料庫
npm run dev            # 啟動開發伺服器 (http://localhost:3000)
```

### 3. 安裝前端相依套件

```bash
cd ../frontend
npm install
npm run dev            # 啟動 Vite dev server (http://localhost:5173)
```

### 4. 開啟瀏覽器

訪問 http://localhost:5173，即可使用 Todo App。

---

## ⚠️ 已知問題與變通方案

### 問題 1: TypeScript 編譯工具鏈不完整

**徵狀**：
- `npx tsc` 或 `npm run build` 失敗，出現 `TS7016`, `TS5097` 等錯誤
- `npx ts-node src/index.ts` 啟動時找不到 `express` 類型的宣告檔
- `typescript` 似乎未正確安裝到 `node_modules`

**原因**：
- OpenClaw host 環境中的 npm install 可能因某些原因跳過 devDependencies
- 或 TypeScript 版本與 @types 不匹配

**臨時解決 (A) - 跳過型別檢查（快速）**：
```bash
cd backend
npx ts-node --transpile-only src/index.ts
```
使用 `--transpile-only` 會跳過型別檢查，讓伺服器先跑起來。

**臨時解決 (B) - 改用 JavaScript**：
- 將 `backend/src/*.ts`  rename 為 `.js`
- 修改 `package.json` scripts:
  - `"dev": "nodemon src/index.js"`
  - `"build": "echo skip"`
- 移除 `tsconfig.json`（或改用 `{}`）
- 這是最快的 debug 方式，但失去型別安全

**長期解決**：
```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --include=dev
npm install --save-dev typescript@latest @types/node@latest @types/express@latest
npx tsc --noEmit   # 檢查型別是否通過
npm run dev
```

---

### 問題 2: import 副檔名與 ESM/CommonJS 混淆

**徵狀**：`error TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.`

**解決**：
- 保持 `package.json` **不設定** `"type": "module"`（使用 CommonJS）
- `tsconfig.json` 使用 `"module": "commonjs"`
- import 時 **不要加 `.ts` 副檔名**（例如：`import foo from './routes/todos'`）

---

### 問題 3: Prisma 客戶端生成失敗

**徵狀**：`npx prisma generate` 報錯

**解決**：
- 確認 `backend/.env` 有 `DATABASE_URL="file:./dev.db"`
- 先執行 `npx prisma generate --schema=./prisma/schema.prisma`
- 若版本太高，可降級 Prisma：`npm install prisma@5.10.2 @prisma/client@5.10.2`

---

## 🐳 Docker 部署（推薦）

如果本地環境問題多，使用 Docker 是最簡單的方式。

### 後端 Dockerfile (`backend/Dockerfile`)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "src/index.js"]
```

### 前端 Dockerfile (`frontend/Dockerfile`)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    volumes:
      - ./backend/prisma:/app/prisma
      - db-data:/app/prisma/dev.db
    environment:
      - DATABASE_URL=file:/app/prisma/dev.db
      - PORT=3000
      - NODE_ENV=production
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  db-data:
```

啟動：
```bash
docker-compose up --build
```

前端: http://localhost  
後端 API: http://localhost:3000/api

---

## 📂 專案結構

```
agentic-dev-team-project/
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   ├── routes/
│   │   │   └── todos.ts
│   │   └── middleware/
│   │       └── errorMiddleware.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── dev.db (auto-generated)
│   ├── .env (create from .env.example)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── pages/TodoList.tsx
│   │   ├── stores/todoStore.ts
│   │   ├── services/
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── docs/...
```

---

## 🧪 測試

### 後端 API 手動測試

```bash
# Health
curl http://localhost:3000/health

# List todos (expect [])
curl http://localhost:3000/api/todos

# Create todo
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"買牛奶"}'

# Get one
curl http://localhost:3000/api/todos/<id>

# Update
curl -X PATCH http://localhost:3000/api/todos/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete
curl -X DELETE http://localhost:3000/api/todos/<id>
```

### 前端 E2E

未來會加入 Cypress，目前手動測試。

---

## 🐛 除錯技巧

- **後端**: 查看 `backend/prisma/dev.db` (SQLite 檔案) 是否生成
- **前端**: 打開瀏覽器 DevTools → Network 確認 `/api/todos` 是否 200
- **CORS**: 開發階段已允許所有來源，production 需限制
- **資料庫鎖**: 若遇到 `SQLITE_BUSY`，增加 `busy_timeout` 或改用 WAL 模式

---

## 📝 貢獻

本專案採用多代理流程，請勿直接修改 `main`。所有變更請通過 PR。

---

_Last updated: 2026-03-17 by Assistant_