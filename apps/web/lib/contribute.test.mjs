import { test } from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { CONTRIBUTE } from '../content/contribute.ts';
import { parseIsoInstant } from './monthly-release.ts';

test('the real contributor opening date is an ISO instant with an explicit offset', () => {
  assert.ok(parseIsoInstant(CONTRIBUTE.status.opensAt), 'Invalid CONTRIBUTE.status.opensAt');
});

test('contributor content rejects invalid opening dates even without a Form link', async () => {
  const root = mkdtempSync(join(tmpdir(), 'ams-contribute-'));
  try {
    mkdirSync(join(root, 'content'));
    mkdirSync(join(root, 'lib'));
    copyFileSync(new URL('./monthly-release.ts', import.meta.url), join(root, 'lib/monthly-release.ts'));
    const source = readFileSync(new URL('../content/contribute.ts', import.meta.url), 'utf8');
    const configured = `opensAt: ${JSON.stringify(CONTRIBUTE.status.opensAt)}`;
    assert.ok(source.includes(configured), 'Fixture must replace the real content value');
    const cases = ['2027-02-30T18:00:00+05:30', '2027-01-01T18:00:00', 'not a date'];
    for (const [index, value] of cases.entries()) {
      const file = join(root, 'content', `invalid-${index}.ts`);
      writeFileSync(file, source.replace(configured, `opensAt: ${JSON.stringify(value)}`));
      await assert.rejects(import(pathToFileURL(file).href), /CONTRIBUTE\.status\.opensAt must be a valid ISO instant with an explicit offset/);
    }
    const file = join(root, 'content', 'valid.ts');
    writeFileSync(file, source.replace(configured, 'opensAt: "2027-01-01T12:30:00Z"'));
    const { CONTRIBUTE: valid } = await import(pathToFileURL(file).href);
    assert.equal(valid.status.opensAt, '2027-01-01T12:30:00Z');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
