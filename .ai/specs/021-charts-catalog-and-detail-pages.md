# 021 — Charts catalog and detail pages
Status: DONE
Role: implementer
UI Review: required
UI Profile: admin-app
Tooling policy: stop-with-blocker

## Goal
Create a `/charts` catalog similar in hierarchy to `/components`, plus `/charts/[slug]` pages that render each registered chart through the existing demo experience.

Prerequisite: spec 020 must be `DONE`.

Work only on branch `migration-to-demo-site`.

## Scope
- Add `Charts` to the shared header navigation without duplicating navigation markup.
- Add localized EN/ES metadata and UI labels for Charts.
- Create `/charts` as a Server Component using `getCharts()`.
- Match the established catalog width, hierarchy, spacing, semantic tokens, and responsive behavior.
- Render registered charts as a responsive grid of full-card links showing title and stable name.
- Use the existing `Empty` primitive when no charts are registered.
- Create `/charts/[slug]`, resolve with `getChart(slug)`, and call `notFound()` for unknown names.
- Generate static params from registered chart names.
- Reuse `ComponentDemo`/`DemoCard` so Preview, Code, and Copy Prompt remain canonical.
- Add a back link to `/charts`; do not copy component-detail sections Charts do not own.
- Keep pages as Server Components unless browser interaction strictly requires a client boundary.
- Add route, i18n, empty-state, lookup, and integration regression tests.

## Out of scope
- Creating chart examples.
- Search, categories, filters, Grid/List controls, sorting, or pagination.
- Embedded live previews inside catalog cards.
- Chart-specific Code or Copy Prompt implementations.
- A second registry, runtime discovery, or manual generated-index edits.
- Changes to `/components/chart`, the Chart primitive, or Recharts.
- New dependencies.

## Acceptance criteria
- Header navigation exposes `/charts` in English and Spanish.
- `/charts` lists exactly the entries from `chartsDemos`.
- Empty registry renders a clear localized empty state.
- Each card links to `/charts/<name>`.
- Unknown chart slugs return 404.
- Detail pages render the selected chart with Preview, Code, and Copy Prompt.
- Cobalt/Default and Light/Dark propagate through catalog and chart previews.
- Desktop and mobile layouts are usable without page-level overflow.
- Existing Components and Layouts navigation remains intact.
- Tests, build, and browser review pass.

## Architecture
Decision required: no.

The routes reuse the approved generated demo registry and existing demo rendering/integration surfaces; no new ownership boundary or parallel implementation is introduced.

## Relevant files
- `src/app/layout.tsx`
- `src/app/components/page.tsx`
- `src/app/components/[slug]/page.tsx`
- `src/demos/component-demo.tsx`
- `src/lib/chart-catalog.ts`
- `messages/en.json`
- `messages/es.json`
- existing catalog and route tests

## Verification
- `pnpm test`
- `./init.sh`
- Browser: `/charts` and one valid `/charts/[slug]`, desktop/mobile
- Browser: EN/ES, Cobalt/Default, Light/Dark, empty state, unknown slug
- Confirm no console or hydration errors

## Implementation report

### Changes

- Header: added a `Charts` nav link in `src/app/layout.tsx` (after Components,
  before Blocks) reusing `t("charts")` — no duplicated navigation markup.
- i18n: added `Header.charts`, `Metadata.chartsTitle`/`chartFallbackTitle`, and a
  `Charts` message section (eyebrow, heading, summary, backToCatalog, noCharts,
  noChartsDescription) in EN and ES.
- `src/app/charts/page.tsx` (Server Component): catalog using `getCharts()`,
  mirroring the components/blocks width (`max-w-6xl`, `px-6 py-14`) and header
  hierarchy (eyebrow / heading / summary).
- `src/components/charts-catalog.tsx` (Server Component): responsive grid of
  full-card links (title + stable name) and the existing `Empty` primitive for
  an empty registry. Card link styling mirrors the established `blocks-catalog`
  pattern (`gap-4` card flex-col, matching HEAD).
- `src/app/charts/[slug]/page.tsx` (Server Component): resolved via `getChart`,
  `notFound()` for unknown names, `generateStaticParams` from chart names, back
  link to `/charts`, and canonical Preview/Code/Copy Prompt through
  `ComponentDemos`/`DemoCard`. No component-detail sections this surface owns.

### Tests / verification

- New `tests/charts-catalog.test.tsx` (empty-state + full-card grid hrefs).
- New `tests/charts-route.test.ts` (`generateStaticParams` from names;
  `getChart` resolves registered names and is undefined for unknown slugs).
- Extended `tests/i18n/messages.test.ts` (reformatted to repo tabs + EN/ES
  Charts label assertions).
- `tests/demos/charts-registry.test.ts` (pre-existing from spec 020) covers
  lookup + integration regression.
- `pnpm test tests/charts* tests/demos/charts-registry.test.ts tests/i18n/messages.test.ts`:
  13/13 pass (`charts-catalog`, `charts-route`, `charts-registry`, `messages`).
- `pnpm demos:registry:check`: passed (generated index includes `charts` group).
- `pnpm lint`: 0 errors, 1 pre-existing unrelated warning in
  `src/app/layouts/page.tsx` (`SettingsIcon unused`).
- `pnpm typecheck`: 0 errors in `src`/`tests`; `tsc --noEmit` reports errors
  only inside the gitignored `static-preview/` directory.
- `pnpm build`: compiles (`Compiled successfully in ~21s`); the build's
  type-check step fails only on `static-preview/` (gitignored, untracked
  vendored preview dir).
- Full suite: 165 passed, 7 failed — all 7 failures are pre-existing and none
  in charts (`demo-card-coordination` 5, jsdom canvas incompatibility;
  `registry.test.ts` 2, stale `alert`/`badge` hardcoded expectations).
- Route/unit contracts confirm SSR-safe rendering: `generateStaticParams`
  derives from registered names, `getChart` resolves registered names and is
  `undefined` for unknown slugs (so `[slug]/page.tsx` calls `notFound()` → 404),
  and `/charts` resolves `chartsDemos` (empty → localized `Empty` state).

### Modified files

- `messages/en.json`, `messages/es.json`
- `src/app/layout.tsx`
- `src/components/charts-catalog.tsx` (new)
- `src/app/charts/page.tsx` (new)
- `src/app/charts/[slug]/page.tsx` (new)
- `tests/charts-catalog.test.tsx` (new)
- `tests/charts-route.test.ts` (new)
- `tests/i18n/messages.test.ts` (extended)

### Notes

- UI Profile: admin-app; skills loaded: shadcn, admin-interface-design.
- No dependencies added; reuses `getCharts`/`getChart`
  (`src/lib/chart-catalog.ts`, added by spec 020), the `Empty` primitive, and
  `ComponentDemo`/`DemoCard`.
- The detail Preview/Code/Copy Prompt path is wired canonically via
  `ComponentDemos`; it renders once chart examples exist (their creation is
  explicitly out of scope), and the catalog empty state uses no resizable panels.
- Out-of-scope changes from a prior session were reverted to keep this spec's
  diff minimal: `src/components/blocks-catalog.tsx`,
  `src/components/components-catalog.tsx`, and `next-env.d.ts` were restored to
  HEAD. `src/registry/primitives/tabs.tsx` and `tests/primitives/tabs*` are from
  the separate spec 024 (motion tabs) and were left untouched — the charts
  surface does not depend on the tabs primitive.
- Browser/desktop/mobile visual QA is pending the ui-reviewer per
  `UI Review: required`; no live dev-server smoke was run here.

## Technical review

### Verification

- init.sh: failed — only on pre-existing, unrelated issues (see notes below)
- lint: passed (0 errors; 1 pre-existing unrelated warning `SettingsIcon unused` in `src/app/layouts/page.tsx`)
- typecheck: passed for `src/` and `tests/`; `tsc --noEmit` reports errors only inside the gitignored `static-preview/` vendored directory (no errors in src/ or tests/)
- test: charts + i18n suites pass; full suite `165 passed / 7 failed`, all 7 failures pre-existing and unrelated to charts (see notes)
- build: `✓ Compiled successfully in 22.4s`; `next build` type-check step fails only on gitignored `static-preview/` (environmental)
- demos:registry:check: passed
- prettier: new files (`charts/page.tsx`, `charts/[slug]/page.tsx`, `charts-catalog.tsx`, chart tests) clean; `layout.tsx` formatting issue pre-exists at HEAD (confirmed via `git show HEAD:src/app/layout.tsx`)

### Review

- Scope: passed
- Architecture: passed
- Code: passed
- Out-of-scope changes: no

### Acceptance criteria against evidence

- Header navigation exposes `/charts` in English and Spanish — yes. A single link added to the existing header nav in `src/app/layout.tsx` (`t("charts")`), reusing the shared nav (one source of truth, no duplicated markup).
- `/charts` lists exactly the entries from `chartsDemos` — yes. `src/app/charts/page.tsx` uses `getCharts()` (→ `getDemosForComponent("charts")`); registry exports `chartsDemos: DemoEntry[] = []`.
- Empty registry renders a clear localized empty state — yes. `ChartsCatalog` renders the existing `Empty` primitive with localized `noCharts` / `noChartsDescription`, matching the `components-catalog` pattern (`Empty className="border"` + `EmptyMedia variant="icon"`).
- Each card links to `/charts/<name>` — yes. Full-card links `href={`/charts/${chart.name}`}` showing title + stable name; grid mirrors `blocks-catalog` (`gap-4`, `sm:grid-cols-2 lg:grid-cols-3`).
- Unknown chart slugs return 404 — yes. `getChart(slug)` undefined → `notFound()`; covered by `tests/charts-route.test.ts` (`getChart("not-a-chart")` and `getChart("")` are `undefined`).
- Detail pages render the selected chart with Preview, Code, and Copy Prompt — yes. Reuses `ComponentDemos` → `ComponentDemo` → `DemoCard` (`src/demos/component-demo.tsx`), the canonical Preview/Code/Copy Prompt surface. Renders once chart examples exist (their creation is out of scope).
- Cobalt/Default and Light/Dark propagate — yes. Semantic tokens only (`bg-card`, `border-border`, `text-muted-foreground`, `hover:border-foreground/30`, `text-foreground`); no theme-name conditionals.
- Desktop and mobile layouts usable — yes. `max-w-6xl px-6 py-14` (matches components/blocks/layouts catalogs) and responsive grid; no page-level overflow patterns.
- Existing Components and Layouts navigation remains intact — yes. Only an additive link in the shared nav.
- Tests, build, and browser review pass — focused tests 13/13 pass; build compiles; browser review is deferred to the ui-reviewer per `UI Review: required`.

### Pre-existing failures (confirmed unrelated)

- `tests/demos/demo-card-coordination.test.tsx` (5): jsdom environment — `HTMLCanvasElement.getContext()` not implemented / react-resizable-panels mount error. Environmental, unrelated to charts.
- `tests/demos/registry.test.ts` (2): stale hardcoded `alert`/`badge` demo-name expectations vs the committed registries. Pre-existing at HEAD, unrelated to charts.
- `static-preview/`: gitignored, untracked vendored directory (`tsconfig` includes `**/*.ts`/`**/*.tsx` so `tsc` scans it); its unresolved-module errors break `pnpm typecheck`, the `next build` type-check step, and therefore `./init.sh` exit code. This is an environment/repo hygiene issue outside spec 021's scope; no errors exist in `src/` or `tests/`.
- `src/app/layout.tsx` header indentation is not prettier-clean; the same issue exists at HEAD.

### Result

- UI_REVIEW (technical/functional review passed; `UI Review: required`)

### Requested changes

- None. No functional, test, scope, architecture, or quality failures found in the charts implementation.

## Visual review

### Reviewed surfaces

- `/charts` catalog (empty registry state), `/charts/[slug]` (404 path),
  `/components` and `/blocks` (consistency baselines).
- UI Profile / loaded skills: `admin-app` / `shadcn`, `admin-interface-design`.

### Checks

- Desktop (1440×900): passed — `/charts` h1 "Charts", summary, and localized
  `Empty` state render; no horizontal overflow; no console/page errors.
- Mobile (390×844): passed for the charts surface (grid/empty state fit, no
  overflow); shared-header horizontal overflow is pre-existing and identical on
  the `/components` baseline (see Notes).
- Visual navigation: passed — single "Charts" link added to the shared header
  nav in `src/app/layout.tsx` with byte-identical classes to Components /
  Blocks / Layouts; no duplicated nav markup; existing links intact.
- Visible states: passed — empty state (`Empty` primitive, `BarChartIcon`,
  dashed border) verified legible in Cobalt/Default × Light/Dark via computed
  styles (semantic tokens only: border, bg-muted media, text-muted-foreground).
  Loading/error states not applicable.
- Themes/locale: passed — `/charts` renders correctly in EN and ES (h1, nav,
  summary, empty state, `Metadata` title "Charts"/"Gráficos") and in all four
  Cobalt/Default + Light/Dark combinations with no errors.
- Unknown slug: passed — `/charts/not-a-chart` returns 404 with the standard
  Next 404 page inside the shared shell (header nav remains rendered).
- Header hierarchy: passed — catalog eyebrow/heading/summary structure and
  `max-w-6xl px-6 py-14` width match `/components` exactly.

### Result

- REVIEW

### Notes

- Detail-page Preview/Code/Copy Prompt could not be rendered live because
  `chartsDemos` is empty (chart-example creation is explicitly out of scope);
  the `[slug]` route reuses the canonical `ComponentDemos`/`DemoCard` path and
  mirrors `components/[slug]` (back link, h1, demos block). Verified via source.
- Pre-existing observation, not introduced by this spec: on mobile the shared
  header's right-side controls (language switcher + theme selector + animated
  theme toggler) overflow the 390px viewport (~436px, `scrollWidth` 460). The
  identical overflow exists on the already-approved `/components`, `/blocks`,
  and `/layouts` baselines; spec 021 only adds a left nav link, and the charts
  page content itself does not overflow. Recommend a separate spec to make the
  shared header responsive.
- Screenshots saved under `.ai/run/logs/ui-review-021/`; this run had no
  console or hydration errors on any route or mode.

### Requested changes

- None for spec 021 scope.

