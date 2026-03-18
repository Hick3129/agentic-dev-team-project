import { test, expect } from '@playwright/test';

test.describe('Todo App Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('TC-01: 新增待辦事項', async ({ page }) => {
    await page.fill('input[placeholder="輸入待辦標題"]', '買牛奶');
    await page.fill('textarea[placeholder="輸入描述"]', '全脂');
    await page.click('button:has-text("新增")');

    // Expect list item appears
    await expect(page.locator('h3').filter({ hasText: '買牛奶' })).toBeVisible();
    await expect(page.locator('p.text-gray-600').filter({ hasText: '全脂' })).toBeVisible();

    // Title input should be cleared
    await expect(page.locator('input[placeholder="輸入待辦標題"]')).toHaveValue('');
  });

  test('TC-02: 空標題阻擋', async ({ page }) => {
    const addButton = page.locator('button:has-text("新增")');
    // Button should be disabled when title is empty
    await expect(addButton).toBeDisabled();

    // List should remain empty
    await expect(page.locator('li')).toHaveCount(0);
  });

  test('TC-03: 編輯待辦事項', async ({ page }) => {
    // Create a todo first
    await page.fill('input[placeholder="輸入待辦標題"]', '寫報告');
    await page.click('button:has-text("新增")');
    await expect(page.locator('h3').filter({ hasText: '寫報告' })).toBeVisible();

    // Click edit button for the first todo item
    await page.locator('button:has-text("編輯")').first().click();

    // Edit inputs appear
    await expect(page.locator('input[value="寫報告"]')).toBeVisible();
    await page.locator('input[value="寫報告"]').fill('寫月度報告');
    await page.locator('textarea').first().fill('修改後的描述');
    await page.click('button:has-text("儲存")');

    // Verify the list updates
    await expect(page.locator('h3').filter({ hasText: '寫月度報告' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: '寫報告"')]).not.toBeVisible();
  });

  test('TC-04: 刪除待辦事項', async ({ page }) => {
    await page.fill('input[placeholder="輸入待辦標題"]', '測試刪除');
    await page.click('button:has-text("新增")');
    await expect(page.locator('h3').filter({ hasText: '測試刪除' })).toBeVisible();

    await page.locator('button:has-text("刪除")').first().click();

    // Confirm the deletion dialog (confirm())
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('確定刪除');
      await dialog.accept();
    });

    // Item should be gone
    await expect(page.locator('h3').filter({ hasText: '測試刪除' })).not.toBeVisible();
  });

  test('TC-05: 切換完成狀態', async ({ page }) => {
    await page.fill('input[placeholder="輸入待辦標題"]', '切換測試');
    await page.click('button:has-text("新增")');

    const checkbox = page.locator('input[type="checkbox"]').first();
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // Check for strikethrough on title
    const titleH3 = page.locator('h3').filter({ hasText: '切換測試' });
    await expect(titleH3).toHaveClass(/line-through/);

    // Toggle back
    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await expect(titleH3).not.toHaveClass(/line-through/);
  });

  test('TC-06: 篩選功能', async ({ page }) => {
    // Create two todos
    await page.fill('input[placeholder="輸入待辦標題"]', '未完成任務');
    await page.click('button:has-text("新增")');
    await page.fill('input[placeholder="輸入待辦標題"]', '已完成任務');
    await page.click('button:has-text("新增")');

    // Complete the second one
    await page.locator('input[type="checkbox"]').nth(1).click();
    await expect(page.locator('input[type="checkbox"]').nth(1)).toBeChecked();

    // Filter: 未完成
    await page.click('button:has-text("未完成")');
    await expect(page.locator('h3').filter({ hasText: '未完成任務' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: '已完成任務' })).not.toBeVisible();

    // Filter: 已完成
    await page.click('button:has-text("已完成")');
    await expect(page.locator('h3').filter({ hasText: '已完成任務' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: '未完成任務' })).not.toBeVisible();

    // Filter: 全部
    await page.click('button:has-text("全部")');
    await expect(page.locator('h3').filter({ hasText: '未完成任務' })).toBeVisible();
    await expect(page.locator('h3').filter({ hasText: '已完成任務' })).toBeVisible();
  });

  test('TC-07: LocalStorage 持久化', async ({ page }) => {
    await page.fill('input[placeholder="輸入待辦標題"]', '持久化測試');
    await page.click('button:has-text("新增")');

    // Verify present
    await expect(page.locator('h3').filter({ hasText: '持久化測試' })).toBeVisible();

    // Reload page (manual refresh - localStorage should persist)
    await page.reload();

    // Data should still be there
    await expect(page.locator('h3').filter({ hasText: '持久化測試' })).toBeVisible();
  });

  test('TC-08: 響應式設計', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Add a todo to check layout
    await page.fill('input[placeholder="輸入待辦標題"]', '行動版測試');
    await page.click('button:has-text("新增")');

    // Verify visible
    await expect(page.locator('h3').filter({ hasText: '行動版測試' })).toBeVisible();

    // Ensure no horizontal overflow (scrollWidth <= innerWidth)
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    expect(hasHorizontalScroll).toBeFalsy();
  });
});
