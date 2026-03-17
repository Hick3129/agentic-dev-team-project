# Handoff Protocol - 角色交接協議

---

## 目的

確保每個角色完成工作後，**下一個角色能順利接手**，避免訊息遺失或誤解。

---

## 📦 必需交付項目

每個角色完成工作時，必須提供以下內容：

### 1. 主要_output文件
（見各角色文件）

### 2. `handoff.md`

這個文件專門給下一個角色的 **Summary 和 Context**：

```markdown
# Handoff: [Role A] → [Role B]

Date: 2026-03-13
From: Product Manager
To: Architect

##  completed work
- PRD v1.0 撰寫完成
- 3 個使用者故事已定義
- 優先級排序完成

## 關鍵決策
1. 選擇 MV（Minimum Viable Product）範圍：只包含 core features
2. 不支援 Multiple tenants（單一租戶）
3. 使用 PostgreSQL 作為資料庫（推薦）

## 假設（Assumptions）
- 使用者技術能力中等
- 預期並發使用者 < 1000
- 不需要多語言支援（Phase 2 考慮）

## 開放問題（Open Questions）
1. Q: 是否要支援 OAuth 第三方登入？
   - A: 第一阶段先不用，但架構要預留空間

2. Q: 檔案上傳大小限制？
   - A: 需要 Architect 建議

## 建議
- 技術選型盡量選擇有良好文件庫的技術
- 考慮未來 scaling，但不要 over-engineer

## 參考資料
- link to PRD: `./product-requirements.md`
- link to user stories: `./user-stories.md`

---
Please acknowledge receipt and ask any clarifying questions.
```

---

## 📤 交付包裝格式

```
shared/
└── [role]-deliverables/
    ├── README.md           ← 描述內容和如何使用
    ├── main-output.md      ← 主要文件
    ├── handoff.md          ← 給下一個角色的訊息
    └── supporting/         ← 附屬檔案（圖表、資料檔）
```

---

## ✅ 交接檢查清單

交付前，發送者必須檢查：

- [ ] 所有主要文件都在 `shared/` 目錄
- [ ] `handoff.md` 已填寫（含日期、_from/to_）
- [ ] 檔案格式正確（Markdown、YAML、程式碼可編譯）
- [ ] 沒有不必要的個人檔案（.git、node_modules、.DS_Store）
- [ ] 檔案連結正確（relative path）
- [ ] 已告知下一個角色（透過訊息或通知）

---

## 📥 接收檢查清單

接收者收到交付後，必須：

- [ ] 確認收到所有檔案
- [ ] 閱讀 `handoff.md` 了解上下文
- [ ] 如果有模糊的地方，立即提問
- [ ] 確認可以開始工作後，回應：
  ```
  ✅ Received [Role A] deliverables.
  - Read handoff.
  - No open questions. (or list questions)
  - Will start work on [estimated time].
  ```

---

## 🔄 質詢流程（Clarification）

如果接收者有問題：

1. 在 `shared/qa.md` 新增項目：
   ```markdown
   ## Q: [日期] - [問題]
   - **From**: Engineer
   - **To**: Architect
   - **Context**: [哪裡看不懂]
   - **Question**: [具體問題]
   ```
2. 通知發送者 (`@Architect`) 回答
3. 回答後，標記為 `✅ Resolved`

---

## ⏰ 時間期待

- **Product Manager → Architect**：1-2 天（視需求複雜度）
- **Architect → Engineer**：2-3 天（含設計和文件）
- **Engineer → Reviewer**：視專案大小，可能 1 天到 1 週
- **Reviewer → Tester**：審查 cache  shorter（hours 到 2 天）
- **Tester → PM**：1-3 天（執行測試和 bug 追蹤）

---

## 📈 狀態更新

當每個角色**開始工作**和**完成交付**時，必須更新 `STATUS.md`：

```markdown
| Role | Status | Deliverable | Last Updated |
|------|--------|------------|--------------|
| Product Manager | ✅ Completed | product-requirements.md | 2026-03-13 10:30 |
| Architect | 🟡 In Progress | architecture.md (40%) | 2026-03-13 14:00 |
| Engineer | ⏳ Waiting | - | - |
```

使用 emoji 表示：
- ✅ Completed
- 🟡 In Progress
- 🔄 Under Review
- ⏳ Waiting (blocked)
- ❌ Blocked

---

## 🚨 問題處理

如果交接出現問題（例如：文件不完整）：
1. **接收者**：在 `qa.md` 提問，標記為 `[BLOCKER]`
2. **發送者**：必須在 4 小時內回覆
3. 如果卡住超過 1 天，** escalation** 給 project manager（目前可能由 Assistant 提醒）

---

## 📝 範例：一段完整的交接

**From Product Manager** (完成 PRD 後):

1. 建立 `shared/pm-deliverables/`
2. 放入：
   - `product-requirements.md`
   - `user-stories.md`
   - `handoff.md`（含關鍵決策和 open questions）
3. 更新 `STATUS.md` → Product Manager: ✅ Completed
4. 訊息通知 Architect：「PM deliverables ready. Please check `shared/pm-deliverables/`」

**Architect 接收後**:
1. 讀取所有文件
2. 如果有問題，在 `shared/qa.md` 提問
3. 若無問題，開始設計，並更新 `STATUS.md` → Architect: 🟡 In Progress

---

## 📚 相關檔案

- `PROJECT.md` - 專案詳細說明
- 各角色 `roles/*.md` - 角色職責和產出

---

_Protocol version 0.1 - 2026-03-13_
