# Photo-First Home + Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the Derive '26 finals photos descriptively, generate budgeted WebP assets, and land them in the home page hero, stats band, and the 12-slot gallery.

**Architecture:** Originals stay in `media/photos/` (local-only, gitignored). A committed `scripts/optimize-photos.mjs` (sharp) emits slugged WebP into `apps/web/public/images/derive26/{hero,thumb,full}/`. `content/gallery.ts` gains real `src`/`full` paths; `Hero`, `StatsBand`, `GalleryGrid` swap placeholders for `next/image` per the comments already in those files. Spec: `docs/superpowers/specs/2026-07-13-photo-first-home-design.md`.

**Tech Stack:** Next.js App Router (static output), next/image, sharp (already in apps/web deps), Tailwind.

## Global Constraints

- Repo `/home/user/ams-main` ($R). Feature branch `feat/photo-first-home`. Never `git add -A`; explicit paths; fetch+rebase before push.
- DO NOT touch `apps/web/content/derive.ts`, `apps/web/components/sections/derive/DerivePartners.tsx`, `CLAUDE.md` (uncommitted parallel work).
- No em dashes in any produced text. Photo file names use " - " (space hyphen space), never an em dash.
- Camera originals never enter `public/` or git history: Task 1 adds `/media/photos/` to `.gitignore` BEFORE any commit (245 MB of originals are currently untracked; committing them would bloat the repo forever).
- Budgets (ENGINEERING_GUIDE.md section 5): hero file <= 200 KB, thumb <= 120 KB, full <= 450 KB; site LCP <= 2.0 s, CLS < 0.05, Lighthouse perf >= 95.
- Spec deviation, resolved: the Hero is a split layout with a designed photo figure (its comment marks the LCP slot); the photo goes there with `priority`, no full-bleed overlay needed since text never sits on the photo. StatsBand keeps its overlay treatment.
- Every task ends with `pnpm build` (run in $R, needs network for fonts) exiting 0 before its commit. Commits end with: Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
- The PostToolUse prettier hook is FINE for this repo's .ts/.tsx (repo uses prettier defaults); Write/Edit tools are allowed here, unlike the amsderive work.

---

### Task 1: Dedupe + rename originals, gitignore them

**Files:**

- Modify: `$R/.gitignore` (add one line)
- Rename/delete: files in `$R/media/photos/` (untracked; plain `mv`/`rm`)

**Interfaces:**

- Produces: exactly 26 files in `media/photos/` named per the manifest below; Task 2's script maps these exact names to slugs.

- [ ] **Step 1: Verify the duplicate claims byte-for-byte, delete only on identity**

```bash
cd /home/user/ams-main/media/photos
cmp "AMSD_009.jpg" "AMAR0764.jpg" && rm "AMSD_009.jpg" && echo "AMSD_009 deleted"
cmp "AMSD_005.jpg" "Derive - Goodies Distribution.jpg" && rm "AMSD_005.jpg" && echo "AMSD_005 deleted" \
  || { echo "NOT identical: keep both"; mv "AMSD_005.jpg" "AMS Derive - Goodies Distribution II.jpg"; }
```

If a `cmp` reports a difference for AMSD_009, STOP and report (the byte-duplicate claim came from matching sizes and controller inspection; a mismatch means re-inspect, not delete).

- [ ] **Step 2: Rename per manifest (script with existence asserts)**

```bash
cd /home/user/ams-main/media/photos
declare -A M=(
  ["AMAR0762.jpg"]="AMS Derive - In the Zone.jpg"
  ["AMAR0763.jpg"]="AMS Derive - Debating the Problem Set.jpg"
  ["AMAR0764.jpg"]="AMS Derive - Debating the Problem Set II.jpg"
  ["AMAR0765.jpg"]="AMS Derive - Huddle at the MacBook.jpg"
  ["AMAR0766.jpg"]="AMS Derive - Talking with the Professor.jpg"
  ["AMAR0767.jpg"]="AMS Derive - Reviewing a Solution.jpg"
  ["AMAR0768.jpg"]="AMS Derive - Reading the Scorecard.jpg"
  ["AMAR0769.jpg"]="AMS Derive - Finalists at the Convergence Banner.jpg"
  ["AMAR0770.jpg"]="AMS Derive - Finalists at the Convergence Banner II.jpg"
  ["AMAR0772.jpg"]="AMS Derive - Address Before the Final Round.jpg"
  ["AMSD_004.jpg"]="AMS Derive - Swag Desk.jpg"
  ["Derive - Goodies Distribution.jpg"]="AMS Derive - Goodies Distribution.jpg"
  ["AMSD_006.png"]="AMS Derive - The Hall at Capacity.png"
  ["AMSD_007.png"]="AMS Derive - Contest in Progress.png"
  ["AMSD_008.jpg"]="AMS Derive - Deep Focus.jpg"
  ["AMSD_010.png"]="AMS Derive - The Evening Social.png"
  ["AMSD_011.jpeg"]="AMS Derive - Card Games at the Social.jpeg"
  ["AMSD_012.jpg"]="AMS Derive - The AMS Deck.jpg"
  ["AMSD_013.png"]="AMS Derive - Blitz Chess Huddle.png"
  ["AMSD_014.jpg"]="AMS Derive - The Chess Crowd.jpg"
  ["AMSD_015.jpg"]="AMS Derive - Blitz on the Phone.jpg"
  ["AMSD_016.jpg"]="AMS Derive - Interview Day Briefing.jpg"
  ["AMSD_017.jpg"]="AMS Derive - Finalists Meet the Interviewers.jpg"
  ["AMSD_018.png"]="AMS Derive - Prize Cheque Moment.png"
  ["AMSD_019.png"]="AMS Derive - Thank You Jane Street (Graphic).png"
  ["AMSD_020.png"]="AMS Derive - The Full Room.png"
)
for old in "${!M[@]}"; do
  [ -f "$old" ] && mv -n "$old" "${M[$old]}" || echo "skip (already handled): $old"
done
ls | wc -l   # expect 26 (or 27 if the Goodies pair was not identical)
ls
```

Every remaining file must start with "AMS Derive - ". If the count is not 26 (27 in the non-identical case), reconcile before proceeding.

- [ ] **Step 3: Gitignore the originals, commit only .gitignore**

Append to `$R/.gitignore`:

```
# Camera originals (local source of truth; optimized copies live in apps/web/public/images)
/media/photos/
```

```bash
cd /home/user/ams-main && git status --short | grep "media/photos" | head -3   # expect: nothing (ignored)
git add .gitignore && git commit -m "Keep camera originals out of the repo

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Optimization script + generated assets

**Files:**

- Create: `$R/scripts/optimize-photos.mjs`
- Create (generated): `$R/apps/web/public/images/derive26/{hero,thumb,full}/*.webp`

**Interfaces:**

- Produces: slugs = new file name minus the "AMS Derive - " prefix and extension, lowercased, non-alphanumerics collapsed to `-` (e.g. "AMS Derive - The Hall at Capacity.png" -> `the-hall-at-capacity`). Site paths used by Tasks 3-5: `/images/derive26/hero/<slug>.webp`, `/images/derive26/thumb/<slug>.webp`, `/images/derive26/full/<slug>.webp`.

- [ ] **Step 1: Write `scripts/optimize-photos.mjs`**

```js
// Generates budgeted WebP variants from media/photos into apps/web/public/images/derive26.
// Usage: node scripts/optimize-photos.mjs
// Idempotent: skips outputs newer than their source. Fails loudly on budget breach.
import { createRequire } from "module";
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import path from "path";

const require = createRequire(import.meta.url);
const sharp = require(path.resolve("apps/web/node_modules/sharp"));

const SRC = "media/photos";
const OUT = "apps/web/public/images/derive26";
const PREFIX = "AMS Derive - ";

// slug -> variants to build. hero/full/thumb widths and byte budgets per the spec.
const VARIANTS = [
  { dir: "hero", width: 1920, quality: 62, budget: 200 * 1024 },
  { dir: "full", width: 1600, quality: 70, budget: 450 * 1024 },
  { dir: "thumb", width: 640, quality: 72, budget: 120 * 1024 },
];

// Only these slugs are required by the site (hero, stats backdrop, 12 gallery picks).
// Others are generated too when budgets hold, but a budget breach on a non-required
// slug downgrades to a warning instead of a failure.
const REQUIRED = new Set([
  "the-hall-at-capacity",
  "contest-in-progress",
  "goodies-distribution",
  "swag-desk",
  "in-the-zone",
  "debating-the-problem-set",
  "finalists-meet-the-interviewers",
  "prize-cheque-moment",
  "address-before-the-final-round",
  "blitz-chess-huddle",
  "the-evening-social",
  "the-ams-deck",
  "finalists-at-the-convergence-banner",
  "the-full-room",
]);

const slugify = (name) =>
  name
    .replace(PREFIX, "")
    .replace(/\.[a-z]+$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

let failures = 0;
for (const v of VARIANTS) mkdirSync(path.join(OUT, v.dir), { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f));
for (const f of files) {
  const slug = slugify(f);
  const srcPath = path.join(SRC, f);
  const srcM = statSync(srcPath).mtimeMs;
  for (const v of VARIANTS) {
    const outPath = path.join(OUT, v.dir, `${slug}.webp`);
    if (existsSync(outPath) && statSync(outPath).mtimeMs > srcM) continue;
    await sharp(srcPath)
      .rotate()
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality })
      .toFile(outPath);
    const kb = statSync(outPath).size / 1024;
    const over = statSync(outPath).size > v.budget;
    const req = REQUIRED.has(slug);
    console.log(
      `${over ? (req ? "FAIL" : "warn") : " ok "} ${v.dir}/${slug}.webp ${kb.toFixed(0)} KB`,
    );
    if (over && req) failures++;
  }
}
if (failures) {
  console.error(
    `${failures} required output(s) over budget; lower quality for those and rerun.`,
  );
  process.exit(1);
}
console.log("all budgets hold");
```

- [ ] **Step 2: Run it; fix any FAIL by lowering that variant's quality**

```bash
cd /home/user/ams-main && node scripts/optimize-photos.mjs
```

Expected: per-file size report ending `all budgets hold`. If a REQUIRED hero/full breaches budget, reduce the `quality` for that variant (or add a per-slug quality override map) until it passes; do not raise budgets.

- [ ] **Step 3: Sanity + commit script and generated images**

```bash
cd /home/user/ams-main
ls apps/web/public/images/derive26/thumb | wc -l    # expect ~26
du -sh apps/web/public/images/derive26               # expect low single-digit MB
pnpm build
git add scripts/optimize-photos.mjs apps/web/public/images/derive26
git commit -m "Generate budgeted WebP variants of the Derive 26 shoot

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: gallery.ts content

**Files:**

- Modify: `$R/apps/web/content/gallery.ts` (replace whole file)

**Interfaces:**

- Produces: `GalleryItem { label: string; src?: string; full?: string }`; `GALLERY: GalleryItem[]` of exactly 12 items, in the order below. Task 5 renders `src` (thumb) and links to `full`.

- [ ] **Step 1: Replace the file content with:**

```ts
export interface GalleryItem {
  /** Image alt text. */
  label: string;
  /** 640w thumbnail path under public/. */
  src?: string;
  /** 1600w large view path under public/ (opened from the grid). */
  full?: string;
}

export const GALLERY_PAGE = {
  eyebrow: "Moments from AMS",
  title: "It happened. Here's proof.",
  body: "Twelve moments from Derive '26: the swag desk in the morning, the hall at capacity, the cheques at the end. Shot during Convergence at IIT Bombay, July 2026.",
  cta: {
    title: "Be in the next set.",
    body: "The next edition will fill a hall again. Compete, volunteer, or just be in the room.",
    buttonLabel: "Explore Derive",
    buttonHref: "/derive",
  },
} as const;

const img = (slug: string) => ({
  src: `/images/derive26/thumb/${slug}.webp`,
  full: `/images/derive26/full/${slug}.webp`,
});

export const GALLERY: GalleryItem[] = [
  {
    label: "Goodies distribution, contest kits changing hands",
    ...img("goodies-distribution"),
  },
  { label: "The swag desk, notebooks and formula tees", ...img("swag-desk") },
  { label: "A contestant deep in the problem set", ...img("in-the-zone") },
  {
    label: "Debating the problem set between rounds",
    ...img("debating-the-problem-set"),
  },
  {
    label: "Finalists meet the partner interviewers",
    ...img("finalists-meet-the-interviewers"),
  },
  {
    label: "Prize cheques on stage for the winners",
    ...img("prize-cheque-moment"),
  },
  {
    label: "The address before the final round",
    ...img("address-before-the-final-round"),
  },
  {
    label: "Blitz chess huddle at the evening social",
    ...img("blitz-chess-huddle"),
  },
  { label: "The evening social from above", ...img("the-evening-social") },
  { label: "The AMS deck, custom cards in play", ...img("the-ams-deck") },
  {
    label: "Finalists at the Convergence banner",
    ...img("finalists-at-the-convergence-banner"),
  },
  {
    label: "The full room, everyone who made it happen",
    ...img("the-full-room"),
  },
];
```

- [ ] **Step 2: Build + commit**

```bash
cd /home/user/ams-main && pnpm build
git add apps/web/content/gallery.ts
git commit -m "Fill the gallery slots with the Convergence shoot

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Hero + StatsBand photos

**Files:**

- Modify: `$R/apps/web/components/sections/Hero.tsx` (figure block only)
- Modify: `$R/apps/web/components/sections/StatsBand.tsx` (whole component body)

**Interfaces:**

- Consumes: `/images/derive26/hero/the-hall-at-capacity.webp`, `/images/derive26/hero/contest-in-progress.webp` (Task 2).

- [ ] **Step 1: Hero figure swaps the placeholder for the real LCP image.** Replace the `<figure>` block (currently a `PhotoPlaceholder` with the "LCP slot" comment) with:

```tsx
<figure className="rise-3 rise">
  {/* LCP element: preloaded, nothing above it may render late. */}
  <div className="relative aspect-[13/11] overflow-hidden rounded-lg">
    <Image
      src="/images/derive26/hero/the-hall-at-capacity.webp"
      alt="The Derive '26 finals hall at capacity, contestants at their laptops"
      fill
      priority
      sizes="(min-width: 1024px) 44vw, 92vw"
      className="object-cover"
    />
  </div>
  <figcaption className="mt-3 text-sm text-ink/80">
    Derive &apos;26 finals · IIT Bombay · July 2026
  </figcaption>
</figure>
```

Add `import Image from "next/image";` and remove the now-unused `PhotoPlaceholder` import (only if no other use remains in the file).

- [ ] **Step 2: StatsBand gains the darkened backdrop per its own comment.** Replace the component with:

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { STATS } from "@/content/stats";

/**
 * Dark full-width band backed by a wide contest photo under a heavy
 * overlay; band height unchanged from the pre-photo version.
 */
export function StatsBand() {
  return (
    <section className="relative bg-espresso py-20 text-cream-light lg:py-28">
      <Image
        src="/images/derive26/hero/contest-in-progress.webp"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-100"
      />
      <div className="absolute inset-0 bg-espresso/85" aria-hidden />
      <Container className="relative">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 80}>
              <dd className="font-display text-stat">{stat.value}</dd>
              <div className="mt-3 h-0.5 w-9 bg-gold" aria-hidden />
              <dt className="mt-3 text-sm text-cream-light/85">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
```

(Decorative backdrop: empty alt + aria-hidden; NOT priority; the 85% espresso overlay keeps the existing text contrast. If `Container` does not accept `className`, wrap the `Container` in `<div className="relative">` instead.)

- [ ] **Step 3: Build, visual check, commit**

```bash
cd /home/user/ams-main && pnpm build
cd apps/web && npx next dev -p 4100 &  # then load http://localhost:4100/ and confirm: hero photo renders in the figure, stats numbers legible on the darkened photo
```

Kill the dev server after checking. Commit:

```bash
git add apps/web/components/sections/Hero.tsx apps/web/components/sections/StatsBand.tsx
git commit -m "Photo hero and stats backdrop from the finals shoot

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: GalleryGrid renders real images

**Files:**

- Modify: `$R/apps/web/components/sections/GalleryGrid.tsx`

**Interfaces:**

- Consumes: `GALLERY` items with `src`/`full` (Task 3).

- [ ] **Step 1: Replace the placeholder cell with an image cell that links to the full view.** Replace the `items.map` body's inner block so each cell renders:

```tsx
<li key={item.label}>
  {/* Stagger by column so each row reads as one left-to-right sweep. */}
  <Reveal delay={(index % 4) * 70}>
    {item.src ? (
      <a
        href={item.full ?? item.src}
        target="_blank"
        rel="noreferrer"
        className="group block"
      >
        <span className="relative block aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={item.src}
            alt={item.label}
            fill
            sizes="(min-width: 1024px) 24vw, 46vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </span>
      </a>
    ) : (
      <PhotoPlaceholder
        label={`Photo · ${item.label}`}
        aspect="aspect-[4/3]"
        rounded="rounded-lg"
        className="p-3"
      />
    )}
  </Reveal>
</li>
```

Add `import Image from "next/image";` at the top; keep the `PhotoPlaceholder` import (fallback branch uses it).

- [ ] **Step 2: Build, check both consumers, commit**

```bash
cd /home/user/ams-main && pnpm build
# dev server: home page gallery section shows 12 photos lazily loading; /gallery shows the same 12 full-width grid; clicking opens the 1600w file
git add apps/web/components/sections/GalleryGrid.tsx
git commit -m "Render the Convergence shoot in the gallery grid

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Acceptance pass

**Files:** none (evidence in scratchpad).

- [ ] **Step 1: Production build + start**

```bash
cd /home/user/ams-main && pnpm build && (cd apps/web && npx next start -p 4200 &)
```

- [ ] **Step 2: Lighthouse (mobile) against http://localhost:4200/**: use the chrome-devtools MCP `lighthouse_audit` tool (or `npx lighthouse http://localhost:4200 --preset=perf --form-factor=mobile --screenEmulation.mobile --quiet --output=json`). Record LCP, CLS, performance score. Gates: LCP <= 2.0 s, CLS < 0.05, perf >= 95. A miss = fix (usually hero compression or a missing `sizes`) and re-run, not a waiver.
- [ ] **Step 3: Browser pass** (Playwright MCP): screenshot home (hero + stats + gallery) and /gallery; verify every gallery `img` currently rendered resolves 200 and is `.webp` under `/images/derive26/`; verify NO request path contains `media/photos`; check alt attributes present on all 12.
- [ ] **Step 4: Kill the server. Final whole-branch review, then merge to main, push** (per repo git discipline: fetch + rebase first; the three dirty parallel-session files must remain untouched and uncommitted: verify with `git status --short` before and after: only the same three entries plus ignored dirs may appear).

## Self-Review Notes (applied)

- Spec coverage: renaming+dedupe (T1), pipeline+budgets (T2), gallery content+labels (T3), hero+stats (T4), grid+/gallery (T5), acceptance items 1-5 (T6; item 5's "26 renamed files" is T1 step 2's count check).
- The spec's full-bleed hero was resolved to the component's designed figure slot (Global Constraints notes the deviation and why).
- Type consistency: `GalleryItem.src/full` (T3) match T5's usage; slugs in T3 all appear in T2's REQUIRED set; hero/backdrop paths in T4 use the T2 `hero/` dir.
- Placeholder scan: none; all code blocks complete.

---

### Task 7: Immersive hero + photo breaker (added 2026-07-13 after user review)

**Files:**
- Modify: `$R/apps/web/components/sections/Hero.tsx` (full-bleed rework)
- Create: `$R/apps/web/components/sections/PhotoBreaker.tsx`
- Modify: `$R/apps/web/app/page.tsx` (insert breaker between ExperienceGrid and GalleryGrid)

**Interfaces:**
- Consumes: `/images/derive26/hero/the-hall-at-capacity.webp`, `/images/derive26/hero/the-full-room.webp` (Task 2 generated hero variants for all slugs).

- [ ] **Step 1: Full-bleed hero.** Hero becomes a `relative` section with `min-h-[85vh] flex items-center`, the photo as `next/image fill priority sizes="100vw" object-cover`, a gradient overlay (`bg-gradient-to-r from-black/75 via-black/45 to-black/20` plus a bottom fade), content in a Container: existing eyebrow/headline/copy/CTAs re-colored for dark ground (headline `text-cream-light` or the repo's light token; body copy `text-cream-light/85`; verify Button variants read on dark, adjust with existing utility classes only). Corner caption (absolute bottom-right, small, `text-cream-light/70`): "Derive '26 finals · IIT Bombay · July 2026". AA contrast for all text over the darkest plausible rendering.
- [ ] **Step 2: PhotoBreaker component.** New server component: `relative h-[55vh] min-h-[380px]`, `the-full-room` fill cover (NOT priority, lazy), `bg-black/55` overlay, centered single line (display serif, cream): "One hall. Everyone who made it happen." and a quiet underlined link "See the gallery" to /gallery. Alt text: "The full Derive '26 finals room at IIT Bombay". Insert `<PhotoBreaker />` in page.tsx between ExperienceGrid and GalleryGrid.
- [ ] **Step 3: Build + visual check on the running :4100 dev server (do not kill it); screenshot hero and breaker.**
- [ ] **Step 4: Commit exactly the three files** with message "Full-bleed photo hero and a cinematic breaker" + Co-Authored-By line.
