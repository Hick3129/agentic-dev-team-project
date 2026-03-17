# 資料庫 Schema (Database Schema)

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Todo {
  id          String   @id @default(cuid())
  title       String   @db.VarChar(100)
  description String?  @db.Text
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([completed])
  @@index([createdAt])
}
```

---

## 表結構說明

| 欄位 | 類型 | 必填 | 預設 | 說明 |
|------|------|------|------|------|
| `id` | String (cuid) | ✅ | auto-gen | 主鍵， globally unique |
| `title` | VARCHAR(100) | ✅ | - | 待辦標題，最長 100 字元 |
| `description` | TEXT | ❌ | NULL | 描述，可為空 |
| `completed` | BOOLEAN | ✅ | false | 完成狀態 |
| `createdAt` | DATETIME | ✅ | now() | 建立時間 |
| `updatedAt` | DATETIME | ✅ | auto-update | 更新時間 |

---

## SQL (直接 SQLite)

如果不想用 Prisma，原始 SQL：

```sql
CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);
```

---

## 遷移 (Migration)

使用 Prisma：

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 種子資料 (Seeding)

可選，用於開發：

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: '買牛奶', description: '全脂', completed: false },
      { title: '寫作業', description: '數學第三章', completed: true },
    ],
  });
}
main();
```

---

## 更新记录

- 2026-03-17: Initial schema created (Hick3129)