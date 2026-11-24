import { test, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const originalCwd = process.cwd();
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-loader-'));
const content = path.join(root, 'monthly');
const fixture = fs.readFileSync('tests/fixtures/monthly/1/problem.md', 'utf8');
const solution = fs.readFileSync('tests/fixtures/monthly/1/solution.md', 'utf8');
process.chdir(root);
process.env.AMS_MONTHLY_DIR = content;
const { getReleasedProblems } = await import('./monthly.ts');
beforeEach(() => {
  fs.rmSync(content, { recursive: true, force: true });
  fs.rmSync(path.join(root, 'public'), { recursive: true, force: true });
  fs.mkdirSync(path.join(content, '1'), { recursive: true });
  fs.writeFileSync(path.join(content, '1/problem.md'), fixture);
  process.env.AMS_BUILD_NOW = '2026-01-15T00:00:00Z';
  delete process.env.AMS_MONTHLY_ALLOW_UNRELEASED;
});
after(() => { process.chdir(originalCwd); fs.rmSync(root, { recursive: true, force: true }); });
function write(text) { fs.writeFileSync(path.join(content, '1/problem.md'), text); }

test('before release fails; preflight skips without creating any public output', async () => {
  process.env.AMS_BUILD_NOW = '2026-01-01T12:29:59.999Z';
  await assert.rejects(getReleasedProblems(), /is not due until/);
  process.env.AMS_MONTHLY_ALLOW_UNRELEASED = '1';
  assert.deepEqual(await getReleasedProblems(), []);
  assert.equal(fs.existsSync(path.join(root, 'public')), false);
});
test('at release publishes both tiers and a correctly sized social card', async () => {
  process.env.AMS_BUILD_NOW = '2026-01-01T12:30:00Z';
  const [problem] = await getReleasedProblems();
  assert.match(problem.tierHtml.warmup, /Warm-up text/);
  assert.match(problem.tierHtml.main, /Main text/);
  assert.equal(problem.solution, null);
  const meta = await sharp(path.join(root, 'public/monthly-assets/1/problem.png')).metadata();
  assert.equal(meta.width, 1200); assert.equal(meta.height, 630);
});
test('future solution fails even when its problem is already released', async () => {
  fs.writeFileSync(path.join(content, '1/solution.md'), solution);
  await assert.rejects(getReleasedProblems(), /solution.md is not due until/);
  process.env.AMS_MONTHLY_ALLOW_UNRELEASED = '1';
  assert.equal((await getReleasedProblems())[0].solution, null);
  assert.equal(fs.existsSync(path.join(root, 'public/monthly-assets/1/solution.png')), false);
});
test('solution publishes at its exact release instant', async () => {
  fs.writeFileSync(path.join(content, '1/solution.md'), solution);
  process.env.AMS_BUILD_NOW = '2026-02-01T12:30:00Z';
  assert.ok((await getReleasedProblems())[0].solution);
});
test('Windows line endings and a first-line Warm-up heading work', async () => {
  write(fixture.replace('\nShared setup for fixture one.\n', '').replaceAll('\n', '\r\n'));
  assert.match((await getReleasedProblems())[0].tierHtml.main, /Main text/);
});
test('empty tiers fail instead of publishing an empty question', async () => {
  write(fixture.replace('Warm-up text RELEASEDCANARYALPHA.', ''));
  await assert.rejects(getReleasedProblems(), /Warm-up|warmup/);
});
test('heading-like content inside fenced code is not a tier boundary', async () => {
  write(fixture.replace('Shared setup for fixture one.', '```md\n## Warm-up\nFake section\n## Main\n```'));
  const [problem] = await getReleasedProblems();
  assert.match(problem.introHtml, /Fake section/);
  assert.match(problem.tierHtml.warmup, /Warm-up text/);
});
for (const [name, edit, error] of [
  ['number mismatch', s => s.replace('number: 1', 'number: 2'), /match the folder/],
  ['deadline before release', s => s.replace('2026-01-31T23:59:00+05:30', '2025-12-31T23:59:00+05:30'), /deadline/],
  ['invalid track', s => s.replace('track: quant', 'track: invalid'), /track/],
  ['non-Google form', s => s.replaceAll('docs.google.com', 'example.com'), /formUrls/],
  ['edit-mode form', s => s.replaceAll('/viewform', '/edit'), /formUrls/],
]) {
  test(`invalid problem fails: ${name}`, async () => { write(edit(fixture)); await assert.rejects(getReleasedProblems(), error); });
}
test('released numbers cannot have gaps', async () => {
  fs.renameSync(path.join(content, '1'), path.join(content, '2'));
  fs.writeFileSync(path.join(content, '2/problem.md'), fixture.replace('number: 1', 'number: 2'));
  await assert.rejects(getReleasedProblems(), /no gaps/);
});

test('unquoted YAML timestamps cannot bypass impossible-date validation', async () => {
  write(fixture.replace('"2026-01-01T18:00:00+05:30"', '2026-02-30T18:00:00+05:30'));
  await assert.rejects(getReleasedProblems(), /quoted ISO date/);
});
test('duplicate tier headings fail instead of hiding a question', async () => {
  write(fixture + '\n## Main\nDuplicate question');
  await assert.rejects(getReleasedProblems(), /exactly one/);
});
test('malformed Google Form URL fails with its field name', async () => {
  write(fixture.replaceAll('https://docs.google.com/forms/d/e/FIXTURE1W/viewform', 'not-a-url'));
  await assert.rejects(getReleasedProblems(), /formUrls.warmup/);
});
test('two numeric aliases cannot publish duplicate problem numbers', async () => {
  fs.mkdirSync(path.join(content, '01'));
  fs.writeFileSync(path.join(content, '01/problem.md'), fixture);
  await assert.rejects(getReleasedProblems(), /two folders/);
});
test('non-numeric problem folders fail with an actionable error', async () => {
  fs.mkdirSync(path.join(content, 'topic-name'));
  await assert.rejects(getReleasedProblems(), /folder names must be problem numbers/);
});
