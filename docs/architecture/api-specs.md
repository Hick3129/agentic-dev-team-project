# API 規格 (API Specifications)

## 基本資訊

- **Base URL**: `http://localhost:3000/api` (開發), `https://your-backend.com/api` (生產)
- **格式**: JSON
- **認證**: 目前無 (單人使用)
- **版本**: v1 (在 URL path 中暫時省略，未來可加 `/api/v1`)

---

## Endpoints

### 1. 列出所有待辦

**GET** `/todos`

**Query Parameters**:
- `completed` (optional): `true` 或 `false`，只回傳指定狀態

**Response 200**:
```json
{
  "success": true,
  "data": [
    {
      "id": "clxyz123...",
      "title": "買牛奶",
      "description": "全脂",
      "completed": false,
      "createdAt": "2026-03-17T10:00:00Z",
      "updatedAt": "2026-03-17T10:00:00Z"
    }
  ]
}
```

**Response 500**:
```json
{
  "success": false,
  "error": "Database error",
  "message": "Something went wrong"
}
```

---

### 2. 建立新待辦

**POST** `/todos`

**Headers**:
- `Content-Type: application/json`

**Body**:
```json
{
  "title": "寫報告",
  "description": "週報",
  "completed": false
}
```

**Validation Rules**:
- `title`: 必填，最长 100 字元
- `description`: 選填，最多 500 字元
- `completed`: 可選，預設 false

**Response 201**:
```json
{
  "success": true,
  "data": {
    "id": "clabc...",
    "title": "寫報告",
    "description": "週報",
    "completed": false,
    "createdAt": "2026-03-17T10:05:00Z",
    "updatedAt": "2026-03-17T10:05:00Z"
  }
}
```

**Response 400**:
```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Title is required"
}
```

---

### 3. 取得單一待辦

**GET** `/todos/:id`

**Response 200**:
```json
{
  "success": true,
  "data": { ... }
}
```

**Response 404**:
```json
{
  "success": false,
  "error": "NOT_FOUND",
  "message": "Todo not found"
}
```

---

### 4. 更新待辦

**PATCH** `/todos/:id`

**Body** (可選欄位):
```json
{
  "title": "新標題",
  "description": "新描述",
  "completed": true
}
```

**Response 200**:
```json
{
  "success": true,
  "data": { ... } // 更新的物件
}
```

---

### 5. 刪除待辦

**DELETE** `/todos/:id`

**Response 204**:
No content (或回傳簡單訊息):
```json
{
  "success": true,
  "message": "Todo deleted"
}
```

---

## 錯誤處理 (統一格式)

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable message"
}
```

常見 error codes:
- `VALIDATION_ERROR`
- `NOT_FOUND`
- `INTERNAL_ERROR`
- `DATABASE_ERROR`

---

## CORS

開發時允许所有來源（`*`），production 應限制為前端網域。

---

## 速率限制

可選：express-rate-limit，每 IP 每分鐘 60 次請求。

---

## 註：日期格式

所有日期時間使用 ISO 8601 (UTC)，例：`2026-03-17T10:00:00Z`