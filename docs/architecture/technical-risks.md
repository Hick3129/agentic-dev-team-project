# 技術風險 (Technical Risks)

## 風險矩陣

| 風險 | 可能性 | 影響 | 優先級 | 緩解措施 |
|------|--------|------|--------|----------|
| SQLite 併發寫入問題 | 中 | 中 | 中 | 確認使用 WAL 模式，或後端加 request queue |
| 前後端分離部署 Environment 變數遺失 | 低 | 高 | 中 | 撰寫部署檢查清單，使用 `.env.example` |
| Prisma 學習曲線 | 中 | 低 | 低 | 預留時間閱讀文件，範例程式碼 |
| 前端狀態與後端不同步 | 中 | 中 | 高 | 實作 optimistic update + rollback |
| 未處理大量資料 ( > 1000 筆) | 低 | 中 | 低 | 加入 pagination (未來) |
| 測試覆蓋率不足 | 中 | 中 | 中 | Jest > 80%, E2E 關鍵路徑必测 |
| 安全性漏洞 (XSS, CSRF) | 低 | 高 | 高 | Helmet, 輸入驗證, CSP header |
| 擴展困難 (SQLite → PostgreSQL) | 中 | 中 | 低 | Prisma 本身就支援多種資料庫，遷移容易 |

---

## 詳細說明

### 1. SQLite 併發寫入

**風險**: SQLite 預設不支援多寫入者同時寫，可能發生 `database is locked` 錯誤。  
**緩解**:
- 使用 Prisma 內建的 **WAL (Write-Ahead Logging)** 模式 (`PRAGMA journal_mode=WAL`)
- 後端設定 **Connection Pool** 或 **SQLite busy timeout**
- 若 concurrency 需求高，後續可換 PostgreSQL

---

### 2. 前後端不同步

**風險**: 前端 optimistic update 失敗，導致 UI 狀態與後端不一致。  
**緩解**:
- 所有 API 呼叫失敗時，re-fetch 資料
- 使用 status code 判斷是否需要重試
- 提供手動「重新整理」按鈕

---

### 3. 安全性

**風險**: 未經驗證的使用者輸入導致 XSS 或注入攻擊。  
**緩解**:
- Helmet 設定安全 headers (CSP, HSTS)
- Express middleware 對所有輸入做驗證 (Joi/Zod)
- Prisma parameterized queries 自動防注入
- 不信任前端資料，所有檢查在後端重複一次

---

### 4. 部署複雜度

**Risk**: 前後端分兩處部署，環境變數管理不易。  
**Mitigation**:
- 使用 `dotenv` 統一管理 `.env`，`.env.example` 給其他人
- 在部署腳本中檢查必要變數
-  frontend 需知道後端 API URL → 使用 `VITE_API_BASE_URL`

---

### 5. 效能

**Risk**: 待辦數量過大 (e.g. 5000+) Filtering 變慢。  
**Mitigation**:
- 目前不做前端分頁，但後端可 future-proof 加入 `?limit=50&offset=0`
- 若超過 1000 筆，提示使用者 archiving 舊資料

---

### 6. 第三方服務依賴

**Risk**: 使用 Vercel/Render 可能出現 Downtime。  
**Mitigation**:
- 選擇可靠的 host，或預備备用方案
- 資料庫定期備份 (SQLite file 複製)

---

## 監控與告警 (建議)

- 後端 health endpoint (`GET /health`) 回傳 `{status: "ok"}`
- 使用 UptimeRobot 或類似服務監控
- 錯誤日誌集中收集 (Sentry, LogRocket)

---

_Last updated: 2026-03-17 by Architect_