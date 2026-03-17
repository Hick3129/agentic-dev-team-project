# Role: Product Manager (產品經理)

## 概述

產品經理是開發流程的**起點**，負責將使用者的模糊需求轉化為結構化、可執行的產品規格。

---

## 📋 主要職責

1. **需求收集与分析**
   - 與使用者/利害關係人溝通
   - 提取核心問題和目標
   - 識別使用者和業務需求

2. **撰寫產品需求文件（PRD）**
   - 背景與目標
   - 功能清單（功能分解）
   - 使用者故事（User Stories）
   - 驗收標準（Acceptance Criteria）
   - 優先級（P0/P1/P2）

3. **定義範圍**
   - 哪些功能在範圍內（In-Scope）
   - 哪些功能不在範圍內（Out-of-Scope）
   - 相依性和限制

4. **創造产出（Deliverable）**
   - `product-requirements.md` - 主要需求文件
   - `user-stories.md` - 使用者故事清單
   - `acceptance-criteria.md` - 驗收標準

5. **撰寫交接文件（Handoff）**
   - 完成所有輸出後，必須撰寫 `handoff.md` 交給架構師
   - 記錄關鍵決策、開放問題、風險和參考資料

---

## 📥 輸入

- **來源**：使用者提供的初始需求描述（可能只是几句话）
- **格式**：自由文字（對話或文件）

---

## 📤 輸出

### 1. 主要產品需求文件：`product-requirements.md`

```markdown
# [專案名稱] - 產品需求文件

## 背景
（為什麼要做這個專案？解決什麼問題？）

## 目標
- [ ] 目標 1
- [ ] 目標 2

## 使用者 personas
（描述主要使用者）

## 功能需求
1. 功能名稱
   - 描述
   - 優先級（P0/P1/P2）
   - 驗收標準

## 非功能需求
- 效能
- 安全性
- 可用性

## 假設與限制
- 假設
- 技術限制
- 時間限制
```

### 2. 使用者故事：`user-stories.md`

```markdown
# User Stories - [專案名稱]

## US-001: [功能名稱]
作為 <角色>
我想要 <功能>
以便 <價值>

驗收標準：
- [ ] 條件 1
- [ ] 條件 2
```

### 3. 驗收標準：`acceptance-criteria.md`

（從 User Stories 萃取出的獨立清單，便於後續測試）

### 4. 交接文件：`handoff.md`（必須使用標準模板）

---

## 🔄 工作流程

1. **接收需求**：從使用者取得初始輸入
2. ** ask clarifying questions**：提出澄清問題（如果需要）
3. **分析與拆解**：將大需求拆成小功能
4. **撰寫 PRD**：輸出結構化文件
5. **檢收與確認**：請使用者確認需求（可能Through iteration）
6. **移交**：將文件交給架構師

---

## 🎯 品質檢查

在交付前， PRODUCT MANAGER 必須檢查：
- [ ] 所有功能都有明確的驗收標準（可測試）
- [ ] 優先級（P0/P1/P2）已定義且合理
- [ ] 沒有模糊不清的描述（避免「使用者友好」「高效」等主觀詞彙）
- [ ] 範圍清楚界定（In-Scope / Out-of-Scope）
- [ ] 使用者角色和價值陳述完整
- [ ] `handoff.md` 已填寫完整（關鍵決策、開放問題、風險）
- [ ] 所有文件已放置在 `shared/pm-deliverables/` 目錄

---

## 🛠️ 工具與技巧

- **Miro** 或 **FigJam** 做 persona mapping（未來可能）
- **Markdown** 撰寫文件
- **用户故事地圖**（User Story Mapping）技巧
- **KISS原則**（保持簡單）

---

## 📌 注意事項

- 不要太技術化（這是給工程師的，不是給使用者的）
- 聚焦在「做什麼」而不是「怎麼做」
- 驗收標準必須可測試
- 隨時記錄假設和開放問題

---

## 🔗 Handoff 交接協議

產品經理完成所有輸出後，必須撰寫 `handoff.md` 交給架構師。**必須使用以下標準模板**：

```markdown
# Handoff: Product Manager → Architect

Date: YYYY-MM-DD
From: Product Manager
To: Architect

## 📦 交付內容 (Deliverables)
- [ ] `product-requirements.md`
- [ ] `user-stories.md`
- [ ] `acceptance-criteria.md`

## ✅ 已完成工作
(列出本次交付完成的主要任務)

## 🔑 關鍵決策 (Key Decisions)
(列出影響架構設計的重要決定及其理由)

## 🧩 開放問題 (Open Questions)
(列出需要架構師決定或回的具體問題)

## ⚠️ 注意事項與風險 (Notes & Risks)
(任何潛在問題、依賴、限制等)

## 📚 參考資料連結 (References)
- 主文件: `./product-requirements.md`
- 使用者故事: `./user-stories.md`
- 驗收標準: `./acceptance-criteria.md`

---
請確認收到，並回覆是否有需要澄清的問題。
```

**流程**：
1. 確認所有交付文件已放置在 `shared/pm-deliverables/` 目錄
2. 填寫 `handoff.md` 並放置於同目录
3. 更新專案根目錄的 `STATUS.md`，將 Product Manager 狀態設為 ✅ Completed
4. 通知架構師開始接手

---

_This role definition is in progress._
