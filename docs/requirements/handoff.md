# Handoff: Product Manager → Architect

Date: 2026-03-17 (Asia/Taipei)
From: Product Manager
To: Architect

---

## 📦 交付內容 (Deliverables)

- [x] `docs/requirements/product-requirements.md`
- [x] `docs/requirements/user-stories.md`
- [x] `docs/requirements/acceptance-criteria.md`

---

## ✅ 已完成工作

- 定義 Todo App 為 MVP 測試案例
- 撰寫 PRD（功能範圍、使用者、核心功能、非功能性需求）
- 完成 6 個使用者故事（US-01 ~ US-06）
- 撰寫 8 個驗收標準（AC-01 ~ AC-08），包含具体情境與預期結果

---

## 🔑 關鍵決策 (Key Decisions)

1. **MVP 範圍很小，只有基本的 CRUD + 篩選**
   - 不包含多使用者、登入、分類、附件等進階功能
   - 這些留到 Phase 2 再看需求

2. **資料持久化：先以 LocalStorage 為目標**
   - 如果工程師決定用後端（Node/SQLite），需確保 schema 簡單
   - 交付時需提供 DB schema 設計文件

3. **無需登入機制**
   - 單人使用，不涉及身份驗證
   - 簡化了安全設計

4. **優先順序**
   - 核心功能優先：新增、編輯、刪除、狀態切換
   - 其次是篩選功能
   - UI/UX 以實用為主，美觀其次

---

## 🧩 開放問題 (Open Questions)

1. **技術選型**
   - 要用純前端（HTML/CSS/JS）還是前後端分離（React + API）？
   - 如果後端，要用哪種語言/框架？（Node.js？Python FastAPI？Go？）

2. **資料結構**
   - Todo item 的 schema 應該包含哪些欄位？（id, title, description, completed, createdAt, updatedAt？）
   - 是否需要 UUID 還是可用时间戳+随机数？

3. **API 設計**
   - 如果有後端，RESTful API endpoint 應該如何設計？
   - 是否需要 GraphQL？

4. **測試策略**
   - 單元測試和整合測試要用哪個框架？
   - 是否需要 End-to-End 測試（例如 Playwright）？

5. **部署**
   - 要支援静态托管（如 GitHub Pages）還是需要伺服器？
   - 如果後端，要容器化嗎？（Docker）

---

## ⚠️ 注意事項與風險 (Notes & Risks)

- **時間壓力**：MVP 應快速完成，不要过度設計
- **技術債**：如果選擇純前端，未來要加後端會需要重構
- **資料一致性**：LocalStorage 只在單一裝置有效，換瀏覽器就沒了
- **效能**：資料量大時（>1000 筆）篩選可能會卡，需要 optimization
- **安全性**：無登入，但如果有後端 API，要防止 injections（SQL/XSS）

---

## 📚 參考資料連結 (References)

- 主文件: `./product-requirements.md`
- 使用者故事: `./user-stories.md`
- 驗收標準: `./acceptance-criteria.md`

---

**請確認收到此 handoff，如有不清楚的地方請立即提問。**  
預期架構設計在 2-3 天內完成並移交給工程師。