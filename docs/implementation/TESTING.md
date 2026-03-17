# 測試計畫 (Testing Plan)

## 測試範圍

此專案採用：

| 層次 | 工具 | 目標 |
|------|------|------|
| 單元測試 (Unit) | Jest + RTL (前端), Jest (後端) | 函數、工具、store |
| API 整合測試 | Supertest (後端) | endpoints 正確性 |
| E2E 測試 | Cypress | 完整 user journey |

---

## 單元測試 (前端)

**位置**: `frontend/src/__tests__/`

**示例**:
- `stores/todoStore.test.ts` - Zustand store CRUD
- `services/todoApi.test.ts` - API service
- `pages/TodoList.test.tsx` - 組件渲染與互動

**覆蓋率目標**: 80%+ (statements)

---

## 單元測試 (後端)

**位置**: `backend/src/__tests__/`

**示例**:
- `routes/todos.test.ts` - 各 API endpoints
- `middleware/errorMiddleware.test.ts`

**覆蓋率目標**: 80%+ (後端關鍵邏輯)

---

## 整合測試 (API)

使用 Supertest 測試 Express app：

```typescript
import request from 'supertest';
import app from '../src/index';

describe('GET /api/todos', () => {
  it('should return empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
```

---

## E2E 測試

**工具**: Cypress  
**情境**:

1. **使用者建立待辦**
   - 訪問首页
   - 輸入標題「買牛奶」 → 點擊新增
   - 檢查列表是否出現该项目

2. **編輯與刪除**
   - 點擊編輯，修改標題，儲存
   - 點擊刪除，確認
   - 檢查列表是否正確更新

3. **篩選**
   - 切換到「已完成」、「未完成」、「全部」篩選

**執行**:
```bash
cd frontend
npx cypress open
```

---

## CI 整合

- GitHub Actions 腳本待添加：`.github/workflows/test.yml`
- 事件：`pull_request` 到 `main`
- 步驟：
  - 安裝_node_
  - 後端：`npm ci && npm test`
  - 前端：`cd frontend && npm ci && npm test`
  - 可能还需要 `npm run build`

---

## 手動測試檢查清單

- [ ] 後端可啟動且 `GET /health` 回傳 `{status: "ok"}`
- [ ] 前端可編譯且 dev server 啟動
- [ ] API proxy 設定正確 (VITE_API_BASE_URL 或 vite.config 的 proxy)
- [ ] LocalStorage 同步正常
- [ ] 錯誤處理：後端關閉時，前端顯示錯誤訊息

---

## 已知限制

- SQLite 檔案锁問題：單人使用下無 Issue
- 尚未做負載測試和安全性滲透測試

---

**Next**: 添加具體 test cases 檔案。