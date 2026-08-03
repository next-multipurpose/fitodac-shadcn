# 020 — Charts demo registry group
Status: REVIEW
Role: implementer
UI Review: skip
UI Profile: none
Tooling policy: stop-with-blocker

## Goal
Create the generated data source for a dedicated Charts directory by reusing the approved demo-registry workflow.

Work only on branch `migration-to-demo-site`.

## Scope
- Create `src/demos/charts/registry.ts` exporting `chartsDemos: DemoEntry[]`.
- Keep chart sources colocated in `src/demos/charts/<name>.tsx`.
- Require unique lowercase kebab-case names and matching `sourcePath` values.
- Require every chart entry to use `componentSlug: "chart"`.
- Allow the initial registry to be empty; do not invent chart examples.
- Run `pnpm demos:registry` so the generated index exposes the `charts` group.
- Add a thin server-safe helper such as `src/lib/chart-catalog.ts` with `getCharts()` and `getChart(name)`.
- Resolve both helpers from `getDemosForComponent("charts")`; do not copy metadata.
- Preserve `getIntegrationBundle()` so Chart source, Recharts, Code, and Copy Prompt use the existing flow.
- Extend registry integrity tests for chart names, paths, lookup, and `componentSlug`.
- Add only concise stable workflow guidance where current docs require it.

## Out of scope
- A second chart registry or generator.
- `/charts` routes or visible UI.
- New chart examples.
- Chart categories, search, filters, or thumbnails.
- Changes to the Chart primitive, Recharts, or `registry.json`.
- New dependencies.

## Acceptance criteria
- `chartsDemos` is the only chart-demo metadata source.
- The existing generator adds `charts: chartsDemos` without manual generated edits.
- An empty chart group is valid and returns `[]`.
- `getChart()` returns the matching entry or `undefined`.
- Chart entries resolve through the existing integration bundle with root item `chart`.
- Ordinary chart additions touch only `src/demos/charts/`.
- No parallel registry/generator or metadata list exists.
- Focused tests and existing registry checks pass.

## Architecture
Decision required: no.

This follows the approved `src/demos/<group>/registry.ts` architecture. `registry.json` remains the distributed Chart primitive source; `charts` is only a demo-site group.

## Relevant files
- `src/demos/types.ts`
- `src/demos/registry.ts`
- `scripts/generate-demo-registry.mjs`
- `src/demos/integration/get-integration-bundle.ts`
- `src/registry/primitives/chart.tsx`
- `registry.json`
- `tests/demos/`

## Verification
- `pnpm demos:registry`
- `pnpm demos:registry:check`
- `pnpm test`
- `./init.sh`
## Implementation report

### Changes

- Added `src/demos/charts/registry.ts` exporting `chartsDemos: DemoEntry[] = []`
  as the sole chart-demo metadata source (empty initial group, no invented examples).
- Ran `pnpm demos:registry`; the generator deterministically added
  `import { chartsDemos } from "./charts/registry"` and `charts: chartsDemos,`
  to `src/demos/registry.generated.ts` (no manual edits).
- Added `src/lib/chart-catalog.ts` with `getCharts()` and `getChart(name)`, both
  resolving from `getDemosForComponent("charts")` without copying metadata.
  Mirrors the `src/lib/component-catalog.ts` location/convention; no `server-only`
  guard so it stays usable like the existing catalog helper.
- Added `tests/demos/charts-registry.test.ts` covering group exposure, empty-group
  integrity validation, kebab-case name / `src/demos/charts/<name>.tsx` path /
  `componentSlug: "chart"` invariants, and `getChart()` lookup semantics.
- Added a concise stable note to `docs/conventions.md` (Demo registration)
  clarifying that a demo group folder is an organizational catalog key, each entry
  references its primitive via `componentSlug`, and an empty group is valid.

`getIntegrationBundle()` was preserved unchanged; a chart entry with
`componentSlug: "chart"` resolves the existing `chart` item in `registry.json`
(the Chart primitive in `src/registry/primitives/chart.tsx` + `recharts`
dependency), so Chart source, Code, and Copy Prompt already flow through the
existing integration path.

### Tests / verification

- `pnpm demos:registry`: passed
- `pnpm demos:registry:check`: passed
- `pnpm typecheck` (`tsc --noEmit`): passed
- `pnpm lint` (`eslint src/app`): passed (0 errors; 1 pre-existing warning
  `SettingsIcon unused` in `src/app/layouts/page.tsx`, unrelated to this scope;
  lint script targets `src/app` only)
- `pnpm build`: passed
- `pnpm test` (charts suite in isolation): `charts-registry.test.ts` 4/4 passed
- Full `pnpm test`: 6 failures, **all pre-existing and unrelated to charts**:
  - `registry.test.ts` "resolves every badge demo in its preserved order" — the
  `badge` registry (committed at HEAD) has 20+ demos while the hardcoded
  `expectedDemoNames.badge` lists 4. Reproduced with this spec's changes stashed.
  - `demo-card-coordination.test.tsx` (5 tests) — jsdom environment failure:
  "Not implemented: HTMLCanvasElement's getContext()". Out of scope for this spec.
- Registry integrity test (`registry-integrity.test.ts`) passes: it auto-discovers
  the new `charts` group and validates the empty array as integrity-valid.

### Modified files

- `src/demos/charts/registry.ts` (new)
- `src/lib/chart-catalog.ts` (new)
- `src/demos/registry.generated.ts` (regenerated by `pnpm demos:registry`)
- `tests/demos/charts-registry.test.ts` (new)
- `docs/conventions.md` (added concise Demo registration guidance)

### Notes

- UI Profile / loaded skills: none (UI Review: skip — no visible UI touched; this
  spec is data/registry plumbing consumed by the follow-up 021 catalog/pages spec).
- Branch: `migration-to-demo-site`.
- No commits made.
## Technical review

### Verification

- init.sh: failed (only on pre-existing, unrelated test failures — see notes)
- demos:registry:check: passed
- lint: passed (1 pre-existing unrelated warning: `SettingsIcon unused` in `src/app/layouts/page.tsx`; lint targets `src/app` only)
- typecheck: passed
- test: passed (charts + integrity); 6 pre-existing failures unrelated to charts (see notes)
- build: passed

### Review

- Scope: passed
- Architecture: passed
- Code: passed
- Out-of-scope changes: yes — `next-env.d.ts` modified (Next.js generated file: `.next/dev/types/routes.d.ts` -> `.next/types/routes.d.ts`). Auto-generated artifact, unrelated to charts; not application code. Flag for human reconciliation at commit time.
- Acceptance criteria: all met (see below)

### Acceptance criteria against evidence

- `chartsDemos` is the only chart-demo metadata source — yes. New
  `src/demos/charts/registry.ts` exports `chartsDemos: DemoEntry[] = []`; grep confirms no
  parallel list.
- The existing generator adds `charts: chartsDemos` without manual generated edits — yes.
  `demos:registry:check` passes and `registry.generated.ts` was regenerated by the
  deterministic generator (import + mapping added at `src/demos/charts/registry` / `charts`).
- An empty chart group is valid and returns `[]` — yes.
  `validateComponentRegistry({ slug: "charts", demos: chartsDemos })` resolves to the empty
  array; `getDemosForComponent("charts")` / `getCharts()` return `[]`.
- `getChart()` returns the matching entry or `undefined` — yes (tests assert
  `getChart("nonexistent")` and `getChart("")` both return `undefined`).
- Chart entries resolve through the existing integration bundle with root item `chart` — yes.
  `getIntegrationBundle` resolves `demo.componentSlug === "chart"` to the `registry.json`
  `chart` item (Chart primitive in `src/registry/primitives/chart.tsx` + `recharts`);
  bundle unchanged.
- Ordinary chart additions touch only `src/demos/charts/` — yes. The generator auto-discovers
  new demo folders under `src/demos/<group>/`; no global index patch needed.
- No parallel registry/generator or metadata list exists — yes. Single generator, single
  public wrapper; `chart-catalog.ts` is the only lookup helper and mirrors the existing
  `src/lib/component-catalog.ts` convention (no `server-only` guard, pure data access,
  server-safe by nature).
- Focused tests and existing registry checks pass — yes. `charts-registry.test.ts` 4/4;
  `registry-integrity.test.ts` 7/7 (auto-discovers the new `charts` group, validates empty
  array as integrity-valid, and confirms generated index stays deterministic).

### Pre-existing failures (confirmed unrelated via git stash)

- `registry.test.ts` "resolves every badge demo in its preserved order": committed
  `expectedDemoNames.badge` lists 4 names while the committed `badge` registry has 20+.
  Reproduced with this spec's changes stashed; identical failure without them.
- `demo-card-coordination.test.tsx` (5 tests): jsdom environment failure
  "Not implemented: HTMLCanvasElement's getContext()". Environmental, unrelated to charts.
- `next-env.d.ts`: generated-file artifact, see Out-of-scope changes above.

### Result

- REVIEW

## Visual review

Not applicable.
