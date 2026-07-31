# 013 — Deterministic generated demo registry index

Status: DRAFT
Role: implementer
UI Review: skip
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

Pending.

## Technical review

Pending.

## Visual review

Not required unless implementation unexpectedly changes visible UI.
