// Optional browser tooling is supplied externally; it is not shipped with the site.
// Run against check-monthly-system's populated synthetic build via AMS_TEST_BROWSER=1.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : 'playwright');
const base = process.argv[2];
assert.ok(base?.startsWith('http://127.0.0.1:'), 'Use a local synthetic test server');
const artifacts = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-browser-'));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true, args: ['--no-sandbox'] });
const routes = ['/monthly', '/monthly/1', '/monthly/2', '/monthly/1/solution', '/blog/contribute', '/blog/expected-value-vs-most-likely-outcome'];
const errors = [];
let checks = 0;
try {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      assert.equal((await page.goto(base + route)).status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      const sizes = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.ok(sizes.scroll <= sizes.width, `${route} overflows at ${width}px: ${JSON.stringify(sizes)}`);
      if (width === 320 && process.env.AXE_SCRIPT) {
        await page.addScriptTag({ path: process.env.AXE_SCRIPT });
        const result = await page.evaluate(async () => {
          const result = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } });
          return result.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => n.target) }));
        });
        assert.deepEqual(result, [], `${route}: accessibility violations`);
      }
      checks += 1;
    }
  }
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(base + '/monthly/1/solution');
  assert.ok((await page.locator('table tbody tr').count()) >= 3, 'Exercise populated solver tables');
  assert.equal(await page.locator('table script').count(), 0);
  await page.screenshot({ path: path.join(artifacts, 'solution-320.png'), fullPage: true });
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), '200% text resizing causes horizontal overflow');
  await page.goto(base + '/monthly/2');
  const submits = page.locator('a[href^="https://docs.google.com/forms/"]');
  assert.equal(await submits.count(), 2);
  for (const link of await submits.all()) {
    assert.equal(await link.getAttribute('target'), '_blank');
    assert.match(await link.getAttribute('rel'), /noopener/);
    const box = await link.boundingBox(); assert.ok(box.height >= 44 && box.width >= 44);
  }
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.focus(); await page.keyboard.press('Enter');
  await page.getByRole('dialog').waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'hidden' });
  await page.waitForFunction(() => document.querySelector('button[aria-label="Open menu"]')?.getAttribute('aria-expanded') === 'false');
  assert.equal(await menu.getAttribute('aria-expanded'), 'false');
  await page.goto(base + '/monthly');
  await page.locator('main a[href="/monthly/2"]').first().click();
  await page.waitForURL(base + '/monthly/2');
  assert.match(await page.locator('h1').innerText(), /RELEASEDCANARYBETA/);
  assert.deepEqual(errors, [], 'Browser runtime errors');

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 900 } });
  const plain = await noJs.newPage();
  for (const route of routes) {
    assert.equal((await plain.goto(base + route)).status(), 200);
    assert.ok(await plain.locator('h1').isVisible(), `Content hidden without JS: ${route}`);
  }
  await plain.goto(base + '/monthly/2');
  assert.equal(await plain.locator('a[href^="https://docs.google.com/forms/"]').count(), 2);
  console.log(`PASS ${checks} responsive checks, accessibility scans, populated tables, 200% text, keyboard navigation, links and six no-JS routes. Artifacts: ${artifacts}`);
} finally { await browser.close(); }
