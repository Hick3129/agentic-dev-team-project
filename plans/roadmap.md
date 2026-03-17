# Roadmap - Agentic Development Team

## Phase 0: 基礎建設（✅ 已完成）

- [x] 建立專案目錄結構
- [x] 撰寫 README 和 PROJECT.md
- [x] 定義 5 個基本角色（初步版本）
- [x] 設計工作流程圖
- [x] 建立交接協議草案
- [x] 收集現有框架 research

---

## Phase 1: 角色定義深化（進行中 🟡）

**目標**：讓每個角色定義達到可實際執行的程度

### Tasks:
- [ ] **Product Manager**
  - [ ] 撰寫 PRD 模板（完整範例）
  - [ ] 定義 User Story 格式（Acceptance Criteria 模板）
  - [ ] 練習：用一個簡單需求（如 Todo App）寫 PRD

- [ ] **Architect**
  - [ ] 整理技術選型決策清單（Database, Framework, Hosting）
  - [ ] 建立 ADR（Architecture Decision Record）模板
  - [ ] 練習：為 Todo App 設計架構

- [ ] **Engineer**
  - [ ] 選擇一個技術棧（Node.js + Express / Python + FastAPI）
  - [ ] 建立 starter template repository
  - [ ] 練習：實作一個簡單 API

- [ ] **Reviewer**
  - [ ] 建立 code review checklist（根據語言）
  - [ ] 練習：審查一份範例程式碼

- [ ] **Tester**
  - [ ] 建立 test case template
  - [ ] 練習：為 Todo App 設計 test cases

**預計完成日期**：2026-03-20

---

## Phase 2: 通訊機制實作

**目標**：讓角色之間能自動/半自動地傳遞檔案

### Tasks:
- [ ] 設計 `shared/` 目錄結構規範
- [ ] 編寫腳本自動檢查 `handoff.md` 是否存在
- [ ] 建立 `STATUS.md` 自動更新機制（或手動）
- [ ] 在 OpenClaw 中測試 sub-agent 檔案共享
  - [ ] 測試 spawn agent with same workspace
  - [ ] 測試 file read/write isolation
- [ ] 考慮是否用 Git 做版本控制（每個角色 commit）

** translational  reward**：
- 可以真的在 OpenClaw 中「執行」這個工作流
- 不需要人工 copy/paste 檔案

**預計完成日期**：2026-03-27

---

## Phase 3: 第一次端到端測試

**目標**：從需求到測試，完整跑過一次流程

### Scenario:
- 選擇一個**簡單專案**：Todo API（CRUD）
- 5 個角色各司其職
- 使用我們设计的文件和流程
- 記錄每個角色的 output

### Tasks:
- [ ] 準備初始需求（可由我提供）
- [ ] Product Manager 產出 PRD
- [ ] Architect 產出設計文件
- [ ] Engineer 產出程式碼
- [ ] Reviewer 審查並提出改進
- [ ] Engineer 修復
- [ ] Tester 測試並簽核
- [ ] 撰寫 ** retrospective report**：記錄問題和改進點

**成功條件**：
- 最終產出可運行的 Todo API
- 所有 checkpoint 都有文件留存
- 知道流程中哪些地方卡住或需改進

**預計完成日期**：2026-04-10

---

## Phase 4: 優化與 Refinement

**Based on Phase 3 lessons learned**:

- [ ] 調整交接協議（是否太多 file？）
- [ ] 統一文件格式（Maybe 用 JSON/YAML 標準化）
- [ ] 建立 validation 機制（檢查檔案完整性）
- [ ] 設計 timeout 和 retry logic
- [ ] 考慮加入「專案經理」角色協調

---

## Phase 5: 擴展與應用

- [ ] 支援更 complex 專案（部落格系統、電商）
- [ ] 加入 multiple sub-teams 平行工作
- [ ] 建立 reusable templates per project type
- [ ]  bild web UI 查看 workflow status
- [ ] 發佈為 OpenClaw skill 或 standalone tool

---

## 🔮 長期願景

成為一個**可重用的開発代理框架**：
- 可以快速 setup 一個 5 人團隊
- 每個角色可以客製化 prompt 和其他工具
- 支援 human-in-the-loop 審核
- 產出的所有文件都可追溯

---

## 📊 追蹤進度

Use this file as living document. Update as we complete each phase.

---

_Created: 2026-03-13_  
_Last updated: 2026-03-13_
