# Handoff: Architect → Engineer

Date: 2026-03-17 (Asia/Taipei)
From: Architect
To: Engineer

---

## 📦 交付內容 (Deliverables)

- [x] `docs/architecture/technology-stack.md`
- [x] `docs/architecture/architecture.md`
- [x] `docs/architecture/database-schema.md`
- [x] `docs/architecture/api-specs.md`
- [x] `docs/architecture/directory-structure.md`
- [x] `docs/architecture/technical-risks.md`
- [x] `docs/architecture/handoff.md` (本文)

---

## ✅ 已完成工作

作為架構師，我已：
- 定義技術棧：React + TypeScript + Vite (前端)、Node.js + Express + SQLite (後端)
- 設計系統架構圖與元件交互流程
- 設計資料庫 schema (Prisma) 與索引
- 撰寫 RESTful API 規格 (CRUD + error handling)
- 說明專案目錄結構與命名慣例
- 辨識技術風險並提出緩解措施

---

## 🔑 關鍵決策 (Key Decisions)

1. **前後端分離**
   - 優點：技術獨立、部署彈性、未來可各自擴展
   - 缺點：需要 CORS 設定、環境管理較複雜

2. **SQLite 作為開發與 MVP 資料庫**
   - 優點：零設定、單一文件、易於備份
   - 缺點：寫入併發有限，未来可遷移至 PostgreSQL

3. **Prisma ORM**
   - 優點：Schema-first、migration 自動生成、type-safe
   - 缺點：多一個依賴，但值得

4. **REST API (非 GraphQL)**
   - MVP 需求簡單，避免過度設計
   - 未來如果需要高效率查詢，可加上 GraphQL gateway

5. **Zustand 狀態管理**
   - 輕量，API 簡潔，適合小型 App
   - 不需要 Redux 的 boilerplate

6. ** deploys**:
   - 前端：Vercel (靜態)
   - 後端：Railway/Render (Node)
   - 資料庫：SQLite file (存於 Railway persistent disk)

---

## 🧩 開放問題 (Open Questions)

1. **後端結構詳細設計**
   - 是否要使用 MVC pattern (controllers, services, models)?
   - router 如何組織？一個檔案還是分功能？

2. **前端專案結構**
   - 是否用 feature-based 資料夾 (e.g., `features/todos/`)?
   - 還是按類型 (components, pages, hooks)？

3. **錯誤處理策略**
   - 後端錯誤是否要記錄到檔案或第三方 (Sentry)?
   - 前端 retry logic 要寫多複雜？

4. **測試策略細粒度**
   - 單元測試：Jest + React Testing Library
   - 整合測試：Supertest (後端), Cypress (前後端)
   - E2E 要 cover 哪些 user journey？

5. **CI/CD 流程**
   - 是否要在 GitHub Actions 中加入自動測試？
   - 測試通過才允許 merge？

6. **環境變數**
   - 後端需要哪些 env var？ (`DATABASE_URL`, `PORT`, `NODE_ENV`)
   - 前端需要 `VITE_API_BASE_URL`

---

## ⚠️ 注意事項與風險 (Notes & Risks)

- **優先級**：
  1. 完成最小可行產品 (MVP)：基本的 CRUD + 篩選
  2. 穩定性和錯誤處理
  3. 測試與自動化
  4. 效能優化 (非必要)

- **時間估計**：
  - 後端 scaffolding (Express + Prisma) : 0.5 天
  - CRUD API 實作 : 1 天
  - 前端 scaffolding (Vite + TS + Tailwind) : 0.5 天
  - 前端 UI + state integration : 1–2 天
  - 測試 : 1 天
  - 部署與除錯 : 0.5 天
  - **總計**: 4–5 天 (單人)

- **風險**：
  - 若 SQLite 鎖檔問題出現，需調整 Prisma datasource 參數
  - 前端狀態同步需 careful testing，避免 race condition
  - 若工程師對 TypeScript/Prisma 不熟，需預留學習時間

- **依賴**：
  - 後端 API 必須先完成至少 `GET /todos`, `POST /todos` 才能前端串接
  - 建議先完成後端最小集，再並行開發

- **程式碼品質**：
  - 使用 ESLint + Prettier
  - 盡量保持函數純粹， Dependency injection 方便測試
  - 檔案不要太長 (單一檔案不超過 300 行)

---

## 📚 參考資料連結 (References)

- 技術棧: `./technology-stack.md`
- 架構圖: `./architecture.md`
- 資料庫: `./database-schema.md`
- API: `./api-specs.md`
- 目錄結構: `./directory-structure.md`
- 風險: `./technical-risks.md`

---

**請工程師開始前確認理解所有文件。如有不清楚，立即提問。**  
預期在 5 天內完成可部署的 MVP，並移交給 Reviewer。