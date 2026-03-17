# 系統架構 (Architecture)

## 高層次架構圖

```mermaid
graph TB
    User[使用者] -->|https| Frontend[Frontend (React + Vite)]
    Frontend -->|REST API| Backend[Backend (Node + Express)]
    Backend -->|SQL| DB[(SQLite Database)]
    Frontend -->|localStorage| LS[LocalStorage]

    subgraph "部署環境"
        FrontendDeploy[Vercel / Netlify]
        BackendDeploy[Railway / Render]
    end

    Frontend -->|CDN| FrontendDeploy
    Backend -->|容器/服务| BackendDeploy
```

---

## 組件說明

### 1. 前端 (Client)

- **UI Layer**: React components + Tailwind CSS
- **State Management**: Zustand store (`useTodoStore`)
- **Data Fetching**: Axios (REST API) + localStorage cache
- **Routing**: React Router v6 (單頁應用)
- **Validation**: React Hook Form + Zod

### 2. 後端 (Server)

- **Express App**: RESTful API (`/api/todos`)
- **Database Layer**: Prisma ORM → SQLite
- **Middleware**: CORS, helmet, rate limiting, body parsing
- **Error Handling**: 自定義 Error middleware，统一回傳格式

### 3. 資料庫

- **Table**: `todos`
  - `id` (UUID or auto-increment)
  - `title` (VARCHAR(100))
  - `description` (TEXT nullable)
  - `completed` (BOOLEAN default false)
  - `created_at` (DATETIME)
  - `updated_at` (DATETIME)

### 4. 資料流

1. **載入待辦清單**  
   - 前端 mount → 從 localStorage 讀取（如果有）  
   - 發送 GET `/api/todos` → 後端回傳 JSON  
   - 合併兩邊資料（後端為真-source）  
   - 更新 Zustand store → UI re-render

2. **新增待辦**  
   - 使用者輸入 → 表單提交  
   - POST `/api/todos` 送出發送  
   - 後端寫入 DB → 回傳 created todo  
   - 前端更新 store 並寫入 localStorage

3. **編輯/刪除/切換狀態**  
   - 類似流程：PATCH/DELETE `/api/todos/:id`  
   - _store 更新 + localStorage 同步

4. **篩選**  
   - 前端 store 內過濾（根據 completed 狀態）  
   - 不影響後端

---

## 安全性考量

- CORS: 只允許特定前端網域（開發時 `*`）
- Helmet: 設定安全 HTTP headers
- Rate Limiting: 防止暴力攻擊
- Input Validation: 後端再次驗證資料長度、類型
- NoSQL Injection: 不適用於 SQLite，但 Prisma 會 parameterize queries

---

## 效能優化

- 前端：React.memo, useCallback, 虛擬列表（若大量資料）
- 後端：index on `completed`, `created_at` 欄位
- 快取：ETag / If-None-Match（未來可擴展）

---

## 錯誤處理

- 前端：Axios interceptor 處理 4xx/5xx，顯示使用者友好訊息
- 後端：Central error middleware，log stack trace (production 只记录 error id)

---

## 擴展性

- 目前單一伺服器，若需擴展：  
  - 資料庫改成 PostgreSQL + 連接池  
  - 後端 multiple instances + load balancer  
  - session 改用 Redis (如果未來加登入)

---

## 附錄：API 合約 (概要)

详见 `api-specs.md`。
