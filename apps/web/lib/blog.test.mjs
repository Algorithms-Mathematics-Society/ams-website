import { test, beforeEach, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const cwd = process.cwd();
const image = fs.readFileSync('tests/fixtures/monthly/3/unreleased-canary-three.png');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ams-blog-'));
const app = path.join(root, 'apps/web');
const posts = path.join(root, 'blogs');
fs.mkdirSync(app, { recursive: true });
process.chdir(app);
const { getAllPosts } = await import('./blog.ts');
function write(extra = '', slug = 'test-post') {
  const folder = path.join(posts, slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'cover.png'), image);
  fs.writeFileSync(path.join(folder, 'index.md'), `---\ntitle: Test post\npubDate: "2026-01-01"\ndescription: A synthetic post\nauthor: Test author\nimage:\n  url: ./cover.png\n  alt: Test cover\n${extra}\n---\n\nA test post.`);
}
beforeEach(() => { fs.rmSync(posts, { recursive: true, force: true }); });
after(() => { process.chdir(cwd); fs.rmSync(root, { recursive: true, force: true }); });
test('existing AMS posts remain compatible without community fields', async () => {
  write(); const [post] = await getAllPosts();
  assert.equal(post.provenance.authorType, 'ams');
  assert.equal(post.provenance.explainerVerified, false);
});
test('valid reviewed community post retains all provenance', async () => {
  write('authorType: community\naiUse: editing\nexplainerVerified: true\nreviewedBy:\n  name: Reviewer\n  role: Engineer\nexplainerUrl: https://example.com/explainer');
  const [post] = await getAllPosts();
  assert.equal(post.provenance.aiUse, 'editing');
  assert.equal(post.provenance.reviewedBy.name, 'Reviewer');
  assert.equal(post.provenance.explainerVerified, true);
});
for (const [name, extra, error] of [
  ['missing AI disclosure', 'authorType: community', /aiUse/],
  ['substantial generation', 'authorType: community\naiUse: substantial', /substantial/],
  ['verified without review', 'explainerVerified: true', /reviewedBy/],
  ['string boolean', 'explainerVerified: "false"', /explainerVerified/],
  ['bad author type', 'authorType: anonymous', /authorType/],
  ['null reviewer', 'reviewedBy: null', /frontmatter.*reviewedBy/],
  ['invalid HTTPS URL', 'explainerUrl: https://', /explainerUrl/],
  ['invalid monthly number', 'monthly: -1', /monthly/],
]) {
  test(`post validation rejects ${name}`, async () => { write(extra); await assert.rejects(getAllPosts(), error); });
}
test('contribute cannot shadow the contributor guide', async () => {
  write('', 'contribute'); await assert.rejects(getAllPosts(), /reserved/);
});
