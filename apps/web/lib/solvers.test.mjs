import { test, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
const cwd = process.cwd();
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-solvers-'));
process.chdir(root);
const { getSolverList, assertFeedConfigured } = await import('./solvers.ts');
const folder = path.join(root, '.generated');
const file = path.join(folder, 'monthly-solvers.json');
beforeEach(() => { fs.rmSync(folder, { recursive: true, force: true }); fs.mkdirSync(folder); delete process.env.VERCEL_ENV; });
after(() => { process.chdir(cwd); fs.rmSync(root, { recursive: true, force: true }); });
test('unconfigured preview renders pending, production solution cannot omit feed', () => {
  assert.equal(getSolverList(1), null);
  assert.doesNotThrow(() => assertFeedConfigured(true));
  process.env.VERCEL_ENV = 'production';
  assert.doesNotThrow(() => assertFeedConfigured(false));
  assert.throws(() => assertFeedConfigured(true), /MONTHLY_SOLVERS_FEED_URL/);
});
test('configured empty feed is distinct from an absent feed', () => {
  fs.writeFileSync(file, '{}');
  process.env.VERCEL_ENV = 'production';
  assert.doesNotThrow(() => assertFeedConfigured(true));
  assert.deepEqual(getSolverList(1), { warmup: [], main: [] });
});
test('solver lookup selects only the requested problem', () => {
  const solver = { name: 'Synthetic Solver', institution: 'Test', year: '2027' };
  fs.writeFileSync(file, JSON.stringify({ 1: { main: [solver], warmup: [] }, 2: { main: [], warmup: [] } }));
  assert.deepEqual(getSolverList(1).main, [solver]);
  assert.deepEqual(getSolverList(2).main, []);
});
test('corrupted snapshot fails instead of silently publishing an empty list', () => {
  fs.writeFileSync(file, '{truncated');
  assert.throws(() => getSolverList(1), SyntaxError);
});
