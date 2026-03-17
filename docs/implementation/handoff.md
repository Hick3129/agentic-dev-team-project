# Agentic Dev Team - Engineer Handoff

## 📦 交付內容

- [x] `docs/implementation/` (empty – no handoff from Architect? 早安這裡是 Engineer)
- [x] `frontend/` scaffold (Vite + React + TS + Tailwind + Zustand)
- [x] `backend/` scaffold (Express + Prisma + SQLite)
- [x] API endpoints 根據 `docs/architecture/api-specs.md` 實作
- [x] 前端頁面與狀態管理整合
- [ ] 測試 (unit + integration)

## ✅ 已完成工作

- 建立 frontend 與 backend 目錄結構
- 產生所有 config 檔案 (tsconfig, vite, tailwind, package.json)
- 實作最小可行后端 API (CRUD)
- 實作前端 TodoList 頁面（包含新增、編輯、刪除、切換狀態、篩選）
- 使用 Zustand 管理狀態，axios 通訊
- 加入基本錯誤處理和載入狀態

## 🔑 關鍵決策

- **前後端分離目錄**：`frontend/` 和 `backend/` 獨立
- **TypeScript**：前後端皆使用，提升型別安全
- **SQLite + Prisma**：便於開發與部署
- **Vite 開發伺服器代理**：`/api` → `http://localhost:3000`
- **UI**：Tailwind 快速原型，無需額外组件库

## 🧩 開放問題

1. **測試覆蓋率**：尚未加入單元測試和整合測試（急）
2. **部署細節**：
   - 是否需要 Dockerfile？
   - 是否要 GitHub Actions CI 自動測試？
3. **錯誤處理統一性**：目前前後端錯誤格式不一
4. ** optimistic UI**：目前 API 成功後才更新 store，若需樂觀更新可後加

## ⚠️ 注意事項與風險

- SQLite 資料庫檔案在 `backend/prisma/dev.db`，別刪除
- 確保 backend 啟動後再開 frontend dev server
- 環境變數：backend 需要 `DATABASE_URL`，frontend 需要 `VITE_API_BASE_URL`
- 前端依賴 axios，後端依賴 prisma，第一次 `npm install` 會需要联网

## 📚 參考資料連結

- Architecture: `docs/architecture/*.md`
- API Spec: `docs/architecture/api-specs.md`
- PRD: `docs/requirements/*.md`

---

**下一階段**：測試 (Reviewer) → 開始執行測試案例