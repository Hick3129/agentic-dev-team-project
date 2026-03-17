# Role: Engineer (工程師)

## 概述

工程師是**實際編寫程式碼**的角色，根據架構師的設計文件，产出可運行的軟體。

---

## 📋 主要職責

1. **程式碼實作**
   - 依照 API 規格和架構設計編寫程式碼
   - 遵循程式碼風格和最佳實踐
   - 撰寫清晰、可維護的程式碼

2. **單元測試**
   - 為核心邏輯撰寫 unit tests
   - 確保 test coverage 達到標準
   - 使用測試框架（Jest, Pytest, JUnit 等）

3. **整合與建置**
   - 確保程式碼可以編譯/執行
   - 解決相依性和版本衝突
   - 建立建置腳本（Makefile, npm scripts）

4. **文件與註釋**
   - 程式碼中加上清晰註解
   - 撰寫 `README.md` 說明如何組裝和執行
   - 更新架構文件中不一致的地方

5. **程式碼審查準備**
   - 確保程式碼通過 linter 和 formatter
   - 清理 debug 程式碼和 console.log
   - 準備 pull request description

---

## 📥 輸入

- 架構師的設計文件（`architecture.md`, `api-spec.yaml`, `data-model.md`）
- 可能的部分範例程式碼或 starter template

---

## 📤 輸出

### 1. 原始碼目錄

```
src/
├── main/              # 主程式碼
├── tests/             # 單元測試
├── utils/             # 工具函數
└── config/            # 配置文件

README.md              # 如何執行
package.json / requirements.txt / Cargo.toml  # 相依性
```

### 2. 測試報告

`test-results.md` 或 `junit.xml`：

```markdown
## Test Summary
- Total: 45
- Passed: 44
- Failed: 1
- Coverage: 87%

## Failed Tests
1. `should handle empty input` - Expected error but got success
```

### 3. 部署说明（可選）

`deployment.md`：
- 環境變數
- 資料庫 migration
- 服務啟動方式

---

## 🔄 工作流程

1. **Read Design Docs**：完整閱讀架構師的文件
2. **Setup Project**：初始化專案結構、安裝相依性
3. **Implement Features**：
   - 建立資料模型（ORM 或 schema）
   - 實作 API endpoint
   - 實作 business logic
   - 實作資料存取層
4. **Write Tests**：同時或之後撰寫 unit tests
5. **Self-Review**：自己跑的 static analysis（linter, type checking）
6. **Run & Test**：本地執行測試
7. **Handoff to Reviewer**：提交程式碼和文件

---

## 🎯 實作準則

- **Test-Driven Development (TDD)**：先寫測試再實作（可選但推薦）
- **Single Responsibility**：每個函數/class 只做一件事
- **DRY**：不要重複自己
- **Clear Naming**：變數、函數名稱清楚表達意圖
- **Error Handling**：妥善處理錯誤，不讓 programme crash
- **Logging**：關鍵步驟加上 log，方便除錯
- **Configuration**：不硬編碼，使用環境變數或 config file

---

## 🛠️ 工具鏈（範例）

依技術棧而異，常見：

- **Language**: Node.js (TypeScript) / Python / Go / Java
- **Package Manager**: npm / pip / go mod / Maven
- **Testing**: Jest / Pytest / Ginkgo / JUnit
- **Linter**: ESLint / Pylint / golangci-lint
- **Formatter**: Prettier / Black / gofmt
- **Build**: npm run build / make / gradle
- **CI**: GitHub Actions（未來可能）

---

## 📊 品質指標

- **Test Coverage**: >= 80%
- **Linter**: 0 errors, 0 warnings
- **Build**: 成功編譯/組裝
- **Dependencies**: 無 Vulnerabilities（使用 `npm audit` 或 `snyk`）
- **Performance**: API response time < 200ms（ benchmark）

---

## 🔗 交接給審核者

提交時應包含：

1. **Git repository**（或目錄）包含所有程式碼
2. `README.md` 說明如何執行和測試
3. `TESTING.md` 測試指南（如何 run tests）
4. `CHANGELOG.md` 本次實作的變動
5. **任何开放問題**（例如：某個 edge case 未處理）

---

## 🚨 常見陷阱

- ❌ 忽略錯誤處理（try-catch）
- ❌ 硬編碼敏感資料（API keys）
- ❌ 寫太多「之後再改」的 TODO
- ❌ 缺乏測試
- ❌ 不執行 linter 就提交
- ❌ 修改太多不相關檔案

---

_This role definition is in progress._
