# 012 — Modular demo registries and existing-demo migration

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer is validating migration equivalence, not approving a redesign.
