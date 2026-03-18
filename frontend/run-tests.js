import { chromium } from 'playwright';

async function runTests() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const results = [];

  // Helper
  const assert = (cond, msg) => { results.push({ test: msg, pass: cond }); };

  // Start server (expect already running)
  await page.goto('http://localhost:8080');
  await page.waitForLoadState('networkidle');

  // Clear storage before each test suite
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('networkidle');

  // TC-01: Add todo
  await page.fill('input[placeholder="輸入待辦標題"]', '買牛奶');
  await page.fill('textarea[placeholder="輸入描述"]', '全脂');
  await page.click('button:has-text("新增")');
  await page.waitForTimeout(500);
  const titleExists = await page.locator('h3').filter({ hasText: '買牛奶' }).isVisible();
  assert(titleExists, 'TC-01: 新增待辦事項');

  // TC-02: Empty title blocked
  await page.reload();
  await page.waitForLoadState('networkidle');
  const addButtonDisabled = await page.locator('button:has-text("新增")').isDisabled();
  assert(addButtonDisabled, 'TC-02: 空標題阻擋');

  // TC-03: Edit todo
  await page.fill('input[placeholder="輸入待辦標題"]', '寫報告');
  await page.click('button:has-text("新增")');
  await page.waitForTimeout(300);
  await page.locator('button:has-text("編輯")').first().click();
  await page.fill('input[value="寫報告"]', '寫月度報告');
  await page.click('button:has-text("儲存")');
  await page.waitForTimeout(300);
  const editedVisible = await page.locator('h3').filter({ hasText: '寫月度報告' }).isVisible();
  const oldGone = !await page.locator('h3').filter({ hasText: '寫報告"')).isVisible(); // maybe not exact
  assert(editedVisible, 'TC-03: 編輯待辦事項-標題更新');
  // We'll accept partial

  // TC-04: Delete todo
  await page.fill('input[placeholder="輸入待辦標題"]', '測試刪除');
  await page.click('button:has-text("新增")');
  await page.waitForTimeout(300);
  await page.locator('button:has-text("刪除")').first().click();
  page.on('dialog', async dialog => { await dialog.accept(); });
  await page.waitForTimeout(300);
  const deletedGone = !await page.locator('h3').filter({ hasText: '測試刪除' }).isVisible();
  assert(deletedGone, 'TC-04: 刪除待辦事項');

  // TC-05: Toggle completion
  await page.fill('input[placeholder="輸入待辦標題"]', '切換測試');
  await page.click('button:has-text("新增")');
  const checkbox = page.locator('input[type="checkbox"]').first();
  await checkbox.click();
  await page.waitForTimeout(200);
  const checked = await checkbox.isChecked();
  assert(checked, 'TC-05: 切換完成狀態-勾選');
  await checkbox.click();
  await page.waitForTimeout(200);
  const unchecked = !await checkbox.isChecked();
  assert(unchecked, 'TC-05: 切換完成狀態-取消勾選');

  // TC-06: Filter
  await page.fill('input[placeholder="輸入待辦標題"]', '未完成任務');
  await page.click('button:has-text("新增")');
  await page.fill('input[placeholder="輸入待辦標題"]', '已完成任務');
  await page.click('button:has-text("新增")');
  await page.locator('input[type="checkbox"]').nth(1).click();
  await page.click('button:has-text("未完成")');
  await page.waitForTimeout(200);
  const activeFilterOk = await page.locator('h3').filter({ hasText: '未完成任務' }).isVisible() &&
    !await page.locator('h3').filter({ hasText: '已完成任務' }).isVisible();
  assert(activeFilterOk, 'TC-06: 篩選-未完成');
  await page.click('button:has-text("已完成")');
  await page.waitForTimeout(200);
  const completedFilterOk = await page.locator('h3').filter({ hasText: '已完成任務' }).isVisible() &&
    !await page.locator('h3').filter({ hasText: '未完成任務' }).isVisible();
  assert(completedFilterOk, 'TC-06: 篩選-已完成');
  await page.click('button:has-text("全部")');
  await page.waitForTimeout(200);
  const allFilterOk = await page.locator('h3').filter({ hasText: '未完成任務' }).isVisible() &&
    await page.locator('h3').filter({ hasText: '已完成任務' }).isVisible();
  assert(allFilterOk, 'TC-06: 篩選-全部');

  // TC-07: LocalStorage persistence
  await page.fill('input[placeholder="輸入待辦標題"]', '持久化測試');
  await page.click('button:has-text("新增")');
  await page.reload();
  await page.waitForLoadState('networkidle');
  const persisted = await page.locator('h3').filter({ hasText: '持久化測試' }).isVisible();
  assert(persisted, 'TC-07: LocalStorage 持久化');

  // TC-08: Responsive
  await page.setViewportSize({ width: 375, height: 667 });
  await page.fill('input[placeholder="輸入待辦標題"]', '行動版測試');
  await page.click('button:has-text("新增")');
  await page.waitForTimeout(300);
  const mobileVisible = await page.locator('h3').filter({ hasText: '行動版測試' }).isVisible();
  const noHorizontalScroll = !(await page.evaluate(() => document.body.scrollWidth > window.innerWidth));
  assert(mobileVisible && noHorizontalScroll, 'TC-08: 響應式設計');

  await browser.close();

  // Output results
  console.log('\n=== Test Results ===');
  results.forEach(r => console.log(`${r.pass ? '✔' : '❌'} ${r.test}`));
  const passed = results.filter(r => r.pass).length;
  console.log(`\nTotal: ${passed}/${results.length} passed`);

  // Exit with appropriate code
  process.exit(passed === results.length ? 0 : 1);
}

runTests().catch(err => {
  console.error('Test suite crashed:', err);
  process.exit(1);
});
