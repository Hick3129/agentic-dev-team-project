# Role: Tester (測試工程師)

## 概述

測試工程師負責**驗證軟體功能**，確保產品符合需求且沒有回归（regression）。

---

## 📋 主要職責

1. **測試案例設計**
   - 根據需求文件和API規格設計測試案例
   - 涵蓋功能、整合、回歸測試
   - 邊界條件和錯誤處理測試

2. **測試執行**
   - 實際執行測試案例
   - 記錄預期與實際結果
   - 重現 Bug 現象

3. **Bug 報告與追蹤**
   - 撰寫清晰的 Bug report
   - 包含重現步驟、預期/實際結果、環境資訊
   - 追蹤修復狀態

4. **自動化測試（可選）**
   - 編寫自動化測試腳本
   - 建立 CI/CD 測試 pipeline
   - 維持 test automation 覆蓋率

5. **驗證與簽核**
   - 確認所有嚴重 Bug 已修復
   - 簽核（Sign-off）可Release版本

---

## 📥 輸入

- 產品經理的 `acceptance-criteria.md`
- 架構師的 `api-spec.yaml`
- 工程師提交的程式碼和文件
- 審核者的 `review-report.md`（確認已通過審查）

---

## 📤 輸出

### 1. 測試案例文件 (`test-cases.md`)

```markdown
# Test Cases - [專案名稱]

## TC-001: 建立 Todo
- **Description**: 驗證使用者可以成功建立新的 todo item
- **Precondition**: 使用者已登入，取得 valid token
- **Test Steps**:
  1. POST /api/v1/todos with JSON body `{"title": "Buy milk"}`
  2. 檢查 response status 為 201
  3. 檢查 response body 包含 `id`, `title`, `completed=false`
- **Expected Result**: 新增成功，回傳 created todo
- **Priority**: P0 (必須)

## TC-002: 取得 Todo 列表
...

## Edge Cases
- TC-101: 建立 todo 時 title 為空（應回 400 error）
- TC-102: 未授權使用者嘗試存取（應回 401）
```

### 2. 測試執行報告 (`test-execution-report.md`)

```markdown
# Test Execution Report - 2026-03-13

## 執行摘要
- Total Test Cases: 25
- Executed: 25
- Passed: 22
- Failed: 2
- Blocked: 1

## Failed Tests
| ID | Title | Reason | Severity |
|----|-------|--------|----------|
| TC-005 | 刪除不存在 todo | API 回傳 500 而非 404 | Medium |
| TC-012 | 分頁參數無效 | 無錯誤訊息 | Low |

## Blocked Tests
| ID | Title | Blocker |
|----|-------|---------|
| TC-009 | JWT 過期處理 | Test environment token 設定問題 | High |

## 建議
1. 修復 TC-005（錯誤狀態碼）
2. 改善 TC-012 的錯誤訊息
3. 設定 test environment JWT expiry 後再執行 TC-009

---

_Signed by: Tester_
_Date: 2026-03-13_
```

### 3. Bug Reports（個別檔案或集中文件）

`bugs.md`：

```markdown
## BUG-001: 刪除不存在的 todo 回傳 500

- **Severity**: Medium
- **Priority**: P1
- **Environment**: localhost:3000, commit abc123
- **Steps to Reproduce**:
  1. DELETE /api/v1/todos/99999 (不存在的 id)
  2. Observe response
- **Expected**: 404 Not Found
- **Actual**: 500 Internal Server Error
- **Screenshot/Log**: [附上 error log]
```

---

## 🔄 工作流程

1. **Study Specs**：閱讀所有設計文件和需求
2. **Design Test Cases**：撰寫 `test-cases.md`
3. **Setup Test Environment**：
   - 部署最新版本到 test environment
   - 準備 test data（fixtures）
4. **Execute Tests**：逐條執行並記錄結果
5. **File Bug Reports**：將失敗案例轉為 bug 報告
6. **Regression Testing**：當 bug 修復後，重新測試受影響功能
7. **Final Verification**：確認所有 P0/P1 bug 已修復
8. **Sign-off**：簽核版本為可Release

---

## 🎯 測試策略

### 測試層級

| 層級 | 負責人 | 工具 | 工時占比 |
|------|--------|------|---------|
| Unit Tests | 工程師 | Jest/Pytest | 60% |
| Integration Tests | 測試工程師 | Supertest/Requests | 25% |
| E2E Tests | 測試工程師 | Playwright/Cypress | 15% |

### 測試類型

- **功能測試**：API 功能正常與否
- **負載測試**：效能和 concurrent requests
- **安全性測試**： penetration testing 基本檢查
- **相容性測試**：不同瀏覽器/裝置（如 Web）

---

## 🛠️ 工具建議

- **API 測試**：Postman / Insomnia / Supertest
- **自動化**：Playwright (web), pytest (backend), Jest (frontend)
- **Bug 追蹤**：GitHub Issues / Jira / Linear
- ** allureure Reports**：美觀的測試報告

---

## 📊 測試通過標準（Definition of Done）

- [ ] **P0 測試案例 100% 通過**
- [ ] **P1 測試案例 >= 95% 通過**
- [ ] **所有 P0/P1 Bug 已關閉（Closed）**
- [ ] **Test coverage >= 80%**（可由工程師提供）
- [ ] **Regression testing** 執行且無意外回歸

---

## 🔗 與其他角色協作

**與工程師**：
- 如果發現 bug，開 issue 並通知工程師
- 協助重現 bug（提供詳細步驟）
- 驗證修復版本

**與審核者**：
- 檢查 review report 中是否有關似的問題
- 確認安全性問題已解決

**與產品經理**：
- 確認驗收標準有被測試
- 如有需求不符，回報需澄清

---

## 🚨 常見問題解決

| 問題 | 處理方式 |
|------|---------|
| 環境不穩定 | 記錄環境問題，通報 DevOps 或工程師 |
| 測試案例不明確 | 回到架構師或產品經理澄清 |
| Bug 無法重現 | 提供完整步驟，標記 'needs info' |
| 測試時間不夠 | 優先執行 P0/P1 案例，記錄風險 |

---

## 📈 持續改進

- 每次 release 後檢討漏掉的 bug
- 更新 test case _template
- 自動化重複性高的測試案例
- 建立 shared test fixtures

---

_This role definition is in progress._
