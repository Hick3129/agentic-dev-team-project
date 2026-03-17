# Agentic Frameworks 研究

## 為什麼要看現有的 framework？

在建立自己的 agentic dev team 之前，了解其他人怎麼做：
- 避免重複發明輪子
- 學習最佳实践和常見陷阱
- 可能直接使用或改進現有 solution

---

## 1. AutoGen (Microsoft)

**網址**: https://github.com/microsoft/autogen

**核心概念**：
- 多個 LLM agents 可以對話、協作
- 支援 group chat、two-party chat
- 每個 agent 可以有不同 prompt、工具、模型

**角色（示例）**：
- Assistant
- User Proxy
- Tool Caller

**與我們專案的關係**：
- 我們可以參考其**對話管理**機制
- 但它更偏向「通用對話」，而非「固定開發流程」
- 我們的工作流程更線性、有明確交接

**可借鏡之處**：
- group chat 的消息廣播
- 工具呼叫的機制
- 轉移對話控制權

---

## 2. CrewAI

**網址**: https://github.com/joaomdmoura/crewai

**核心概念**：
- 每個 agent 有明確的 **role**, **goal**, **backstory**
- 使用 **tasks** 定義工作
- Agent 之間自動 delegat 任務

**我們可以學的地方**：
- role-based prompt engineering
- task decomposition
- 自動 result passing

**與我們的不同**：
- CrewAI 是 quite high-level，較少規範**工作產出格式**
- 我們想要更嚴謹的交付協議

---

## 3. ChatDev (OpenBMB)

**網址**: https://github.com/OpenBMB/ChatDev

**核心概念**：
- 模擬軟體公司：有 CEO、CTO、程式設計師、測試員
- 使用 **chat 房間** 概念，每個角色在單獨 channel 討論
- 有版本控制（git）整合

**與我們最相關**：
- 直接模擬開發團隊
- 有階層式的管理（如 CEO 批准需求）

**我們的不同**：
- ChatDev 用 chat 作為主要通訊
- 我們想嘗試**檔案為主的交接**（更穩定、可追蹤）
- ChatDev 偏完整自動化，我們目前是 discussion phase

---

## 4. MetaGPT

**網址**: https://github.com/geekan/MetaGPT

**核心概念**：
- 為每個角色設計 SOP（Standard Operating Procedure）
- 產生結構化輸出（Like a human company）
- 強調 **「一份文件，多方 enhanced」**

**可參考**：
- SOP 設計方式
- 多人修改同一份文件（如 PRD 由 multiple agents 共同編寫）
- 角色之間的 consensus mechanism

---

## 5. OpenClaw Sub-Agents

**我們自己的平台**：
- 可以用 `sessions_spawn` 啟動 isolate agent
- 每個 agent 有自己的 workspace、memory
- 可以透過 `sessions_send` 傳遞訊息

**優勢**：
- 已有 infrastructure
- 可以在聊天中直接 execute
- 與現有技能整合容易

**挑戰**：
- 如何持久化 state？（sub-agent 結束後狀態消失）
- 如何設定固定的 role prompt？

---

## 📊 比較表格

| Feature | AutoGen | CrewAI | ChatDev | MetaGPT | OpenClaw (我們) |
|---------|---------|--------|---------|---------|----------------|
| Role-based | ✅ | ✅ | ✅ | ✅ | ✅ (自定義) |
| File-based | ❌ | ⚠️ | ❌ | ⚠️ | ✅ (計畫) |
| Structured Output | ⚠️ | ✅ | ✅ | ✅ | ✅ (可自訂) |
| Versioning | ❌ | ❌ | ✅ (git) | ❌ | ⚠️ (需自建) |
| Easy to Use | ✅ | ✅ | ⚠️ | ⚠️ | ✅ (如果熟悉 OpenClaw) |
| Custom Workflow | ✅ | ✅ | ❌ | ❌ | ✅ (完全自訂) |

---

## 💡 我們的方向（目前討論）

1. **以檔案為主的通訊**：避免每次都在聊天中傳遞大段程式碼，用 `shared/` 目錄保持版本
2. **明確的交接協議**：每個角色必須留下 `handoff.md`
3. **狀態追蹤**：用 `STATUS.md` 記錄進度
4. **長期 not 全自動**：我們允許 human-in-the-loop（例如使用者審查 PRD）
5. **可重用的角色定義**：把 `roles/*.md` 做成 template，未來可複用於不同專案

---

## 🎯 下一步研究

- [ ] 深入研究 ChatDev 的 git 整合方式
- [ ] 看看 MetaGPT 如何做 SOP
- [ ] 研究 CrewAI 的 task delegation 機制
- [ ] 測試在 OpenClaw 中 spawn role-based sub-agent

---

_This document will be updated as we learn more._
