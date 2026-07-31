# 014 — Demo registry integrity, integration regression, and workflow guards

Status: REVIEW
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Turn the modular demo-registry architecture into a durable workflow that safely scales beyond 100 demos.

Add validation and regression checks so invalid component registries, stale generation, missing demo sources, dependency drift, or broken `getDemosForComponent()` behavior fail before new demo work is accepted.

Document the permanent rule that normal demo additions do not patch global registry files or `registry.json`.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 013 must be `DONE`.

## Scope

### Component registry integrity validation

Add reusable validation for all discovered:

```text
src/demos/*/registry.ts
```

The validation must use the actual component-level registry data.

At minimum validate for every group:

- registry slug is valid;
- expected component registry export resolves;
- registry array is valid;
- each entry has a non-empty `name`;
- each entry has a non-empty `title`;
- each entry has a React component reference at runtime;
- each entry has a non-empty `componentSlug`;
- each entry has a non-empty trusted `sourcePath`;
- each `sourcePath` exists;
- each `sourcePath` points inside `src/demos/`;
- each demo `name` is unique within its group;
- optional `dependencies` contain valid non-empty strings;
- optional `registryDependencies` contain valid non-empty strings.

Do not rewrite metadata silently during validation.

Fail with group/demo context.

Example:

```text
avatar/profile-popover: sourcePath does not exist
```

is preferred over a generic `invalid registry` error.

### Self-contained folder contract

For normal demos, `sourcePath` must belong to the same demo group folder:

```text
src/demos/avatar/registry.ts
    -> src/demos/avatar/*.tsx
```

If a current migrated demo intentionally violates this, inspect it before weakening the rule.

Do not introduce cross-group source ownership merely to make validation pass.

### Generated index integrity

Add checks that prove:

- every discovered component registry appears exactly once in `registry.generated.ts`;
- no generated slug has multiple registry mappings;
- no generated import points to a missing component registry;
- no extra stale group remains in the generated index;
- generated output equals the generator's current expected output;
- global wrapper imports the generated index rather than individual component registries/demos.

A stale generated index must fail tests/health checks.

### Required failure cases

The automated suite must demonstrate detection of at least the six cases required by the architecture document:

1. invalid component registry;
2. duplicate component-registry slug;
3. incorrect generated import/output;
4. nonexistent demo `sourcePath`;
5. nondeterministic/non-idempotent generation;
6. demo resolution broken through `getDemosForComponent()`.

Use isolated fixtures/pure helpers for destructive failure scenarios.

Do not corrupt real repository files during tests.

### getDemosForComponent regression

Test the public wrapper directly.

At minimum:

- each actual component registry slug returns its exact array;
- unknown slug returns `[]`;
- generated registry keys and discovered registry slugs remain in parity;
- no demo is duplicated by the global composition layer.

Do not duplicate the entire registry metadata into a permanent second fixture solely to test the registry.

The component registries are the source of truth.

### Code and Copy Prompt regression

The refactor must preserve the existing shared integration bundle.

Add/extend tests around real migrated demo entries so the suite verifies the complete chain:

```text
component registry DemoEntry
       ↓
getDemosForComponent()
       ↓
getIntegrationBundle()
       ├── Code
       └── generateIntegrationPrompt()
```

Use representative cases covering:

#### Simple root component

A Button demo without additional demo-specific dependencies.

Verify:

- demo source resolves;
- root distributed component resolves;
- bundle is valid.

#### npm dependency

A demo with demo-specific `dependencies`.

Verify those dependencies appear in the resulting integration bundle.

#### registry dependency

A demo such as an Avatar/Autocomplete example with `registryDependencies`.

Verify required registry items/files resolve.

#### combined dependencies

A demo with both npm and registry dependencies.

Verify both survive the modular registry refactor.

#### different componentSlug

Where a current demo group contains a demo whose `componentSlug` differs from the demo folder slug, verify:

- global page grouping still comes from the component demo registry;
- integration root still comes from that entry's `componentSlug`;
- the value is not normalized to folder slug.

### registry.json separation guard

Preserve the architecture boundary:

```text
registry.json
    = distributed component definitions

src/demos/*/registry.ts
    = demo examples
```

Normal demo registration must not require a `registry.json` entry.

Tests do not need to ban legitimate distributed registry edits, but documentation/rules must state:

- modify `registry.json` only for a real distributed primitive/component/hook definition change;
- do not modify it merely to make a demo appear on the demo site.

The demo-registry generator must not use `registry.json` as its source of demo groups.

### No manual global registration

Update stable repository guidance.

At minimum update:

```text
.ai/rules.md
docs/conventions.md
docs/verification.md
```

or the equivalent existing canonical docs.

Document the new workflow:

#### Add demos to an existing component

```text
1. add/edit files under src/demos/<component>/
2. update src/demos/<component>/registry.ts
3. run pnpm demos:registry
4. run pnpm demos:registry:check
5. run pnpm test
6. run standard verification
```

Adding 20 Avatar demos must not require editing:

```text
src/demos/registry.ts
src/demos/registry.generated.ts
registry.json
```

The generated file changes only when the set of component registry folders changes.

#### Add a new component demo group

Create:

```text
src/demos/new-component/
├── registry.ts
├── demo-a.tsx
└── ...
```

Then run:

```bash
pnpm demos:registry
```

No manual import/key edit in the global registry.

### Patch/conflict rule

Add a stable rule equivalent to:

- normal demo migrations/additions must not be delivered as patches against `src/demos/registry.ts`, `src/demos/registry.generated.ts`, or `registry.json`;
- component demo work owns only its component folder plus genuinely required distributed-component changes;
- generated index updates come from the generator.

This rule exists to prevent fragile cross-component patch conflicts.

Do not prohibit patches globally for unrelated work.

### Existing test infrastructure

Use the existing Vitest/RTL setup.

Do not add another testing framework.

Do not add external libraries solely for registry validation.

Prefer reusable Node/TypeScript helpers and existing runtime imports.

## Out of scope

- Visual redesign.
- New demo content.
- Refactoring distributed shadcn registry architecture.
- Changing Code UI format.
- Changing Copy Prompt format.
- Database-backed demo metadata.
- Runtime component generation.
- Runtime filesystem scanning in browser code.
- Automatically creating per-component registries.
- Automatically generating demo source files.
- Installing external validation libraries solely for this feature.

## Acceptance criteria

- Every component demo registry is validated.
- Invalid registries fail with useful group/demo context.
- Duplicate group slugs are rejected by generator/validation logic.
- Missing generated imports/mappings are detected.
- Missing `sourcePath` files fail.
- Generated output is deterministically verified.
- Regeneration is idempotent.
- `getDemosForComponent()` is directly covered by tests.
- Every discovered group resolves through the public wrapper.
- Unknown slugs still return `[]`.
- Code integration remains valid for migrated demos.
- Copy Prompt still consumes the same integration bundle.
- Demo-specific npm dependencies still resolve.
- Demo-specific registry dependencies still resolve.
- A different `componentSlug` remains supported when intentionally declared.
- `registry.json` remains separate from demo registration.
- Adding demos to an existing group requires no global manual registry edit.
- Adding a new group requires folder/registry creation plus generation only.
- Stable docs describe the workflow.
- `.ai/rules.md` prevents future agents from returning to monolithic/manual registration.
- Normal demo work does not use patches against global registry files as the registration mechanism.
- Existing test suite remains the only test framework.
- `pnpm demos:registry:check`, tests, typecheck, build, and health checks pass.

## Architecture

Decision required: no.

Final required architecture:

```text
                         registry.json
                  distributed definitions only
                            │
                            │ used by integration resolver
                            ▼
src/demos/<component>/registry.ts
      demo metadata source of truth
                  │
                  │ discovered at maintenance time
                  ▼
       demo registry generator
                  │
                  ▼
src/demos/registry.generated.ts
                  │
                  ▼
       src/demos/registry.ts
                  │
                  ▼
      getDemosForComponent()
                  │
          ┌───────┴────────┐
          ▼                ▼
       Preview     getIntegrationBundle()
                            │
                      ┌─────┴─────┐
                      ▼           ▼
                    Code     Copy Prompt
```

No second demo metadata source may be introduced.

## Relevant files

From specs 012–013:

- `src/demos/types.ts`
- `src/demos/registry.ts`
- `src/demos/registry.generated.ts`
- `src/demos/*/registry.ts`
- generator script/helpers
- `package.json`
- `init.sh`

Integration:

- `src/demos/integration/get-integration-bundle.ts`
- `src/demos/integration/generate-integration-prompt.ts`
- integration types/helpers

Testing/docs:

- current `tests/`
- `.ai/rules.md`
- `docs/conventions.md`
- `docs/verification.md`

## Tests

Organize tests according to existing conventions.

Expected coverage areas may include:

```text
tests/demos/registry-generator.test.*
tests/demos/registry-integrity.test.*
tests/demos/registry-resolution.test.*
tests/demos/integration-bundle-regression.test.*
```

Exact filenames may differ.

### Fixture requirements

Failure-case fixtures must be isolated from production demos.

Cover:

```text
invalid registry
duplicate slug
incorrect generated output
missing sourcePath
non-deterministic ordering attempt
broken public resolution
```

### No brittle full snapshot

Do not make a huge generated registry snapshot the only protection.

Prefer structural assertions:

- discovered slugs;
- import targets;
- mapping keys;
- deterministic output;
- exact current file equality in check mode.

Small focused snapshots are acceptable only if they improve failure clarity.

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

### Required failure proofs

Using isolated tests/fixtures, prove the suite rejects:

1. invalid component registry;
2. duplicate slug;
3. bad generated import/mapping;
4. missing demo source;
5. changed ordering/non-deterministic generator behavior;
6. broken `getDemosForComponent()` mapping.

### Real repository integrity

Verify all real component registries pass.

Verify all actual discovered slugs equal generated slugs.

Verify every real `sourcePath` exists.

### Integration regression

Generate real integration bundles and prompts for representative migrated demos.

Confirm:

- package dependencies;
- registry dependencies;
- source files;
- consumer usage;
- prompt source payload;
- no demo metadata drift.

### Workflow proof

Simulate with test fixtures or reversible local changes:

#### Existing group

Add a fake extra Avatar demo inside an isolated fixture/equivalent.

Expected:

```text
component registry changes
generated global index does not
```

#### New group

Add a valid new component registry fixture.

Expected after generation:

```text
one new generated import
one new generated mapping
```

No manual global edit.

### UI review

Perform a final smoke review on representative public pages:

```text
/components/button
/components/avatar
/components/alert-dialog
/components/autocomplete
```

Verify:

- demo cards resolve;
- Preview works;
- Code works;
- Copy Prompt works;
- no duplicates/missing demos;
- no browser console errors.

This is a regression review only. No visual redesign is expected.

## Implementation report

### Changes

- Added reusable component-registry validation with contextual errors for slugs, runtime entries, unique names, dependencies, trusted colocated source paths, and source existence.
- Added generated-index structural validation for missing, duplicate, stale, or incorrect imports/mappings plus exact deterministic output equality.
- Added real-registry parity and public `getDemosForComponent()` regression coverage without introducing a second metadata source.
- Added integration regressions for simple, npm dependency, registry dependency, combined dependency, and different-`componentSlug` demos through `getIntegrationBundle()` and `generateIntegrationPrompt()`.
- Added stable workflow rules separating demo registration from `registry.json` and prohibiting manual global-registry patches as the registration mechanism.
- Added a Vitest-only `server-only` alias so the real server integration resolver can be tested without changing production imports.

### Tests / verification

- Graphify CLI discovery query: passed.
- `pnpm demos:registry`: passed; generated index remained current.
- `pnpm demos:registry:check`: passed.
- `pnpm test`: passed, 12 files / 73 tests.
- Required isolated failure proofs: invalid registry, duplicate slug, incorrect generated import/output, nonexistent source, deterministic/idempotent ordering, and broken public resolution all covered.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `./init.sh`: passed.
- `pnpm exec next build --webpack`: passed, including 74 generated pages.
- `pnpm build`: Turbopack could not bind an internal port in the restricted implementer sandbox (`Operation not permitted`); the webpack production build passed.
- `git diff --check`: passed.
- UI/browser smoke review: pending the required UI reviewer; no visual implementation changed.

### Modified files

- `.ai/rules.md`
- `docs/conventions.md`
- `docs/verification.md`
- `scripts/generate-demo-registry.mjs`
- `scripts/generate-demo-registry.d.mts`
- `scripts/validate-demo-registries.mjs`
- `scripts/validate-demo-registries.d.mts`
- `tests/demos/generate-demo-registry.test.ts`
- `tests/demos/registry-integrity.test.ts`
- `tests/demos/integration-bundle-regression.test.ts`
- `tests/server-only.ts`
- `vitest.config.ts`

### Notes

- Real component registries are the only demo metadata source; validation does not rewrite metadata.
- The generator does not read `registry.json`, and the public wrapper imports only the generated index.
- Existing runner-owned changes in `.ai/progress/current.md`, `.ai/run/current.json`, and `.ai/run/health.json` were preserved.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: passed (12 files / 73 tests)
- build: passed (Turbopack, 74 static pages generated)
- demos:registry: passed, idempotent (no diff after regeneration)
- demos:registry:check: passed
- git diff --check: passed

### Review

- Scope: passed — validation, generated-index integrity, six required failure proofs, `getDemosForComponent()` regression, integration regression, `registry.json` separation guard, and workflow rules all covered.
- Architecture: passed — real component registries remain the only metadata source; generator never reads `registry.json`; public wrapper imports only the generated index; no parallel metadata source; no new dependencies.
- Code: passed — reusable Node/TS helpers with contextual errors; no production source files changed; no dead code, temporary logging, or TODOs; `server-only` alias is Vitest-only and does not alter production imports.
- Out-of-scope changes: no

All six required failure cases are demonstrated by isolated tests: invalid registry metadata, duplicate slug, incorrect generated import/output, nonexistent/cross-group `sourcePath`, non-deterministic ordering, and broken public resolution. Integration regression covers simple, npm dependency, registry dependency, combined, and different-`componentSlug` demos through `getIntegrationBundle()` + `generateIntegrationPrompt()`. The five representative demos referenced by the integration tests exist and carry the asserted `componentSlug`/dependencies.

Note: `pnpm build` (Turbopack) passed in this review environment; the implementer-reported port-binding sandbox issue was not reproducible here, and the webpack build also passed.

### Result

- UI_REVIEW

### Requested changes

- None. UI reviewer must perform the final smoke review of `/components/button`, `/components/avatar`, `/components/alert-dialog`, and `/components/autocomplete`.

## Visual review

### Reviewed surfaces

- Routes `/components/[slug]` for: `button`, `avatar`, `alert-dialog`, `autocomplete` (the pages named in the spec's UI-review verification block).
- Demo cards (title, Preview/Code toggle, Code panel sections, Copy Prompt), shared page shell (header nav, language selector, back-to-catalog link, H1 header), desktop and mobile.

### Method

- Ran the app with `pnpm ai:dev:start` (Next.js 16.2, Turbopack, port 3000).
- Used Playwright (headless Chromium 1.62.1) for DOM-level verification: HTTP status, rendered card count, card IDs/titles, duplicate detection, Preview/Code/Copy Prompt interaction, clipboard payload, per-page console/page errors, failed requests, and mobile horizontal overflow.
- Screenshots written for desktop + mobile (full page) per route. Note: the review model could not view the screenshots as images; the DOM/behavior checks below are the authoritative evidence, consistent with the spec-012 review method.

### Checks

- Desktop: passed.
  - All 4 routes return 200.
  - Rendered demo-card counts match the component registries exactly: `button` 32, `avatar` 21, `alert-dialog` 18, `autocomplete` 5. Zero duplicates and zero missing demos.
  - Card H2 titles match each `registry.ts` title list 1:1 (32/21/18/5 titles, correct order).
  - Shared shell consistent on all 4 pages: header main-navigation, language selector, back-to-catalog link, `<main class="max-w-4xl">`, bordered/rounded demo cards.
  - Preview visible on load for every card.
  - Code view: for the first card of each page, toggling Code shows Usage / Required files / Dependencies / Registry dependencies sections with rendered `<pre><code>` blocks; toggling Preview returns to the preview.
  - Copy Prompt: clicking shows "Prompt copied" feedback and writes a real integration prompt to the clipboard (5.0 KB button, 3.8 KB avatar, 10.0 KB alert-dialog, 17.3 KB autocomplete).
  - Different-`componentSlug` case: alert-dialog entries declared with `componentSlug: "dialog"` render with `demo-dialog-*` IDs (15 on the page), not normalized to the folder slug — public resolution regression intact.
  - No failed requests on any page.
  - Browser console/page errors: `button`, `alert-dialog`, and `autocomplete` are clean (no console errors, no page errors). The `avatar` page reports pre-existing issues (nested `<button>` inside `DropdownMenuTrigger` in `src/demos/avatar/account-menu.tsx`, a `<script>`-tag warning, and a 404 from the external `i.pravatar.cc` service). All originate in demo content committed in `7fa8678`, are unchanged by this spec, and match the issues already documented in the spec-012 visual review. Out of scope.
- Mobile: passed.
  - No horizontal overflow on `button`, `avatar`, or `alert-dialog`.
  - `autocomplete` reports 35 px horizontal overflow. Same source isolated in spec 012: the page-template `DetailSection` blocks driven by `registry.json` (`src/components/component-detail.tsx`), which spec 014 does not modify. Pre-existing, not a regression.
- Visual navigation: passed. Page shell identical across the 4 routes; no screen-specific copy introduced.
- Visible states: passed. Preview/Code toggle, empty-deps (`None.`), and Copy Prompt "Prompt copied" feedback render correctly; no empty-state regression.

### Result

- REVIEW

### Requested changes

- None.

### Notes

- Regression-only review as required. Spec 014 changed no production source files (`git diff --stat` over `src/`, `registry.json`, and `src/components/component-detail.tsx` is empty), so the only observable behavior expected was that the demo pages continue to resolve through the refactored registry — confirmed.
