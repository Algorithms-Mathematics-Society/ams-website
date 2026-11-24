import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { createMonthlyCard } from './monthly-card.ts';

const cwd = process.cwd();
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-cards-'));
process.chdir(root);
after(() => { process.chdir(cwd); fs.rmSync(root, { recursive: true, force: true }); });
test('long unbroken titles stay inside the social-card margins', async () => {
  await createMonthlyCard(1, 'W'.repeat(150), new Date('2027-01-01T12:30:00Z'));
  const image = sharp(path.join(root, 'public/monthly-assets/1/problem.png'));
  const pixels = await image.extract({ left: 1140, top: 140, width: 60, height: 300 }).removeAlpha().raw().toBuffer();
  for (let i = 0; i < pixels.length; i += 3) {
    assert.deepEqual([...pixels.subarray(i, i + 3)], [250, 249, 246], 'Title text was clipped at the right edge');
  }
});
test('XML-special and Unicode titles produce valid 1200x630 PNGs', async () => {
  await createMonthlyCard(2, 'A < B & "quotes" · नमस्ते', new Date('2027-01-01T12:30:00Z'), true);
  const meta = await sharp(path.join(root, 'public/monthly-assets/2/solution.png')).metadata();
  assert.equal(meta.width, 1200); assert.equal(meta.height, 630); assert.equal(meta.format, 'png');
});
test('concurrent rendering leaves complete cards and no temporary files', async () => {
  await Promise.all(Array.from({ length: 8 }, () => createMonthlyCard(3, 'Concurrent card', new Date('2027-01-01T12:30:00Z'))));
  const folder = path.join(root, 'public/monthly-assets/3');
  assert.deepEqual(fs.readdirSync(folder), ['problem.png']);
  assert.equal((await sharp(path.join(folder, 'problem.png')).metadata()).width, 1200);
});
