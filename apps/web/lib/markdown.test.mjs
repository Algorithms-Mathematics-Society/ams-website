import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveLocalImage, compileMarkdown } from "./markdown.ts";

test("images cannot escape the content folder, including through symlinks", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ams-images-"));
  try {
    const source = path.join(root, "post");
    fs.mkdirSync(source);
    fs.writeFileSync(path.join(root, "private.png"), "private");
    fs.symlinkSync(path.join(root, "private.png"), path.join(source, "linked.png"));
    for (const ref of ["../private.png", "linked.png", "/tmp/private.png", "file:private.png"]) {
      assert.throws(() => resolveLocalImage(source, ref, "test"));
    }
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
test("images in separate subfolders with the same name do not overwrite each other", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "ams-images-"));
  try {
    const source = path.join(root, "post");
    for (const dir of ["a", "b"]) {
      fs.mkdirSync(path.join(source, dir), { recursive: true });
      fs.copyFileSync("tests/fixtures/monthly/3/unreleased-canary-three.png", path.join(source, dir, "plot.png"));
    }
    const html = await compileMarkdown("![A](a/plot.png)\n\n![B](b/plot.png)", {
      sourceDir: source, label: "test", publicDir: path.join(root, "out"), publicPrefix: "/images",
    });
    assert.match(html, /src="\/images\/inline\/a\/plot.png"/);
    assert.match(html, /src="\/images\/inline\/b\/plot.png"/);
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
});

test('Markdown cannot create executable links or raw script elements', async () => {
  const html = await compileMarkdown('[unsafe](javascript:alert%281%29)\n\n[safe](https://example.com)\n\n<script>alert(1)</script>', {
    sourceDir: process.cwd(), label: 'test', publicDir: '/unused', publicPrefix: '/unused',
  });
  assert.doesNotMatch(html, /href="javascript:|<script/i);
  assert.match(html, /href="https:\/\/example.com"/);
});
