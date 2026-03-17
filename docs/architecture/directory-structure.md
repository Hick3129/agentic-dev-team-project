# 專案目錄結構 (Directory Structure)

```
agentic-dev-team-project/
├── .github/
│   ├── CODEOWNERS
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       ├── validate-handoff.yml
│       └── update-status.yml
├── docs/
│   ├── requirements/          # 產品經理
│   ├── architecture/          # 架構師 (本目錄結構說明的實作位置)
│   │   ├── api-specs.md
│   │   ├── architecture.md
│   │   ├── database-schema.md
│   │   ├── directory-structure.md  (本文件)
│   │   ├── technical-risks.md
│   │   └── handoff.md
│   ├── implementation/        # 工程師 (後續)
│   ├── review/                # 審核者 (後續)
│   ├── testing/               # 測試工程師 (後續)
│   └── qa.md                  # 共享问答
├── scripts/
│   ├── create-handoff.sh
│   ├── validate-deliverables.sh
│   └── update-status.sh
├── roles/
│   ├── product-manager.md
│   ├── architect.md
│   ├── engineer.md
│   ├── reviewer.md
│   └── tester.md
├── workflows/
│   ├── overall-flow.md
│   ├── handoff-protocol.md
│   └── phase2-protocol.md
├── poc/
│   ├── test-plan.md
│   └── writer-task.md
├── research/
├── plans/
├── discussions/
├── README.md
├── PROJECT.md
├── GITHUB_PLAN.md
├── IMPLEMENTATION_GUIDE.md
├── STATUS.md
└── MEMORY.md

# …待實作的原始碼目錄 (在 Engineer 階段決定位置)
# 初步構想:
# - frontend/
# - backend/
# - prisma/
# - docker-compose.yml (可選)
```

---

## 說明

- **docs/**: 包含各角色的交付文件，以角色名稱子目錄組織
- **`.github/`**: GitHub 設定 (CODEOWNERS, workflows, PR template)
- **scripts/**: 輔助腳本 (檢查交接、更新狀態)
- **roles/**: 角色定義與期望
- **workflows/**: 流程圖與協議文件 (非必要)
- **poc/**: 概念驗證與計劃
- **research/**: 研究筆記
- **plans/**: 發展藍圖

---

## 後續擴展

- 最終要加入 `frontend/`, `backend/` 目錄，放置實際程式碼
- `prisma/` 放 schema 和 migration
- `Dockerfile` 和 `docker-compose.yml` 用於容器化部署
- `README.md` (根目錄) 應說明如何啟動專案

---

_Note: This document describes the repository layout for the project documentation and automation. The actual application code will be placed under `frontend/` and `backend/` by the Engineer role._