# Phase 2 Protocol: 通訊機制與檔案交接規範

**Version**: 0.1  
**Last Updated**: 2026-03-13  
**Applicable Project**: Agentic Development Team

---

## 1. 目錄結構

```
projects/agentic-dev-team/
├── shared/                           # 所有角色交付檔案的根目錄
│   ├── pm-deliverables/             # 產品經理交付
│   │   ├── product-requirements.md
│   │   ├── user-stories.md
│   │   ├── acceptance-criteria.md
│   │   ├── handoff.md              # 必須使用統一模板
│   │   └── README.md                # 說明此目錄用途
│   ├── architect-deliverables/      # 架構師交付
│   │   ├── technology-stack.md
│   │   ├── architecture.md          # (含 Mermaid flowchart)
│   │   ├── database-schema.md       # (含 Mermaid erDiagram)
│   │   ├── api-specs.md
│   │   ├── directory-structure.md
│   │   ├── technical-risks.md
│   │   ├── handoff.md
│   │   └── README.md
│   ├── engineer-deliverables/       # 工程師交付
│   │   ├── src/                    # 完整原始碼
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── routes/
│   │   │   ├── config/
│   │   │   ├── tests/              # 單元測試
│   │   │   └── utils/
│   │   ├── tests/                  # Integration/E2E tests (可選)
│   │   ├── README.md
│   │   ├── TESTING.md
│   │   ├── CHANGELOG.md
│   │   ├── package.json / requirements.txt / Cargo.toml
│   │   ├── docker-compose.yml (可選)
│   │   ├── deployment.md (可选的)
│   │   ├── handoff.md
│   │   └── README.md
│   ├── reviewer-deliverables/      # 審核者交付
│   │   ├── review-report.md
│   │   ├── approval-status.txt    # "approved" 或 "request-changes"
│   │   ├── handoff.md
│   │   └── README.md
│   ├── tester-deliverables/        # 測試工程師交付
│   │   ├── test-cases.md
│   │   ├── test-execution-report.md
│   │   ├── bugs/                  # 個別 bug report 檔案
│   │   ├── sign-off.md            # "approved-for-release" 或 "not-ready"
│   │   ├── handoff.md
│   │   └── README.md
│   ├── qa.md                      # 通用 Q&A，任何角色可在此提問
│   └── NOTIFICATIONS.md           # 通知歷史（可選，備份用）
├── STATUS.md                       # 專案狀態追蹤（根目錄，非 shared/）
├── scripts/                       # 輔助腳本
│   ├── check-handoff.sh
│   ├── validate-workflow.sh
│   ├── verify-shared-structure.sh
│   └── update-status.sh
├── workflows/
│   └── handoff-protocol.md        # 原始交接協議
└── MEMORY.md                      # 專案記憶
```

---

## 2. STATUS.md 規格

**位置**: `projects/agentic-dev-team/STATUS.md`

**格式**:

```markdown
# Project Status - Agentic Development Team

Last Updated: YYYY-MM-DD HH:MM (Asia/Taipei)
Current Time in Taipei: YYYY-MM-DD HH:MM (UTC+8)

| Role | Status | Deliverable | Last Updated | Notes |
|------|--------|-------------|--------------|-------|
| Product Manager | ✅ Completed | pm-deliverables/ | 2026-03-13 03:50 | Handoff sent to Architect |
| Architect | 🔄 In Progress | architect-deliverables/ | 2026-03-13 04:10 | Architecture 80%, waiting for PM QA |
| Engineer | ⏳ Waiting | - | - | Waiting for Architect deliverables |
| Reviewer | ⏳ Waiting | - | - | - |
| Tester | ⏳ Waiting | - | - | - |
```

### Status Emoji 定義

| Emoji | 狀態 | 說明 |
|-------|------|------|
| ✅ | Completed | 交付完成，已移交下一個角色 |
| 🔄 | In Progress | 正在工作中，交付未完成 |
| ⏳ | Waiting | 等待前一個角色交付或等待其他資源 |
| ❌ | Blocked | 卡住，需要協助（在 Notes 說明原因） |

### 更新規則

- **開始工作時**: 更新為 `🔄 In Progress`, Deliverable 欄填寫目錄路徑 (e.g., `architect-deliverables/`)
- **完成交付**: 更新為 `✅ Completed`, Notes 可寫 "Handoff sent to [Next Role]"
- **收到上一個 handoff 並開始讀取**: 更新為 `🟡 In Progress`
- **遇到阻礙** (設計問題、QA 未回、資源不足): 更新為 `❌ Blocked`, Notes 簡述原因
- **問題解決**: 回到 `🟡 In Progress`

### 更新工具

```bash
# 手動編輯 STATUS.md
# 或使用腳本 (待實作):
./scripts/update-status.sh <role> <status> [notes]
# 例: ./scripts/update-status.sh architect "In Progress" "Architecture 80%"
```

---

## 3. Telegram 通知慣例

### 觸發時機
每個角色**完成 handoff.md 並且通過 `check-handoff.sh` 驗證後**

### 通知格式 (必須包含):

```
✅ [Role] 已完成交付
📁 位置：shared/[role]-deliverables/
📄 handoff.md 已填寫，請先閱讀
🔍 STATUS.md 狀態：✅ Completed
@[NextRole] 可以開始接手
```

### 各角色通知範例

**Product Manager → Architect**:
```
✅ Product Manager 已完成交付
📁 位置：shared/pm-deliverables/
📄 handoff.md 已填寫，請先閱讀
🔍 STATUS.md 狀態：✅ Completed
@Architect 可以開始接手
```

**Architect → Engineer**:
```
✅ Architect 已完成交付
📁 位置：shared/architect-deliverables/
📄 handoff.md 有 3 個開放問題需要確認
🔍 STATUS.md 狀態：✅ Completed
@Engineer 請查收並開始實作
```

**Engineer → Reviewer**:
```
✅ Engineer 已完成交付
📁 位置：shared/engineer-deliverables/
⚠️ 發現 2 個設計問題（見 handoff.md 【工程師警告】）
🔍 STATUS.md 狀態：✅ Completed
@Reviewer 請審查
```

**Reviewer → Tester** (Approved):
```
✅ Reviewer 通過審查（Approved）
📁 位置：shared/reviewer-deliverables/
🔍 STATUS.md 狀態：✅ Completed
@Tester 可以開始測試
```

**Reviewer → Engineer** (Request Changes):
```
🔄 Reviewer 要求修改
📁 位置：shared/reviewer-deliverables/
📄 review-report.md 中有 5 項需修正
🔍 STATUS.md 狀態：🔄 In Progress
@Engineer 請修復後重新提交
```

**Tester → Product Manager** (簽核完成):
```
✅ Tester 完成測試簽核
📁 位置：shared/tester-deliverables/
📄 sign-off.md: approved-for-release
🔍 STATUS.md 狀態：✅ Completed
@Product Manager 專案已完成，可交付使用者
```

**Tester → Engineer** (發現 Bug):
```
🐞 Tester 發現 3 個 Bug
📁 位置：shared/tester-deliverables/
📄 bugs/ 目錄下有詳細報告
🔍 STATUS.md 狀態：🔄 In Progress（等待修復）
@Engineer 請修復後重新提交
```

---

## 4. Handoff 檢查腳本

**檔案**: `scripts/check-handoff.sh`

```bash
#!/bin/bash
# 用法: ./scripts/check-handoff.sh <role> [deliverable-dir]
# 例: ./scripts/check-handoff.sh product-manager shared/pm-deliverables

set -e

ROLE=$1
DELIVERABLE_DIR=$2

# 1. 檢查目錄是否存在
if [ ! -d "$DELIVERABLE_DIR" ]; then
  echo "❌ Missing deliverable directory: $DELIVERABLE_DIR"
  exit 1
fi

# 2. 檢查 handoff.md 是否存在
if [ ! -f "$DELIVERABLE_DIR/handoff.md" ]; then
  echo "❌ Missing handoff.md in $DELIVERABLE_DIR"
  exit 1
fi

# 3. 檢查 handoff.md 的必要區段
REQUIRED_SECTIONS=("📦 交付內容" "✅ 已完成工作" "🔑 關鍵決策" "🧩 開放問題" "⚠️ 注意事項與風險" "📚 參考資料連結")
for SECTION in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -q "$SECTION" "$DELIVERABLE_DIR/handoff.md"; then
    echo "❌ Missing section: '$SECTION' in handoff.md"
    exit 1
  fi
done

# 4. 檢查是否有實際交付檔案 (根據角色不同)
case $ROLE in
  "product-manager")
    REQUIRED_FILES=("product-requirements.md" "user-stories.md" "acceptance-criteria.md")
    ;;
  "architect")
    REQUIRED_FILES=("technology-stack.md" "architecture.md" "database-schema.md" "api-specs.md" "directory-structure.md" "technical-risks.md")
    ;;
  "engineer")
    REQUIRED_FILES=("README.md" "TESTING.md" "CHANGELOG.md")
    # 檢查 src/ 目錄至少有1個程式碼文件
    if [ -z "$(find "$DELIVERABLE_DIR/src" -type f \( -name '*.js' -o -name '*.py' -o -name '*.go' -o -name '*.java' -o -name '*.ts' \) 2>/dev/null | head -1)" ]; then
      echo "❌ No source code files found in src/ directory"
      exit 1
    fi
    ;;
  "reviewer")
    REQUIRED_FILES=("review-report.md" "approval-status.txt")
    ;;
  "tester")
    REQUIRED_FILES=("test-cases.md" "test-execution-report.md" "sign-off.md")
    if [ ! -d "$DELIVERABLE_DIR/bugs" ]; then
      echo "❌ Missing bugs/ directory"
      exit 1
    fi
    ;;
  *)
    echo "Unknown role: $ROLE"
    exit 1
    ;;
esac

for FILE in "${REQUIRED_FILES[@]}"; do
  if [ ! -e "$DELIVERABLE_DIR/$FILE" ]; then
    echo "❌ Missing required file: $DELIVERABLE_DIR/$FILE"
    exit 1
  fi
done

echo "✅ $ROLE handoff is complete and valid."
exit 0
```

### 使用時機
- 提交 handoff 後，發送 TG 通知**之前**必須執行此腳本
- 如果失敗，修正問題後重試

---

## 5. 統一 Handoff 模板 (所有角色共用)

```markdown
# Handoff: [From Role] → [To Role]

Date: YYYY-MM-DD
From: [角色名稱]
To: [下一個角色名稱]

## 📦 交付內容 (Deliverables)
- [ ] file1.md
- [ ] file2.md
- [ ] ...

## ✅ 已完成工作
(列出本次交付完成的主要任務)

## 🔑 關鍵決策 (Key Decisions)
(列出影響下一個角色的重要決定及其理由)

## 🧩 開放問題 (Open Questions)
(列出需要下一個角色處理或決的具體問題)

## ⚠️ 注意事項與風險 (Notes & Risks)
(任何潛在問題、依賴、限制等)

## 📚 參考資料連結 (References)
- 主文件: ./path/to/main-doc.md
- 其他相關檔案: ./path/to/other-file.md

---
請確認收到，並回覆是否有需要澄清的問題。
```

### Engineering 特殊章節 (在「注意事項與風險」之後新增)

```markdown
## ⚠️ 工程師警告 (Developer Warning) - 僅工程師使用
（如發現架構設計問題，請列出）

### Issue #1: [簡短標題]
- **來源**: architecture.md 第 X 節
- **問題描述**: ...
- **影響**: ...
- **建議修正**: ...
- **狀態**: Blocking / Non-blocking
```

---

## 6. QA 流程

任何角色若有疑問，在 `shared/qa.md` 提問:

```markdown
## Q: 2026-03-13 - API 規格中的分頁參數 unclear
- **From**: Engineer
- **To**: Architect
- **Context**: api-specs.md 的 GET /api/v1/todos endpoint 提到分頁，但未說明 max_page_size
- **Question**: 預設 page_size 是多少？有上限嗎？

## A: 2026-03-13
- **From**: Architect
- **Answer**: 預設 20，上限 100，超過會回 400
- **Status**: ✅ Resolved
```

---

## 7. 常見問題 (FAQ)

**Q: 如果 handoff 檢查失敗，能 send 通知嗎?**  
A: 不行。必須先修正到通過 `check-handoff.sh` 才能通知下一個角色。

**Q: 批次實作時，中間要通知嗎?**  
A: 不用。只需更新 `STATUS.md`。最後一次交付時才 send 正式 handoff 通知。

**Q: 如果前一個角色的 handoff 有 open question，我能開始工作嗎?**  
A: 如果問題不影響核心實作，可以先開始。但如果問題是 Blocking (如設計錯誤)，應先等答案。

**Q: 多專案同時進行時，如何區分?**  
A: 每個專案有獨立的根目錄 (`projects/agentic-dev-team/`, `projects/another-project/`)，`shared/` 在各自專案內，天然隔離。通知時可加上專案名稱前綴。

---

## 8. 腳本一覽

| 腳本 | 用途 |
|------|------|
| `scripts/check-handoff.sh <role> <dir>` | 檢查單一角色的 handoff 完整性 |
| `scripts/validate-workflow.sh` | 檢查整個工作流程 (目錄是否存在、handoff 是否完整) |
| `scripts/verify-shared-structure.sh` | 檢查 `shared/` 目錄結構是否符合規範 |
| `scripts/update-status.sh <role> <status> [notes]` | 更新 STATUS.md (需實作) |
| `scripts/notify-next-role.sh <role>` | 生成 TG 通知訊息 (需實作) |

---

## 9. 開始使用流程

1. **建立目錄結構**: 執行 `scripts/verify-shared-structure.sh` 檢查，補齊缺失目錄
2. **準備 STATUS.md**: 使用範本，初始化所有角色狀態為 `⏳ Waiting`
3. **角色開始工作**:
   - 讀取上一個角色的 handoff.md
   - 實作/撰寫交付文件
   - 完成後執行 `check-handoff.sh` 驗證
   - 更新 `STATUS.md` 為 `✅ Completed`
   - 在 TG 群組發送通知 (@下一個角色)
4. **下一個角色接手**:
   - 讀取 handoff.md
   - 如有問題，在 `shared/qa.md` 提問
   - 更新 `STATUS.md` 為 `🔄 In Progress`
   - 開始工作

---

## 10. 版本與變更

- **Protocol Version**: 0.1
- **Last Updated**: 2026-03-13
- 任何人可提出變更建議，討論後更新本文件

---

## 附錄: 目錄結構驗證腳本範例

**`scripts/verify-shared-structure.sh`**:

```bash
#!/bin/bash
echo "🔍 Verifying shared/ directory structure..."

EXPECTED_DIRS=("pm-deliverables" "architect-deliverables" "engineer-deliverables" "reviewer-deliverables" "tester-deliverables")
for DIR in "${EXPECTED_DIRS[@]}"; do
  if [ ! -d "shared/$DIR" ]; then
    echo "❌ Missing directory: shared/$DIR"
  else
    # 檢查每個目錄是否有 README.md
    if [ ! -f "shared/$DIR/README.md" ]; then
      echo "⚠️  Missing README.md in shared/$DIR"
    fi
    # 檢查是否有 handoff.md
    if [ ! -f "shared/$DIR/handoff.md" ]; then
      echo "⚠️  Missing handoff.md in shared/$DIR"
    fi
  fi
done

echo "✅ Structure verification complete."
```

---

**註**: 本文件應放在專案根目錄 (如 `PHASE2-PROTOCOL.md`) 或 `workflows/phase2-protocol.md`，所有角色都必須閱讀並遵守。
