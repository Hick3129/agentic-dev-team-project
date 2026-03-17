# Role: Architect (架構師)

## 概述

架構師負責將產品需求轉化為**技術實現方案**，包括系統架構設計、技術選型、API 規格定義等。

---

## 📋 主要職責

1. **消化 PRD**：仔細閱讀產品經理的交付文件，評估技術可行性。
2. **定義非功能性需求**：效能、安全性、擴展性、可用性目標。
3. **技術選型**：選擇前端、後端、資料庫、第三方服務，並記錄選擇理由。
4. **系統架構設計**：決定架構模式（MVC、微服務等）、定義組件職責、資料流向。
5. **資料庫設計**：設計資料庫結構（Schema 或 Models），包含關聯性和索引。
6. **API 設計**：定義核心 API 介面規範（至少涵蓋 MVP 的 80%）。
7. **目錄結構規劃**：設計專案的基礎目錄結構，便於工程師實作。
8. **撰寫交接文件（Handoff）**：完成所有輸出後，必須撰寫 `handoff.md` 交給工程師。

---

## 📥 輸入

- 產品經理的 `product-requirements.md`、`user-stories.md`、`acceptance-criteria.md`
- 潛在的技術限制（如：必須使用某個雲端平台、團隊熟悉度限制）

---

## 📤 輸出

### 1. Architecture Design Document (`architecture.md`)

```markdown
# [專案名稱] - 架構設計

## 架構概觀
（架構圖 - 建議使用 mermaid 或文字說明）

## 組件圖
（有哪些服務/模組？彼此如何通訊？）

## 資料流
（使用者操作時資料如何流動？）

## 部署架構
（ Development / Staging / Production）

## 安全性考量
（認證、授權、加密）

## 可擴展性
（如何 scaling？）

## 備份與災難復原
```

### 2. API Specification (`api-spec.yaml`)

使用 OpenAPI 3.0 格式：

```yaml
openapi: 3.0.0
info:
  title: [專案 API]
  version: 1.0.0
paths:
  /api/v1/todos:
    get:
      summary: 取得 todo 列表
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/TodoList'
...
```

### 3. Data Model (`data-model.md` 或 `schema.sql`)

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INT REFERENCES users(id)
);
```

---

## 🔄 工作流程

1. **Review PRD**：仔細閱讀需求文件
2. **Ask Questions**：如有模糊或技術上不可行之處，回問產品經理
3. **Draft Architecture**：撰寫初步架構
4. **Technology Selection**：決定技術棧，記錄理由
5. **Design APIs**：定義 API endpoint 和資料格式
6. **Review & Refine**：自我審查，確保一致性
7. **Handoff to Engineer**：交付設計文件

---

## 🎯 交付準則（Definition of Done）

- [ ] `architecture.md` 完成且包含系統圖
- [ ] API 規格至少定義 80% 的 endpoint
- [ ] 資料模型完整（tables, fields, relationships）
- [ ] 技術選擇理由清楚（Why not other options?）
- [ ] 列出潛在的技術風險和緩解方案
- [ ] 標記所有 open questions 和 assumptions

---

## 🛠️ 工具與技巧

- **Draw.io** 或 **Excalidraw** 畫架構圖
- **OpenAPI Generator** 生成 API stub
- **CHitGPT / Claude** 幫忙起草文件
- **ADRs（Architecture Decision Records）** 記錄重要決定

---

## 📌 注意事項

- **Avoid over-engineering**：不要過度設計，滿足當前需求即可
- **Consider operational aspects**：部署、監控、Logging、Debug
- **Security by design**：從一開始就考慮安全性
- **Future extensibility**：預測可能的功能擴展，留出擴充點
- **Document trade-offs**：記錄每個技術選擇的取捨

---

## 🔗 交接檢查清單

在移交給工程師之前確認：

- [ ] PRD 中所有功能都有對應的技術設計
- [ ] API 設計符合 RESTful 原則（如使用 REST）
- [ ] 資料庫 schema 符合正規化原則
- [ ] 錯誤處理和邊境條件已考慮
- [ ] 效能和 scalability 有初步想法
- [ ] 第三方服務的整合方式清楚

---

_This role definition is in progress._
