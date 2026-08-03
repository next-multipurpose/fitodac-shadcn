# 023 — Mini Calendar demos and catalog integration
Status: DONE
Role: implementer
UI Review: required
UI Profile: admin-app
Tooling policy: stop-with-blocker

## Goal
Publish the new `mini-calendar` through the demo-site workflow and verify its visible states. Work only on `migration-to-demo-site`.

Prerequisite: spec 022 must be `DONE`.

## Scope
- Create `src/demos/mini-calendar/` with `default.tsx`, `controlled.tsx`, `seven-days.tsx`, `custom-layout.tsx`, and `registry.ts`.
- Keep demos focused on the component contract: basic selection, controlled value feedback, seven-day range, and custom navigation through `asChild`.
- Import the distributed component from `@/registry/components/mini-calendar`; do not duplicate its implementation.
- Export exactly `miniCalendarDemos: DemoEntry[]`.
- Every entry uses `componentSlug: "mini-calendar"` and its colocated `sourcePath`.
- Declare `registryDependencies: ["mini-calendar"]`; declare direct external demo dependencies only where imported.
- Use the established demo preview container and avoid one-off presentation styling.
- Add `mini-calendar` to the existing `forms` catalog category.
- Run `pnpm demos:registry`; never manually edit `src/demos/registry.ts` or `src/demos/registry.generated.ts`.
- Update registry/catalog tests for the new group, paths, component slug, and category.
- Keep component names untranslated; use concise English demo titles consistent with existing registries.
- Verify the catalog search finds `mini-calendar` by its own name only.

## Out of scope
- Redesigning the component API or changing its default visual contract.
- Adding more date/calendar libraries, global CSS, or Kibo dependencies.
- Manual global demo-registry mappings.
- Changes to unrelated demos, categories, or component-detail behavior.

## Acceptance criteria
- `/components/mini-calendar` renders all four demos with Code and Copy Prompt support.
- Default, controlled, seven-day, and custom-layout demos exercise distinct documented behavior.
- Controlled selection feedback updates after choosing a day.
- Custom navigation uses `asChild` and accessible icon buttons.
- Demo metadata resolves to real colocated files and the `mini-calendar` registry item.
- The generated global registry is updated only by the generator.
- `/components` lists Mini Calendar under Forms in Grid and List views.
- Catalog search for `mini-calendar` returns the component without demo-level matching.
- Demos remain usable on desktop/mobile and in supported themes/color modes.
- No console, hydration, keyboard, or focus-visible regression is present.

## Architecture
Decision required: no.
This uses the approved colocated demo registry, generated global index, and centralized component catalog. No new boundary or registration mechanism is introduced.

## Relevant files
- `src/demos/mini-calendar/*.tsx`
- `src/demos/mini-calendar/registry.ts`
- `src/demos/registry.generated.ts`
- `src/lib/component-catalog.ts`
- `tests/demos/registry.test.ts`
- `tests/component-catalog.test.tsx`
- `src/registry/components/mini-calendar.tsx`

## Verification
- `pnpm demos:registry`
- `pnpm demos:registry:check`
- `pnpm test`
- `pnpm lint`
- `pnpm typecheck`
- `./init.sh`
- `pnpm build`
- Browser: `/components` and `/components/mini-calendar`
- Review desktop/mobile, keyboard, English/Spanish, Cobalt/Default, and Light/Dark.

## Implementation report

### Changes

- Fixed the React unique-key console warning from the visual review: wrapped each mapped day cell in `MiniCalendarDays` with a keyed `<Fragment key={format(date, "yyyy-MM-dd")}>` in `src/registry/components/mini-calendar.tsx:196` (added `Fragment` import). The demos are unchanged; the fix belongs in the component's day-list render.
- Created `src/demos/mini-calendar/{default,controlled,seven-days,custom-layout}.tsx` demos for basic selection, controlled `value`/`onValueChange` feedback, `days={7}`, and `asChild` icon navigation with accessible names.
- Created `src/demos/mini-calendar/registry.ts` exporting `miniCalendarDemos: DemoEntry[]` (`componentSlug: "mini-calendar"`, colocated `sourcePath`, `registryDependencies: ["mini-calendar"]`, external `dependencies` only where imported).
- Removed `mini-calendar` from `hiddenCatalogEntries` and added it to the `forms` category in `src/lib/component-catalog.ts`.
- Regenerated `src/demos/registry.generated.ts` via `pnpm demos:registry` (not hand-edited).
- Updated `tests/demos/registry.test.ts` (mini-calendar group + metadata) and `tests/component-catalog.test.tsx` (forms category + slug-only search).

### Tests / verification

- `pnpm demos:registry:check` → pass.
- `pnpm lint` → pass (1 pre-existing warning in `src/app/layouts/page.tsx`, unrelated).
- `tsc --noEmit` → 0 errors in any spec-023 file; remaining errors are pre-existing in gitignored `static-preview/HextaUI-master/` and `src/registry/blocks/*`.
- `tests/demos/registry.test.ts` + `tests/component-catalog.test.tsx` → mini-calendar cases pass. Full suite: 148 passed / 7 failed; the 7 failures are the documented pre-existing `alert`/`badge` ordering + `demo-card-coordination` (unchanged).
- `pnpm build` → fails only on pre-existing vendored `src/registry/blocks` (`nuqs`, `parseAsStringEnum`) and `next.config.ts` NFT tracing; no spec-023 file is implicated.

### Notes

- Used `defaultStartDate`/`value`+`onValueChange` rather than `defaultValue`. React 19's `HTMLAttributes` declares `defaultValue?: string|number|readonly string[]`, so the component's `defaultValue?: Date` is an unresolvable intersection (TS2322) — a spec-022 component type quirk. The contract tests never exercised `defaultValue`, so this is pre-existing and out of scope for 023; the demos use the working controls instead.
- UI Profile: admin-app. Loaded skills `shadcn` and `admin-interface-design`. Demos mirror the closest comparable registry (`calendar`) conventions and the mini-calendar component's own nav rendering (ghost `size="icon"` Chevron buttons with `aria-label`); `size-4` on the asChild icons matches the component's default `MiniCalendarNavigation` for visual consistency. No new styling tokens; semantic tokens only.
- Browser visual QA (desktop, mobile, English/Spanish, Cobalt/Default, Light/Dark) is deferred to the UI reviewer per the workflow.

## Technical review

### Verification (review pass 2026-08-03T04:31Z)

- init.sh: failed (pre-existing only — typecheck gate fails exclusively on gitignored `static-preview/HextaUI-master/`)
- lint: passed (1 pre-existing warning in `src/app/layouts/page.tsx`, unrelated)
- typecheck: 0 errors in any spec-023 file; full run fails only on gitignored `static-preview/` vendored sources
- test: 148 passed / 7 failed (all 7 pre-existing; confirmed by stash baseline)
- build: failed (pre-existing only; not re-run this pass — prior verified failures are vendored `src/registry/blocks` + `next.config.ts` NFT tracing + the static-preview TS gate; no spec-023 file implicated)
- demos:registry:check: passed; `pnpm demos:registry` is idempotent (regeneration yields exactly the 2 expected mini-calendar lines vs HEAD, no manual edits)
- demos/registry targeted: `mini-calendar` + catalog tests 4/4 pass; `tests/components/mini-calendar.test.tsx` 18/18 pass
- supabase: not applicable
- ui/playwright: not run by the reviewer; prior UI review pass is recorded in `## Visual review` and the runner will re-run ui-reviewer

### Pre-existing failure baseline (empirically confirmed this pass)

- Stashed the five spec-023 tracked files, kept the untracked `src/demos/mini-calendar/` folder in place, and re-ran the suite: the same 7 failures reproduce (`5 demo-card-coordination` + `2 alert/badge preserved-order`), plus 2 registry-integrity tests (`validates every discovered component registry...`, `matches the exact deterministic generated index`) correctly fail because the folder exists while its index entry is stashed — proving the working-tree generated index is in sync. Restored the stash; working tree unchanged.

### Review (review pass 2026-08-03T04:31Z)

- Scope: passed — the spec-023 implementation is confined to `src/demos/mini-calendar/*`, the generated registry index, `src/lib/component-catalog.ts`, `src/registry/components/mini-calendar.tsx` (Fragment key fix only), and the two test files.
- Architecture: passed — uses the approved colocated demo registry + generated global index (`pnpm demos:registry`, idempotent, not hand-edited) + centralized component catalog. `registry.json` was not modified by 023 and still resolves `mini-calendar` with `registryDependencies: ["button", "utils"]`, so the custom-layout `Button` import is transitively covered by `getIntegrationBundle`. No new boundary or registration mechanism. `Architecture Decision: no` is accurate.
- Code: passed — the four demos exercise distinct documented behavior (basic selection, controlled `value`/`onValueChange` with `aria-live` feedback, `days={7}`, `asChild` navigation with accessible icon buttons). Registry entries use `componentSlug: "mini-calendar"`, colocated `sourcePath`, `registryDependencies: ["mini-calendar"]`, and external `dependencies` only where imported (`date-fns`, `lucide-react@^0.577.0` — both already used by the calendar demos). The `Fragment`-key change in `MiniCalendarDays` (keyed by `format(date, "yyyy-MM-dd")`) is minimal, fixes the React unique-key console warning, and does not alter the component's API or visual contract.
- Out-of-scope changes: none attributable to this spec. The working tree contains an unrelated, uncommitted blocks workstream (`src/lib/blocks-catalog.ts`, `src/components/blocks-detail.tsx`, `src/app/blocks/[slug]/page.tsx`, `messages/*.json`, billing/team block files, `src/registry/primitives/command-menu.tsx`, `errores-bloques-registry.md`) and `next-env.d.ts` (Next-managed). It is documented here so the human can keep it out of the spec-023 commit.
- Spec queue: only 023 is active (`TECH_REVIEW`); prerequisite 022 is `DONE`.

### Result

- UI_REVIEW

### Requested changes

- None blocking. Optional cleanup: normalize indentation in `tests/component-catalog.test.tsx` to tabs to reduce diff noise.

## Visual review

### Reviewed surfaces

- Route / screen / component: `/components` (catalog Grid + List views, Forms
  category filter, "mini-calendar" search) and `/components/mini-calendar`
  (Default, Controlled, Seven days, Custom layout demo cards with Code and
  Copy Prompt support). Reviewed with the app at `http://localhost:3000`
  (existing dev server), Playwright 1.62.1 + Chromium.
- UI Profile / loaded skills: admin-app (`.ai/profiles/admin-app.md`);
  loaded skills `admin-interface-design` and `shadcn`.

### Checks (pass 2026-08-03, re-review after Fragment-key fix)

- Desktop (1440x900, Cobalt + Light): passed — catalog heading renders;
  Mini Calendar visible in Grid and List views; Forms category filter keeps
  Mini Calendar listed; searching "mini-calendar" returns exactly the
  component (no demo-level over-match). Detail page renders the heading plus
  all four demo cards; day cells expose full-date `aria-label`s; Controlled
  demo feedback updates on day selection ("Monday, August 3, 2026" ->
  "Tuesday, August 4, 2026"); custom-layout Previous/Next (`asChild` ghost
  icon Buttons) shift the day window ("Monday, August 3, 2026" ->
  "Saturday, August 8, 2026"); seven-days renders 7 cells; four "Copy
  prompt" buttons render; Code view shows usage + required files (import +
  `@/registry` source) and the Copy Prompt interaction works. Screenshots in
  `.ai/run/logs/ui-review-023-mini-calendar-demos-catalog/`.
- Mobile (390x844, Cobalt + Light): passed for the demo surface — all four
  demo cards render and are interactable. The shared-header horizontal
  overflow (scrollWidth 417 vs clientWidth 390) reproduces identically on
  `/components/calendar` and `/components/button` — pre-existing shell/header
  issue, unrelated to spec 023, out of scope.
- Visual navigation: passed — the demo site shell, catalog layout, and shared
  header are unchanged; no new or duplicated navigation surface was
  introduced.
- Visible states: passed — selected day toggles Button `default` variant +
  `aria-pressed`; today renders `bg-accent` when unselected; day cells and
  nav Buttons show `focus-visible` rings under keyboard navigation (verified
  by Tab traversal reaching day cells); dark mode renders without errors.
- Visual consistency contract: passed — demos reuse the established
  `DemoCard`/preview container with no one-off styling; ghost `size="icon"`
  nav Buttons with `size-4` Chevron icons mirror `calendar.tsx` nav and the
  component's own default `MiniCalendarNavigation`; semantic tokens only, no
  Cobalt branches, no global CSS changes.
- Browser console: PASSED — no console errors or page errors on the catalog
  or detail page renders (0 console errors, 0 page errors across all review
  passes). The React unique-key warning identified in the prior review
  remains resolved by the keyed `<Fragment>` in `MiniCalendarDays`
  (`src/registry/components/mini-calendar.tsx:198-200`).

### Result

- REVIEW

### Requested changes

- None. The prior request (stable day-cell key to remove the unique-key
  console warning) has been applied and re-verified this pass.

### Notes

- The 16px demo-section scroll overflow measured on mobile is identical on
  `/components/mini-calendar`, `/components/calendar`, and
  `/components/button` (worst = 16px on all three), so it is a pre-existing
  DemoCard shell behavior, not a spec-023 regression.
- The mobile header horizontal overflow (417 vs 390 px) is documented as
  pre-existing and unrelated to this spec; it is not part of the requested
  change.
- Image-level inspection of the captured screenshots was not possible in this
  session (no image input support); the DOM, layout, and interaction checks
  above are the substantive evidence. Screenshots are preserved in
  `.ai/run/logs/ui-review-023-mini-calendar-demos-catalog/` for the human's
  visual confirmation.

## Runner recovery

- Date: 2026-08-03T04:26:01Z
- The spec was in DOING when the runner started. It will be resumed from the current code state and git diff.
