// Builds and serves synthetic content, verifies consent-feed rendering/deletion,
// and restores a normal prelaunch build even if an assertion fails.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import net from 'node:net';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';

process.chdir(path.resolve(import.meta.dirname, '..'));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-system-'));
const feed = path.join(temp, 'feed.csv');
const header = 'number,tier,display_name,institution,grad_year\n';
const withdrawn = 'WITHDRAWN_SYSTEM_CANARY';
const retained = 'RETAINED_SYSTEM_CANARY';
const env = {
  ...process.env,
  AMS_MONTHLY_DIR: 'tests/fixtures/monthly',
  AMS_MONTHLY_ALLOW_UNRELEASED: '1',
  AMS_BUILD_NOW: '2026-02-15T12:00:00+05:30',
  VERCEL_ENV: 'production',
  MONTHLY_SOLVERS_FEED_URL: 'https://docs.google.com/spreadsheets/d/e/AMS_SYSTEM_TEST/pub?output=csv',
  AMS_TEST_FEED_FILE: feed,
  NODE_OPTIONS: `--import ${path.resolve('tests/support/mock-monthly-feed.mjs')}`,
  NEXT_TELEMETRY_DISABLED: '1',
};
let server;
function build(label, buildEnv) {
  const result = spawnSync(process.execPath, ['scripts/fetch-monthly-solvers.mjs', '--build'], {
    env: buildEnv, encoding: 'utf8', timeout: 180_000,
  });
  fs.writeFileSync(path.join(temp, `${label}.log`), (result.stdout ?? '') + (result.stderr ?? ''));
  assert.equal(result.status, 0, `${label}: ${(result.stdout + result.stderr).slice(-2500)}`);
  console.log(`PASS ${label}`);
}
async function stop() {
  if (!server) return;
  const child = server; server = null;
  const exited = once(child, 'exit'); child.kill('SIGTERM'); await exited;
}
async function serve() {
  const reservation = net.createServer(); reservation.listen(0, '127.0.0.1');
  await once(reservation, 'listening'); const port = reservation.address().port;
  await new Promise(resolve => reservation.close(resolve));
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', String(port)], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  let log = ''; server.stdout.on('data', chunk => { log += chunk; }); server.stderr.on('data', chunk => { log += chunk; });
  for (let i = 0; i < 100; i += 1) {
    if (log.includes('Ready in')) return `http://127.0.0.1:${port}`;
    if (server.exitCode !== null) throw new Error(log);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Server did not start: ${log}`);
}
try {
  fs.writeFileSync(feed, header + `1,main,${withdrawn},Test Institute,2027\n1,warmup,${retained},Other Institute,2028\n1,main,<script>alert(1)</script>,Safe Institute,2027\n2,main,FUTURE_SOLVER_CANARY,Hidden Institute,2027\n`);
  build('production with synthetic approved feed', env);
  let base = await serve();
  const html = await (await fetch(`${base}/monthly/1/solution`)).text();
  assert.ok(html.includes(withdrawn) && html.includes(retained));
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
  assert.ok(!html.includes('<script>alert(1)</script>'));
  const open = await (await fetch(`${base}/monthly/2`)).text();
  assert.equal((open.match(/href="https:\/\/docs.google.com\/forms/g) ?? []).length, 2);
  const index = await (await fetch(`${base}/monthly`)).text();
  assert.ok(!index.includes('FUTURE_SOLVER_CANARY'));
  for (const route of ['/monthly/3', '/monthly/2/solution', '/monthly/999']) {
    assert.equal((await fetch(base + route)).status, 404, route);
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  assert.ok(sitemap.includes('/monthly/1/solution'));
  assert.ok(!sitemap.includes('/monthly/2/solution') && !sitemap.includes('/monthly/3'));
  const responses = await Promise.all(Array.from({ length: 40 }, (_, i) => fetch(`${base}${i % 2 ? '/monthly/2' : '/monthly/1/solution'}`)));
  assert.ok(responses.every(response => response.status === 200));
  await Promise.all(responses.map(response => response.arrayBuffer()));
  console.log('PASS released routes, open forms, escaped names, sitemap, 404s and 40 concurrent requests');
  if (process.env.AMS_TEST_BROWSER === '1') {
    const browser = spawnSync(process.execPath, ['tests/monthly-browser.mjs', base], {
      env: process.env, encoding: 'utf8', timeout: 180_000,
    });
    console.log(browser.stdout);
    assert.equal(browser.status, 0, browser.stderr);
  }
  await stop();

  fs.writeFileSync(feed, header + `1,warmup,${retained},Other Institute,2028\n`);
  build('withdrawal and exact-deadline rebuild', { ...env, AMS_BUILD_NOW: '2026-02-28T23:59:00+05:30' });
  base = await serve();
  const after = await (await fetch(`${base}/monthly/1/solution`)).text();
  assert.ok(!after.includes(withdrawn) && after.includes(retained));
  const closed = await (await fetch(`${base}/monthly/2`)).text();
  assert.ok(!closed.includes('href="https://docs.google.com/forms'));
  assert.ok(closed.includes('Answers for this problem are closed.'));
  for (const entry of fs.readdirSync('.next/server/app', { recursive: true })) {
    const file = path.join('.next/server/app', entry);
    if (fs.statSync(file).isFile()) assert.ok(!fs.readFileSync(file, 'utf8').includes(withdrawn), `Withdrawn row remains in ${file}`);
  }
  console.log('PASS withdrawal removed from rendered output and forms close at exact deadline');
  await stop();

  const bypass = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
    env: { ...env, AMS_PREPARED_BUILD: '' }, encoding: 'utf8', timeout: 30_000,
  });
  assert.notEqual(bypass.status, 0);
  assert.match(bypass.stdout + bypass.stderr, /Run pnpm build/);
  const missingFeed = spawnSync(process.execPath, ['scripts/fetch-monthly-solvers.mjs', '--build'], {
    env: { ...env, MONTHLY_SOLVERS_FEED_URL: '' }, encoding: 'utf8', timeout: 180_000,
  });
  assert.notEqual(missingFeed.status, 0);
  assert.match(missingFeed.stdout + missingFeed.stderr, /MONTHLY_SOLVERS_FEED_URL is required/);
  fs.writeFileSync(feed, 'number,tier,display_name,institution,grad_year,email\n');
  const privateColumn = spawnSync(process.execPath, ['scripts/fetch-monthly-solvers.mjs', '--build'], {
    env, encoding: 'utf8', timeout: 30_000,
  });
  assert.notEqual(privateColumn.status, 0);
  assert.match(privateColumn.stdout + privateColumn.stderr, /header must be exactly/);
  assert.equal(fs.existsSync('.generated/monthly-solvers.json'), false);
  console.log('PASS direct-build bypass, absent production feed and private-column feed all fail closed');
} finally {
  await stop();
  const normal = { ...process.env, MONTHLY_SOLVERS_FEED_URL: '', AMS_MONTHLY_DIR: '', AMS_MONTHLY_ALLOW_UNRELEASED: '', AMS_BUILD_NOW: '', AMS_PREPARED_BUILD: '', NODE_OPTIONS: '', VERCEL_ENV: 'preview' };
  build('restored normal build', normal);
  assert.equal(fs.existsSync('public/monthly-assets'), false);
  console.log(`System test logs: ${temp}`);
}
