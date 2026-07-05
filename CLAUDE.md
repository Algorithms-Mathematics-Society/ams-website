# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository state

This is the **AMS marketing website** repo (amshq.in) - the public site for AMS's
contests (Derive: quant, Ascent: systems) and the Access assessment platform. The home
and Derive pages are built in `apps/web`; Ascent/Access are ComingSoon stubs. Also here:

- `ENGINEERING_GUIDE.md` - the authoritative pre-build guide. **Read it before writing
  any code**; it fixes the stack, folder structure, component rules, performance
  budgets, and responsive approach. Don't contradict it silently - if a decision there
  needs to change, change the guide in the same PR.
- `website-figma-reference.png` - full-page Figma export of the design (very large;
  downscale/crop before viewing). Dashed boxes in it are photo placeholders with shot
  descriptions, not final content.
- `media/source-svg/`, `media/source-png/` - brand assets (marks, wordmarks, badges,
  favicons) in primary/black/white/inverse variants. Prefer the SVGs in the site;
  favicons and touch icons come from `media/source-png`.

## Key decisions already made (see ENGINEERING_GUIDE.md for detail)

- Next.js App Router + TypeScript strict + Tailwind, **fully static export** behind a
  CDN - no runtime server. Forms are the only dynamic surface (serverless/form service).
- The site links out to the contest platform for "Compete"; it never touches contest
  infrastructure, auth, or candidate data.
- `page.tsx` files only compose section components (~30–50 lines max). One component
  per file, three tiers with one-way imports: `sections → ui/layout`. All copy/data
  lives in `content/` as typed objects, never inline in JSX.
- Performance budgets are hard gates: LCP ≤ 2.0 s, CLS < 0.05, ≤ 100 KB gzipped JS on
  home, Lighthouse ≥ 95 (throttled mobile). Images are the main risk - everything goes
  through `next/image`, below-the-fold lazy-loads, no camera originals in `public/`.
- Mobile-first; most traffic is phones. No horizontal scroll at 320 px.

## Commands

Run from the repo root (pnpm workspace; the app lives in `apps/web`):

- `pnpm install` - install (Node 24, pnpm 11)
- `pnpm dev` - dev server
- `pnpm build` - production build; every route must stay `○ (Static)`
- `pnpm lint` / `pnpm typecheck` - ESLint / `tsc --noEmit`

CI is not set up yet - wiring lint/typecheck/build into a workflow is open debt
(committed-but-unwired checks count as unenforced).

## Working conventions

- **No em dashes anywhere** (user rule, strict): not in site copy, docs, comments, or
  commit messages. Use a colon, comma, semicolon, period, or the brand's middle dot (·)
  for separator-style labels ("Photo · description").
- Never stage with `git add -A`/`git add .` - a parallel Claude session may be editing
  this checkout. Stage explicit paths only.
- Placeholder content (XX stats, dashed photo slots, sponsor names) must be replaced
  with verified real content before launch; sponsor logos only via approved logo files.
