# Test Cases - Todo App

Based on Acceptance Criteria (docs/requirements/acceptance-criteria.md)

---

## TC-01: 新增待辦事項 (AC-01)

**Preconditions**: User on homepage, form visible.

**Steps**:
1. Enter title "買牛奶" in title input
2. Optionally enter description "全脂"
3. Click "新增" button

**Expected**:
- Todo appears in list with title "買牛奶"
- Status is unchecked
- Title input cleared
- Description cleared

**Status**: ⏳ Ready for execution

---

## TC-02: 不允許空標題 (AC-02)

**Preconditions**: User on homepage.

**Steps**:
1. Leave title input empty
2. Observe "新增" button state

**Expected**:
- Button is disabled
- OR clicking shows error message "標題必填"

**Status**: ⏳ Ready

---

## TC-03: 編輯待辦事項 (AC-03)

**Preconditions**: List contains a todo "寫報告".

**Steps**:
1. Click "編輯" button next to "寫報告"
2. Change title to "寫月度報告"
3. Click "儲存"

**Expected**:
- List item title updates to "寫月度報告"
- Updated timestamp changes

**Status**: ⏳ Ready

---

## TC-04: 刪除待辦事項 (AC-04)

**Preconditions**: List contains a todo "逛街".

**Steps**:
1. Click "刪除" button
2. Confirm in dialog

**Expected**:
- Todo removed from list
- LocalStorage cleared for that item

**Status**: ⏳ Ready

---

## TC-05: 切換完成狀態 (AC-05)

**Preconditions**: List contains incomplete todo "健身".

**Steps**:
1. Click checkbox for "健身"

**Expected**:
- Todo becomes checked, style shows line-through

2. Click checkbox again

**Expected**:
- Todo becomes unchecked, style normal

**Status**: ⏳ Ready

---

## TC-06: 篩選功能 (AC-06)

**Preconditions**: List contains:
- "晨跑" (incomplete)
- "早餐" (complete)

**Steps**:
1. Click "未完成" filter
2. Verify only "晨跑" shown
3. Click "已完成" filter
4. Verify only "早餐" shown
5. Click "全部" filter
6. Both shown

**Expected**: Filtering works.

**Status**: ⏳ Ready

---

## TC-07: 資料持久化 (LocalStorage) (AC-07)

**Preconditions**: App has at least 2 todos.

**Steps**:
1. Close browser tab
2. Re-open app

**Expected**:
- Same todos appear, same state

**Status**: ⏳ Ready

---

## TC-08: 響應式設計 (AC-08)

**Preconditions**: Open app on mobile device or width < 768px.

**Steps**:
1. Perform add, edit, delete actions
2. Verify UI elements are usable

**Expected**:
- No horizontal overflow
- Buttons accessible
- Forms usable

**Status**: ⏳ Ready

---

## API Tests (Integration)

- [ ] `GET /api/todos` returns list (200)
- [ ] `POST /api/todos` creates new (201)
- [ ] `PATCH /api/todos/:id` updates
- [ ] `DELETE /api/todos/:id` deletes (204)
- [ ] Validation errors: missing title returns 400
- [ ] Not found returns 404

---

**Note**: Testing currently requires:
- Backend running on http://localhost:3000
- Frontend running on http://localhost:5173
- Vite proxy configured

---