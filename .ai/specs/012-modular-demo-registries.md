# 012 — Modular demo registries and existing-demo migration

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Refactor the current monolithic demo registry so each component demo folder owns its own demo metadata.

The current `src/demos/registry.ts` contains individual demo imports, `DemoEntry`, demo metadata, dependency metadata, component grouping, and `getDemosForComponent()`. This structure must stop growing proportionally to the number of demos.

This spec establishes the modular registry contract and migrates every demo group currently present in the monolith without changing visible demo behavior.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 011 must be `DONE` before this spec is promoted to `READY`.

## Current problem

The existing global registry imports and registers demos individually for groups including:

```text
accordion
alert
alert-dialog
autocomplete
avatar
badge
button
```

This creates a global conflict point whenever demos are added or migrated.

The refactor must move ownership of demo metadata into the corresponding component folder.

## Scope

### Shared DemoEntry type

Create:

```text
src/demos/types.ts
```

Move the current shared `DemoEntry` definition there.

The contract must preserve the current fields:

```ts
import type { ComponentType } from "react"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
  componentSlug: string
  sourcePath: string
  dependencies?: string[]
  registryDependencies?: string[]
}
```

Equivalent typing improvements are allowed only if they preserve the same public data contract.

`DemoEntry` must have one canonical definition.

Do not duplicate the type in component registries.

### Per-component registries

Every current demo group must receive its own:

```text
src/demos/<group>/registry.ts
```

At minimum migrate:

```text
src/demos/accordion/registry.ts
src/demos/alert/registry.ts
src/demos/alert-dialog/registry.ts
src/demos/autocomplete/registry.ts
src/demos/avatar/registry.ts
src/demos/badge/registry.ts
src/demos/button/registry.ts
```

Each component registry must:

- import only demos belonging to that demo folder/group;
- import `DemoEntry` from `@/demos/types`;
- export one typed array containing that group's demos;
- preserve existing demo order unless there is a documented reason to change it;
- preserve every existing metadata value.

Use the naming convention:

```text
accordion       -> accordionDemos
alert           -> alertDemos
alert-dialog    -> alertDialogDemos
autocomplete    -> autocompleteDemos
avatar          -> avatarDemos
badge           -> badgeDemos
button          -> buttonDemos
```

Future component registries must follow:

```text
<camelCase folder slug>Demos
```

### Preserve metadata exactly

This is a structural migration, not a metadata cleanup.

For every existing demo preserve:

- `name`;
- `title`;
- React demo component;
- `componentSlug`;
- `sourcePath`;
- `dependencies`;
- `registryDependencies`.

Do not infer `componentSlug` from the folder name.

Some demo groups may intentionally contain examples whose integration root is a different distributed component. Those values must remain unchanged.

Example:

```text
folder/group: alert-dialog
componentSlug: dialog
```

is valid when it already exists and must not be normalized automatically.

Do not silently add or remove dependencies during this migration.

### Temporary small global registry

Refactor `src/demos/registry.ts` so it no longer contains imports of individual demo files.

For this spec it may manually compose the component-level arrays:

```ts
import type { DemoEntry } from "./types"

import { accordionDemos } from "./accordion/registry"
import { alertDemos } from "./alert/registry"
import { alertDialogDemos } from "./alert-dialog/registry"

const demoRegistry: Record<string, DemoEntry[]> = {
  accordion: accordionDemos,
  alert: alertDemos,
  "alert-dialog": alertDialogDemos,
}

export function getDemosForComponent(slug: string) {
  return demoRegistry[slug] ?? []
}

export type { DemoEntry } from "./types"
```

The exact implementation may differ, but:

- no individual demo file may be imported by the global registry;
- `getDemosForComponent(slug)` must remain compatible;
- a temporary manual list of component registries is allowed only until spec 013 generates it automatically.

### Integration bundle compatibility

Update internal type imports so integration code depends on:

```text
@/demos/types
```

rather than using the global registry as the canonical type source.

At minimum inspect:

```text
src/demos/integration/get-integration-bundle.ts
src/demos/component-demo.tsx
src/demos/demo-card.tsx
```

and any test/helper importing `DemoEntry`.

Preserve the current integration flow:

```text
DemoEntry
   ↓
getIntegrationBundle()
   ↓
Code view
   ↓
Copy Prompt generator
```

Do not create separate Code metadata.

Do not create separate Prompt metadata.

### registry.json separation

Do not modify `registry.json` as part of this structural migration unless the implementation discovers a pre-existing, independently verified distributed-registry defect that blocks the migration.

If such a blocker exists:

- stop with a blocker;
- document it;
- do not fold unrelated `registry.json` changes into this spec.

`registry.json` remains the source for distributable component metadata.

Per-component demo registries remain the source for demo-site example metadata.

### Existing tests

Use the current Vitest suite.

Add focused compatibility tests proving:

- every migrated group resolves through `getDemosForComponent()`;
- unknown slugs still return `[]`;
- representative metadata survives the migration;
- representative optional dependencies survive the migration.

At minimum cover representative entries with:

- no extra dependency;
- npm `dependencies`;
- `registryDependencies`;
- both dependency types;
- a demo whose `componentSlug` differs from the demo folder slug if one currently exists.

Do not add a new test framework.

## Out of scope

- Automatic generation of the global component-registry index; spec 013 handles it.
- Changing the public route architecture.
- Redesigning demo cards.
- Changing Code or Copy Prompt format.
- Creating new demos.
- Removing existing demos.
- Renaming existing demo files.
- Cleaning up demo metadata unrelated to this migration.
- Refactoring `registry.json`.
- Installing new libraries.
- Dynamic runtime discovery/import of demo registries.

## Acceptance criteria

- `src/demos/types.ts` exists and owns the canonical `DemoEntry` type.
- Each existing demo group has its own `registry.ts`.
- Each per-component registry contains only metadata/imports for that group.
- Every current demo is migrated.
- Existing `name`, `title`, `componentSlug`, `sourcePath`, dependency metadata, and React component associations are preserved.
- `src/demos/registry.ts` contains no individual demo imports.
- `src/demos/registry.ts` remains small and composes component registries only.
- `getDemosForComponent(slug)` remains API-compatible.
- Existing unknown-slug behavior remains `[]`.
- `getIntegrationBundle()` consumes the shared type without changing bundle behavior.
- Code view continues to resolve source and dependencies.
- Copy Prompt continues to use the same integration bundle.
- `registry.json` is not merged with demo metadata.
- No visible demo is removed or moved to another component page.
- No production dependency is added.
- Existing tests pass.
- New migration compatibility tests pass.
- `pnpm typecheck` and build pass.

## Architecture

Decision required: no.

Human-approved target architecture:

```text
src/demos/
├── types.ts
├── registry.ts
│
├── accordion/
│   ├── registry.ts
│   └── demos...
├── alert/
│   ├── registry.ts
│   └── demos...
├── alert-dialog/
│   ├── registry.ts
│   └── demos...
├── autocomplete/
│   ├── registry.ts
│   └── demos...
├── avatar/
│   ├── registry.ts
│   └── demos...
├── badge/
│   ├── registry.ts
│   └── demos...
└── button/
    ├── registry.ts
    └── demos...
```

Responsibility boundary:

```text
registry.json
    = distributable primitives/components/hooks

src/demos/<component>/registry.ts
    = examples shown by the demo site
```

These must remain separate.

## Relevant files

Existing:

- `src/demos/registry.ts`
- `src/demos/integration/get-integration-bundle.ts`
- `src/demos/integration/generate-integration-prompt.ts`
- `src/demos/component-demo.tsx`
- `src/demos/demo-card.tsx`
- current demo directories under `src/demos/`
- `registry.json`
- current Vitest configuration/tests

Expected additions:

- `src/demos/types.ts`
- `src/demos/accordion/registry.ts`
- `src/demos/alert/registry.ts`
- `src/demos/alert-dialog/registry.ts`
- `src/demos/autocomplete/registry.ts`
- `src/demos/avatar/registry.ts`
- `src/demos/badge/registry.ts`
- `src/demos/button/registry.ts`
- focused registry compatibility tests

## Verification

Before implementation:

- inspect the complete current monolithic registry;
- use Graphify to identify all consumers of `DemoEntry`, `demoRegistry`, and `getDemosForComponent`;
- preserve unrelated user work.

After implementation run:

```bash
pnpm ai:graphify:update
pnpm test
pnpm lint
pnpm typecheck
pnpm build
./init.sh
```

### Structural checks

Verify:

- no individual demo import remains in `src/demos/registry.ts`;
- every migrated demo import now exists in exactly one component registry;
- every current demo entry still exists once;
- no metadata was silently normalized.

### Integration checks

Verify Code and Copy Prompt for representative demos including:

- one simple Button demo;
- one Avatar demo with additional registry/npm dependencies;
- one Alert Dialog demo with non-trivial integration metadata;
- one Autocomplete demo with a registry dependency.

For each:

- Preview renders;
- Code opens;
- source resolves;
- dependencies resolve;
- Copy Prompt remains generated from the same bundle.

### UI review

Check current demo pages for:

```text
accordion
alert
alert-dialog
autocomplete
avatar
badge
button
```

Where the corresponding public route exists, verify:

- same demos appear;
- same titles/order;
- no missing cards;
- no duplicate cards;
- Preview/Code/Copy Prompt remain usable;
- no browser console errors.

## Implementation report

### Changes

- Added the canonical `DemoEntry` type in `src/demos/types.ts` and updated integration/UI type consumers.
- Migrated all 109 entries currently published by the monolith into seven folder-owned registries, preserving metadata and order.
- Reduced the global registry to composition of component arrays while preserving `getDemosForComponent()` and unknown-slug behavior.
- Added focused Vitest coverage for every migrated group, representative metadata/dependency combinations, and differing folder/component slugs.

### Tests / verification

- Graphify discovery query: passed.
- `pnpm ai:graphify:update`: environment-limited; AST extraction received `Operation not permitted` and preserved the existing complete graph.
- `pnpm test`: passed (9 files, 46 tests).
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: environment-limited; Turbopack could not bind its internal CSS worker port (`Operation not permitted`).
- `./init.sh`: passed (lint, typecheck, and tests); build and UI checks are not included by default.
- UI/browser verification: pending UI reviewer; the current sandbox port restriction prevented a production-build-backed browser run.

### Modified files

- `src/demos/types.ts`
- `src/demos/registry.ts`
- `src/demos/{accordion,alert,alert-dialog,autocomplete,avatar,badge,button}/registry.ts`
- `src/demos/component-demo.tsx`
- `src/demos/integration/get-integration-bundle.ts`
- `tests/demos/registry.test.ts`

### Notes

- `registry.json` was not modified.
- The Badge registry intentionally contains the four entries currently exposed by the monolith; unrelated Badge demo files remain outside this structural migration.
- No dependencies were added and no demo files/routes were renamed or moved.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: passed (9 files, 46 tests)
- build: passed (re-run by reviewer; Turbopack compiled, 74/74 static pages generated)
- ui/playwright: not available / not applicable (visual QA delegated to UI reviewer)

### Review

- Scope: passed. `src/demos/types.ts` is the single canonical `DemoEntry` source; all seven groups (accordion, alert, alert-dialog, autocomplete, avatar, badge, button) got folder-owned registries following the `<camelCase folder slug>Demos` convention; the global registry composes only component arrays and re-exports the type. `registry.json` was not modified.
- Architecture: passed. Follows the human-approved responsibility boundary (registry.json = distributable metadata; `src/demos/<component>/registry.ts` = demo-site examples). No new architecture decision, dependency, or parallel pattern introduced.
- Code: passed. No individual demo imports remain in `src/demos/registry.ts`. All consumers (`src/app/components/[slug]/page.tsx`, `get-integration-bundle.ts`, `component-demo.tsx`) use the preserved API. Integration flow `DemoEntry -> getIntegrationBundle() -> Code view -> Copy Prompt` is unchanged.
- Migration equivalence: verified programmatically — 109 old monolith demo imports == 109 new composed imports, 1:1, no missing, no extras, no duplicates across folders, all relative imports resolve. Order, `name`, `title`, `componentSlug` (including `dialog` for alert-dialog examples), `sourcePath`, `dependencies`, and `registryDependencies` match the monolith exactly.
- Out-of-scope changes: no. The only non-demo change is `next-env.d.ts`, which Next.js regenerated during build. Harness state files (`.ai/run`, `.ai/progress`, spec 011 status) are runner/human-managed. The pre-existing dead `src/demos/badge/registry.ts` (20 entries, previously unimported with a broken `@/demos/types` import) was trimmed to the four entries actually exposed by the monolith; the demo files themselves remain, and this is documented in the report.
- Tests: focused `tests/demos/registry.test.ts` covers every migrated group order/names, unknown-slug `[]`, and all five required representative metadata/dependency combinations (no deps, npm deps, registryDeps, both, differing `componentSlug`).

### Result

- UI_REVIEW

### Requested changes

- None from technical/functional review. UI reviewer validates visual migration equivalence on the affected pages (accordion, alert, alert-dialog, autocomplete, avatar, badge, button).

## Visual review

### Reviewed surfaces

- Route `/components/[slug]` for: `accordion`, `alert`, `alert-dialog`, `autocomplete`, `avatar`, `badge`, `button`.
- Demo cards (title, Preview/Code toggle, Code panel sections, Copy Prompt), shared page shell (back-to-catalog link, H1 header, registry.json detail sections), desktop and mobile.

### Method

- Ran the app with `pnpm ai:dev:start` (Next.js 16, Turbopack, port 3000).
- Used Playwright (headless Chromium) for DOM-level verification: HTTP status, rendered card count, card IDs, H2 titles and order, duplicate detection, Preview/Code/Copy Prompt interaction, mobile horizontal overflow, per-page console/page errors and failed requests.
- Screenshots written to `.ai/run/logs/ui-review-012/shots/` (desktop + mobile, full page). Note: this review run could not visually inspect the screenshots as images; DOM/behavior checks below are the authoritative evidence.

### Checks

- Desktop: passed.
  - All 7 routes return 200 and render the expected `<main>` + H1 header.
  - Rendered demo-card counts match the migrated registries exactly:
    `accordion` 12, `alert` 17, `alert-dialog` 18, `autocomplete` 5, `avatar` 21, `badge` 4, `button` 32.
  - No missing or duplicate cards. The alert-dialog entries whose `componentSlug` is `dialog` (e.g. `fullscreen-product`, `checkout`, `sign-in`) render with IDs `demo-dialog-*` as expected; all 18 titles present in the same order as the registry.
  - H2 titles match registry titles and order 1:1 on all 7 pages (title/order equivalence).
  - Interactive checks passed for representative demos: `demo-button-default`, `demo-avatar-icon-fallback`, `demo-alert-dialog-confirm`, `demo-autocomplete-basic` — Preview visible on load, Code opens with Usage example + Required component files + Dependencies + Registry dependencies sections, Preview returns after Code.
  - Copy Prompt: click shows "Prompt copied" feedback.
- Mobile: passed.
  - No horizontal overflow on `accordion`, `alert`, `alert-dialog`, `avatar`, `badge`, `button`.
  - `autocomplete` reports 20px horizontal overflow. Source isolated to the page-template `DetailSection` blocks (Files/Dependencies/Registry dependencies) driven by `registry.json`; `src/components/component-detail.tsx` was not modified by this migration and the overflow predates it. Not a regression of spec 012.
- Visual navigation: passed. Back-to-catalog link (`/components`) present on all 7 pages; page header and detail sections structurally consistent with the shared template.
- Visible states: passed. Preview/Code toggle states, empty deps (`None.`), and copy feedback render correctly.
- Browser console errors: only the `avatar` page reports console errors (nested `<button>` inside `DropdownMenuTrigger`, a `<script>`-tag warning, a hydration error, and a 404 from the external `i.pravatar.cc` service). These originate in pre-existing demo content (`src/demos/avatar/account-menu.tsx`, added in commit `7fa8678`) and unchanged external image URLs — the migration commits (`2a92e52`, `1fff20d`) touched only registry/type/integration/test files. Pre-existing and out of scope.

### Result

- REVIEW

### Requested changes

- None. Migration equivalence confirmed: same demos, same titles, same order, no missing/duplicate cards, Preview/Code/Copy Prompt remain usable on all seven affected pages. Pre-existing demo-content console errors (avatar) and the autocomplete template overflow are documented as unrelated to this structural migration.

## Runner correction

- Date: 2026-07-31T10:50:47Z
- The ui-reviewer finished but did not leave the spec in REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

Re-run on 2026-07-31: visual review completed and spec left in `REVIEW`.
