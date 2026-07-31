# 014 — Demo registry integrity, integration regression, and workflow guards

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must validate the final registry refactor did not alter visible demo behavior.
