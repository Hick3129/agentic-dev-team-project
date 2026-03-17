# Sub-agent File Sharing Proof-of-Concept

**目標**：驗證 OpenClaw sub-agent 是否能共享檔案。

## 測試設計

1. 主 agent 啟動一個 sub-agent (writer)，讓它寫入一個檔案到共享目錄
2. 主 agent 啟動另一個 sub-agent (reader)，讓它讀取同一個檔案
3. 比較兩個 sub-agent 是否能看到相同的內容

## 實驗步骤

### Step 1: 建立測試目錄

```bash
mkdir -p ~/.openclaw/workspace/projects/agentic-dev-team/poc/shared
```

### Step 2: 測試 Case 1 - 使用 attachAs 掛載

 spawn 一個 sub-agent，並透過 `attachAs` 掛載 `shared/` 目錄，讓 sub-agent 寫入檔案。

然後在另一個 sub-agent 中讀取。

### Step 3: 測試 Case 2 - 預設工作區繼承

不指定 attachAs，檢查 sub-agent 是否能訪問主 agent 的工作區。

## Expected Behavior

- Case 1: sub-agent 應該能看到掛載的目錄，並能读写
- Case 2: sub-agent 應該繼承主 agent 的工作區（預設行為）

## 實際執行

我们現在開始執行測試。