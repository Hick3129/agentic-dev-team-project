# Project: Agentic Development Team

## 概述

建立一個多代理系統（Multi-Agent System），模擬軟體開發團隊的完整生命周期。每個代理扮演特定角色，透過預定義的流程和溝通協議協作，完成從需求分析到測試上線的整個開發過程。

---

## 🎭 角色定義

### 1. 產品經理 (Product Manager)
**職責**：
- 收集和分析使用者需求
- 撰寫產品需求文件（PRD）
- 定義使用者故事和驗收標準
- 優先級排序

**輸入**：使用者提供的需求想法
**輸出**：結構化的需求文件、使用者故事、功能清單

---

### 2. 架構師 (Architect)
**職責**：
- 根據需求設計系統架構
- 技術選型（語言、框架、資料庫）
- 定義 API 合約和資料模型
- 撰寫架構設計文件

**輸入**：產品經理的需求文件
**輸出**：系統架構圖、技術決定、API 規格、資料庫 schema

---

### 3. 工程師 (Engineer)
**職責**：
- 根據規格編寫程式碼
- 實作 API、業務邏輯、UI
- 撰寫單元測試
- 遵循程式碼風格規範

**輸入**：架構師的設計文件
**輸出**：原始碼、單元測試、建置腳本

---

### 4. 審核者 (Reviewer)
**職責**：
- 審查程式碼品質
- 檢查是否符合設計規格
- 確保安全性、效能、可維護性
- 提出改進建議

**輸入**：工程師的程式碼
**輸出**：審查報告、修復建議、merge approval/rejection

---

### 5. 測試工程師 (Tester)
**職責**：
- 設計整合測試和端到端測試
- 執行測試案例
- 回報 Bug
- 验证功能完整性

**輸入**：工程師的程式碼、架構師的 API 規格
**輸出**：測試報告、Bug 列表、驗證結果

---

## 🔄 工作流程（草案）

```
[使用者需求]
     ↓
[產品经理] → 產出：PRD, User Stories
     ↓
[架構師]   → 產出：Architecture Design, API Spec
     ↓
[工程師]   → 產出：Code, Unit Tests
     ↓
[審核者]   → 產出：Review Feedback (迴圈：修改 → 再審查)
     ↓
[測試工程師]→ 產出：Test Report, Bug List
     ↓
[工程師]   → 修復 Bug
     ↓
...
     ↓
[完成] → 可部署版本
```

---

## 📋 交接協議（Handoff Protocol）

每個角色完成工作後，必須提供：

1. **明確的输出文件**（markdown、json、程式碼檔案）
2. **假設和限制**（Assumptions & Constraints）
3. **開放問題**（Open Questions）給下一個角色
4. **驗收標準**（Acceptance Criteria）供後續驗證

---

## 🗂️ 檔案格式規範

- **需求文件**：Markdown，包含背景、目標、使用者故事、驗收標準
- **設計文件**：Markdown + 圖表（mermaid 或 drawing）
- **API 規格**：OpenAPI 3.0 (YAML) 或 Markdown
- **程式碼**：依專案而定（目前未定）
- **測試報告**：Markdown + JSON 測試結果
- **審查意見**：Markdown，包含：✅ 通過 / ❌ 未通過，詳細評論

---

## 🛠️ 工具與平台

- **協作平台**：OpenClaw (sub-agents 或 workflow)
- **版本控制**：Git (如果實作)
- **通訊協議**：檔案傳遞 + 文字報告（初期）
- **未來可能**：Web UI、Database、CI/CD

---

## 📅 開發階段

### Phase 1: 基礎設計（當前）
- [x] 建立專案目錄
- [ ] 定義各角色詳細規格（THIS FILE)
- [ ] 設計整體工作流程
- [ ] 建立交接協議草案

### Phase 2: 通訊機制
- [ ] 設計代理間訊息格式
- [ ] 選擇/設計 orchestration 方式
- [ ] 建立狀態管理

### Phase 3: 實作與測試
- [ ] 用 OpenClaw sub-agents 模擬角色
- [ ] 執行簡單案例（如：建立 Todo App）
- [ ] 記錄問題並優化流程

### Phase 4: 優化與擴展
- [ ] 加入更多角色（如：DevOps、Scrum Master）
- [ ] 支援平行工作
- [ ] 建立 reusable templates

---

## 🤔 開放問題

1. **每個角色應該使用單一代理還是多個代理？**
2. **溝通頻率和方式是怎樣的？**（同步 vs 非同步）
3. **如何處理衝突和回退？**（當審核者拒絕時）
4. **是否要保留完整的工作產出歷史？**
5. **是否需要「專案經理」角色協調整個流程？**

---

## 📚 參考資料

- [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation](https://arxiv.org/abs/2308.08155)
- [CrewAI: Orchestrating role-playing AI agents](https://github.com/joaomdmoura/crewai)
- [ChatDev: Virtual Chat Session for Software Development](https://github.com/OpenBMB/ChatDev)

---

## 📝 討論記錄

所有討論記錄放在 `discussions/` 目錄，以日期命名。

---

**狀態**：討論階段，歡迎Contributions！
