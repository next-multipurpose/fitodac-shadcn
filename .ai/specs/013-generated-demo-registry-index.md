# 013 — Deterministic generated demo registry index

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Remove the need to manually edit the global demo registry when a new component demo group is added.

Add a Node-based generator that discovers:

```text
src/demos/*/registry.ts
```

and generates the global component-to-registry mapping deterministically.

After this spec:

- adding demos to an existing component changes only that component's demo folder;
- adding a new component demo group requires creating its folder/registry and regenerating the index;
- the global registry is no longer a manual conflict point.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 012 must be `DONE`.

## Scope

### Generated index

Create:

```text
src/demos/registry.generated.ts
```

This file is generated code.

It must contain only:

- the shared type import if required;
- one import per component-level demo registry;
- the global slug-to-demo-array mapping;
- an explicit generated-file warning.

Conceptually:

```ts
// GENERATED FILE. DO NOT EDIT.

import type { DemoEntry } from "./types"

import { accordionDemos } from "./accordion/registry"
import { alertDemos } from "./alert/registry"
import { alertDialogDemos } from "./alert-dialog/registry"

export const demoRegistry: Record<string, DemoEntry[]> = {
  accordion: accordionDemos,
  alert: alertDemos,
  "alert-dialog": alertDialogDemos,
}
```

The exact formatting may follow project conventions.

The generated file must not import individual demo files.

### Manual wrapper remains stable

Keep:

```text
src/demos/registry.ts
```

as the small stable public wrapper.

It should conceptually do only:

```ts
import { demoRegistry } from "./registry.generated"

export type { DemoEntry } from "./types"

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}
```

Equivalent implementation is acceptable.

Do not generate the public wrapper.

Do not move `getDemosForComponent()` into per-component registries.

### Generator command

Add a Node script equivalent to:

```text
scripts/generate-demo-registry.mjs
```

and package scripts:

```json
{
  "demos:registry": "node scripts/generate-demo-registry.mjs",
  "demos:registry:check": "node scripts/generate-demo-registry.mjs --check"
}
```

Exact filenames/flags may follow project conventions, but both workflows are required:

```text
write/update generated index
check generated index is current without rewriting it
```

Do not install a code-generation library.

Use Node built-ins.

### Discovery contract

The generator must discover only direct component registries matching:

```text
src/demos/<component>/registry.ts
```

It must not treat these as component registries:

```text
src/demos/registry.ts
src/demos/registry.generated.ts
src/demos/types.ts
nested arbitrary registry.ts files below deeper subdirectories
```

The directory name is the public demo-group slug.

Examples:

```text
src/demos/avatar/registry.ts
    -> slug "avatar"
    -> export avatarDemos

src/demos/alert-dialog/registry.ts
    -> slug "alert-dialog"
    -> export alertDialogDemos
```

### Export naming convention

Derive the expected named export from the folder slug:

```text
<kebab-case slug>
    ↓ camelCase
<camelCase>Demos
```

Examples:

```text
button         -> buttonDemos
alert-dialog   -> alertDialogDemos
date-picker    -> datePickerDemos
```

The generator must fail clearly if a discovered registry does not expose the expected convention.

Implementation may validate the source contract without executing React/TSX modules.

Typecheck/tests remain the final authority that the generated import is valid.

### Deterministic ordering

Sort discovered registries by slug using a deterministic ordering.

The same input file set must always generate byte-equivalent logical output.

Do not depend on filesystem enumeration order.

Do not include timestamps, random IDs, environment paths, or other unstable values.

### Idempotent writes

Running:

```bash
pnpm demos:registry
pnpm demos:registry
```

without changing component registry files must not produce a second file change.

If generated content is already current, avoid rewriting the file unnecessarily when practical.

### Check mode

`pnpm demos:registry:check` must:

- compute expected generated output;
- compare it with the committed generated file;
- exit `0` when current;
- exit non-zero with a concise actionable message when stale/missing;
- not modify the generated file.

Expected guidance should tell the developer to run:

```bash
pnpm demos:registry
```

### Clear failures

The generator must fail clearly for at least:

- no readable demo root;
- malformed/unsupported component directory slug;
- missing expected component registry export contract;
- duplicate resolved slug in the discovered registry model;
- inability to write/read generated output.

Do not silently skip invalid component registries.

### Preserve runtime architecture

`registry.generated.ts` is a build-time generated source module.

Do not:

- scan the filesystem from browser code;
- dynamically import all demos at runtime based on arbitrary strings;
- create an API route for registry discovery;
- generate React components dynamically.

The generated index remains normal static TypeScript imports.

### Harness integration

Make stale generated output detectable during normal verification.

Prefer adding:

```text
pnpm demos:registry:check
```

to the existing project health flow in the smallest maintainable way.

Do not make `./init.sh` mutate source by running the write command.

Health verification must check, not regenerate.

The human/implementer explicitly runs `pnpm demos:registry` after creating a new component registry.

## Out of scope

- Per-demo validation; spec 014 handles comprehensive integrity checks.
- Modifying demo metadata.
- Adding new demos.
- Changing `registry.json`.
- Runtime filesystem discovery.
- External code-generation dependencies.
- Generating the individual component registries.
- Generating demo React source files.
- Changing Code or Copy Prompt.

## Acceptance criteria

- `src/demos/registry.generated.ts` exists.
- The generated file is clearly marked as generated.
- The generated file imports component registries only.
- The generated file contains no individual demo imports.
- `src/demos/registry.ts` is a small stable wrapper.
- `getDemosForComponent()` remains API-compatible.
- `pnpm demos:registry` exists and generates the index.
- `pnpm demos:registry:check` exists and performs a non-mutating stale check.
- Discovery is based on `src/demos/*/registry.ts`.
- Folder slugs map deterministically to `<camelCase>Demos`.
- Registries are emitted in deterministic order.
- Running generation twice is idempotent.
- Adding/removing demos inside an existing component registry does not alter the generated index because the component-group set is unchanged.
- Adding a new valid component registry adds exactly its required import/mapping after regeneration.
- Invalid registry contracts fail clearly.
- No external generator dependency is added.
- `registry.json` is not read as the demo index and is not modified.
- Stale generated output fails project health verification.
- All existing demos continue resolving.

## Architecture

Decision required: no.

Human-approved target:

```text
src/demos/<component>/registry.ts
              │
              │ pnpm demos:registry
              ▼
src/demos/registry.generated.ts
              │
              ▼
src/demos/registry.ts
              │
              ▼
getDemosForComponent(slug)
```

Generation happens during development/maintenance, not request runtime.

### Ownership

Manual:

```text
src/demos/types.ts
src/demos/<component>/registry.ts
src/demos/registry.ts
```

Generated:

```text
src/demos/registry.generated.ts
```

Never manually add a demo to `registry.generated.ts`.

## Relevant files

From spec 012:

- `src/demos/types.ts`
- `src/demos/registry.ts`
- `src/demos/*/registry.ts`

Expected additions:

- `src/demos/registry.generated.ts`
- `scripts/generate-demo-registry.mjs`
- focused generator helpers if useful
- generator tests
- package scripts
- minimal health-check integration

Existing:

- `package.json`
- `init.sh`
- Vitest setup

## Tests

Add focused tests around pure generation/discovery behavior.

At minimum cover:

- kebab-case slug -> expected export name;
- deterministic alphabetical ordering;
- expected generated import syntax;
- expected mapping syntax;
- duplicate slug rejection;
- invalid export contract rejection;
- same registry set -> identical generated output;
- adding demos inside an existing group does not change global generated output;
- adding a new group changes output exactly once.

Use temporary fixture directories where useful.

Do not mutate real production demo files during unit tests.

## Verification

Run:

```bash
pnpm demos:registry
pnpm demos:registry:check
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

### Idempotency proof

Run:

```bash
pnpm demos:registry
```

twice.

Verify the second run produces no diff/change to:

```text
src/demos/registry.generated.ts
```

### Existing-group proof

Using test fixtures or a reversible local verification:

- add another demo entry/file to an already-known group;
- regenerate;
- global generated index should remain logically unchanged;
- revert temporary verification changes.

Do not commit the temporary demo.

### New-group proof

Using test fixtures or reversible local verification:

- add a valid new group registry;
- generator includes exactly one import and key;
- remove the temporary fixture/change.

Do not commit the temporary group.

### Runtime regression

Verify representative existing slugs still resolve through:

```ts
getDemosForComponent(slug)
```

No UI redesign is part of this spec.

## Implementation report

### Changes

- Added a Node built-ins-only generator that discovers direct component demo registries, validates slug/export contracts, sorts deterministically, avoids unchanged writes, and supports a non-mutating `--check` mode.
- Added the generated static registry index and reduced the public registry to a stable lookup wrapper.
- Added package commands, project-health stale-output checking, and focused fixture tests for generation/discovery behavior.

### Tests / verification

- `pnpm demos:registry`: passed twice; the second run was byte-identical.
- `pnpm demos:registry:check`: passed.
- `pnpm vitest run tests/demos/generate-demo-registry.test.ts`: passed (9 tests).
- `pnpm typecheck`: passed after repairing the Calendar/date-selector source graph exposed by the generated index.
- `pnpm test`: passed (10 files, 55 tests).
- `pnpm lint`: passed.
- `./init.sh`: passed, including registry freshness, lint, typecheck, and tests.
- `pnpm build`: passed outside the sandbox; Turbopack emitted the existing broad NFT trace warning from `next.config.ts` but produced all 74 pages successfully.

### Modified files

- `scripts/generate-demo-registry.mjs`
- `scripts/generate-demo-registry.d.mts`
- `src/demos/registry.generated.ts`
- `src/demos/registry.ts`
- `tests/demos/generate-demo-registry.test.ts`
- `package.json`
- `pnpm-lock.yaml`
- `init.sh`
- `src/demos/calendar/date-selector-debug.tsx`
- `src/demos/calendar/disabled-dates.tsx`
- `src/demos/calendar/month-year-picker.tsx`
- `src/registry/components/date-selector.tsx`
- `.ai/specs/013-generated-demo-registry-index.md`

### Notes

- The generated index correctly exposed the Calendar registry that the former manual index omitted. Its source graph is now buildable: `date-fns` is a declared runtime dependency, date-selector imports resolve through the registry primitives, client demos declare their client boundary, and the month callback is typed.

## Technical review

### Verification

- init.sh: passed (includes demos:registry:check, lint, typecheck, test)
- demos:registry: passed twice; the second run left the file byte-identical (idempotent)
- demos:registry:check: passed; stale detection verified: appending a marker to `registry.generated.ts` makes check exit `1` with the actionable "Run: pnpm demos:registry" message without writing; running the write command restores byte-identical output
- test: passed (10 files, 55 tests; includes the 9 generator tests)
- lint: passed
- typecheck: passed
- build: passed (74 pages)

### Review

- Scope: passed — generator, generated index, wrapper, package scripts, health-check integration, and focused fixture tests match the spec. The calendar/button-group source repairs and the `date-fns` runtime declaration are documented consequences of the generated index exposing registries that the former manual index omitted.
- Architecture: passed — `Decision required: no`; the implementation follows the approved target (component registries -> generator -> `registry.generated.ts` -> `registry.ts` -> `getDemosForComponent`). No runtime filesystem scanning, no API route, no dynamic imports, no external generator dependency (Node built-ins only). `registry.json` is untouched.
- Code: passed — deterministic ordering (`localeCompare`), idempotent writes, non-mutating `--check`, and clear failures for unreadable root, invalid slug, missing export contract, duplicate slug, and read/write errors. Tests cover all "at minimum" cases using temp fixtures without mutating real demo files. The `.d.mts` declaration complements the `.mjs` script.
- Out-of-scope changes: no — the implementer's diff is limited to spec-required files plus the documented source repairs.

### Result

- UI_REVIEW

### Requested changes

- No implementation changes requested; the technical/functional review passes.
- The runner declared UI review "no" (spec says `UI Review: skip`), but the implementation visibly affects existing screens, so this is escalated to `UI_REVIEW` per reviewer protocol. The generated index now resolves demos for `breadcrumb`, `button-group`, `calendar`, and `card`, whose component pages previously rendered the empty state (`src/demos/component-demo.tsx:32`). The `button-group` merge-options demo also had its previously mismatched JSX structure corrected. Visual QA should confirm those four pages render correctly (including the new client-boundary calendar demos and the repaired merge-options layout).

### Notes

- Concurrent human activity during this review (not implementer work): commit `ae80b97` "hotfix" fixed broken imports in `src/registry/primitives/carousel.tsx`, and two untracked Trae-Solo export archives appeared in `src/demos/` (`fitodac-carousel-demos-migration-to-demo-site.zip`, `fitodac-checkbox-demos-migration-to-demo-site.zip`). These zip files must not be committed with the spec work.
- `src/registry/components/date-selector.tsx` (a public-contract area) changed only in import resolution; no behavior change, and no dedicated test exists for it.
- `next-env.d.ts` churn is Next.js-generated (dev vs build route types); harmless.

## Visual review

### Reviewed surfaces

Re-review after the CHANGES finding (Revenue demo accessible name). Dev server was running (`pnpm ai:dev:status`); pages verified by fetching SSR HTML from `http://localhost:3000` and checking the dev-server log.

- `/components/card` — 21 demo cards render, no empty state. The previously-requested fix is confirmed: `src/demos/card/revenue-stat.tsx:38` now uses `<DropdownMenuTrigger asChild>` with `aria-label="More options"` on the `<Button>` and `<MoreHorizontalIcon aria-hidden="true">`. Rendered SSR markup is `<button class="…" aria-label="More options" type="button" aria-haspopup="menu" aria-expanded="false"><svg aria-hidden="true">…</svg></button>` — the button has its accessible name and the icon is aria-hidden, matching the `help-card.tsx` convention. No nested `<button>`.
- `/components/calendar` — 14 demo cards render with full interactive content (574 gridcells, 666 buttons: day-picker month grids and nav), no empty state.
- `/components/button-group` — 20 demo cards render, no empty state. The repaired `merge-options` demo renders "Merge pull request" + trigger as sibling `<button>`s (no nesting) with working dropdowns (5 `aria-haspopup="menu"` triggers on the page).
- `/components/breadcrumb` — 6 demo cards render (Default, Ellipsis menu, Home icon, Slash separator, Dot separator, Bordered), each with its `aria-label="breadcrumb"` nav. No empty state.
- Empty-state page (`/components/use-mobile`) — still renders the correct empty state (the only rendered instance of the empty message across all checked pages). No regression.
- The empty-state string found in the card/calendar/button-group/breadcrumb HTML is only the serialized i18n bundle, not rendered markup.

### Checks

- Desktop: passed (SSR HTML verified at desktop layout; no browser available)
- Mobile: not available (no Playwright/Puppeteer/browser in this environment; responsive classes are shared and unchanged)
- Visual navigation: passed (page shell consistent across all affected pages: back link, h1, DemoCard headers with Preview/Code/Copy-Prompt controls)
- Visible states: passed (empty state correct on `use-mobile`; demo content rendered on all four previously-empty pages; no hydration errors in the dev-server log after the fix)
- Basic accessibility: passed (Revenue trigger now carries its accessible name per the requested change; `aria-hidden` icon, `aria-labelledby` demo cards, `aria-pressed` view toggles intact)

### Result

- REVIEW

### Requested changes

- None.

### Notes

- The runner correction appended to the prior review is superseded by this re-review.
- Verification was done without a browser (no Playwright/Puppeteer configured in the project) by fetching SSR HTML from the running dev server and inspecting the dev-server log for hydration/error output. Playwright is not a project dependency; manual browser review by the human is optional before commit.
- The untracked `*.zip` files in `src/demos/` must not be committed (noted in the technical review).
