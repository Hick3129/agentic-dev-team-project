# 技術棧選擇 (Technology Stack) - Todo App

## 概述
本專案採用前後端分離架構，便於測試、擴展和部署。

---

## 前端

| 技術 | 版本/說明 | 理由 |
|------|-----------|------|
| **React** | 18+ | 成熟的 UI library，生態豐富 |
| **TypeScript** | 5+ | 型別安全，減少 runtime error |
| **Vite** | 5+ | 快速 HMR，建置速度快 |
| **Tailwind CSS** | 3+ | utility-first，快速原型 |
| **Zustand** | 4+ | 輕量狀態管理，適合小型 App |
| **React Hook Form** | 7+ | 表單處理，與 TS 整合佳 |
| **Axios** | 2+ | HTTP client |
| **Vitest** | 1+ | 單元測試，與 Vite 整合 |
| **Cypress** | 13+ | E2E 測試 |

---

## 後端

| 技術 | 版本/說明 | 理由 |
|------|-----------|------|
| **Node.js** | 20+ LTS | 與前端相同語言生態 |
| **Express** | 4+ | 輕量、middleware 豐富 |
| **SQLite** | 3 | 無需額外伺服器，簡易部署 |
| **Prisma** | 5+ | ORM，schema-first，易於遷移 |
| **Jest** | 29+ | 單元與整合測試 |
| **Supertest** | 6+ | API 測試 |
| **Nodemon** | 3+ | 開發熱重載 |

---

## 開發與部署

| 工具 | 用途 |
|------|------|
| **Git** | 版本控制 |
| **GitHub Actions** | CI/CD (Validate Handoff, 測試) |
| **Docker** | (可選) 容器化部署 |
| **Vercel** | 前端部署 (靜態輸出) |
| **Railway / Render** | 後端部署 (Node + SQLite) |

---

## 替代方案（未採用）

- **後端框架**：Fastify (更快但生態少) → 用 Express 因社群大
- **資料庫**：PostgreSQL (太大的學習曲線) → 先用 SQLite
- **前端狀態**：Redux Toolkit (太重) → Zustand 更簡潔
- **API 通訊**：GraphQL (過度設計) → REST 已足夠

---

## 決策日誌

- 2026-03-17: 確定技術棧 (Hick3129 as Architect)