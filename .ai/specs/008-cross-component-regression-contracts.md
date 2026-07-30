# 008 — Cross-component dependency regression contracts

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Create regression tests for real component-to-component dependencies so changing a shared primitive cannot silently break components that consume it.

The initial reference dependency is:

```text
Button
├── AlertDialog
└── Calendar
```

Both current consumer implementations use `Button`/`buttonVariants`, so a breaking change to the Button contract must be detected by the full test suite before the change can be accepted.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Specs 006 and 007 must be `DONE`.

## Scope

### Registry dependency integrity tests

Add automated tests for the registry dependency graph.

At minimum verify:

- registry item names are unique;
- every `registryDependencies` entry references an existing registry item;
- a component cannot depend on itself directly;
- malformed dependency metadata fails loudly.

Do not silently filter invalid metadata.

These graph tests are structural guards, not substitutes for component behavior tests.

### Button → AlertDialog regression contract

Add an integration/contract test using the real:

- `Button` contract through `buttonVariants`;
- `AlertDialog`;
- `AlertDialogTrigger`;
- `AlertDialogContent`;
- `AlertDialogTitle`;
- `AlertDialogDescription`;
- `AlertDialogAction`;
- `AlertDialogCancel`.

The test must exercise actual composition.

At minimum verify:

- trigger opens the alert dialog;
- title/description/content become accessible when open;
- cancel closes it;
- action path behaves correctly;
- `AlertDialogAction` preserves the intended default Button semantic styling contract;
- `AlertDialogCancel` preserves the intended outline Button semantic styling contract.

Do not test by mocking `buttonVariants`.

The point is to fail if a real Button change breaks AlertDialog.

### Button → Calendar regression contract

Add a contract test using the real Calendar implementation.

At minimum verify:

- Calendar renders without runtime/import failure;
- previous and next navigation controls render;
- navigation controls preserve the intended Button-derived semantic variant contract;
- basic month navigation remains usable when supported by the current component API/test environment.

Known pre-existing condition:

`src/registry/primitives/calendar.tsx` currently imports Button through an invalid relative path:

```ts
import { Button, buttonVariants } from "./registry/primitives/button"
```

The intended local primitive dependency is the sibling Button module.

This spec may make the minimal import-path correction required to establish the Button → Calendar contract.

Do not refactor Calendar beyond that narrowly required correction unless a test exposes another direct blocker and the reviewer accepts it as in-scope.

### Shared primitive change policy

Update `.ai/rules.md` with a stable regression rule for all future registry work:

When a spec adds or modifies a primitive/component under:

```text
src/registry/primitives/
src/registry/components/
```

the implementer must:

1. test the changed component's public contract;
2. inspect `registry.json` and Graphify for direct/transitive consumers;
3. run existing dependent contract tests;
4. add/update a dependent integration test when a new meaningful component-to-component relationship is introduced;
5. never delete/weaken a regression test solely to allow a changed primitive API or style to pass;
6. document intentional contract changes explicitly in the spec.

Update `docs/verification.md` with the same operational expectation in verification terms.

### Regression philosophy

Do not make full DOM snapshots the primary protection.

Use:

- accessibility/role assertions;
- user interactions;
- public prop behavior;
- focused semantic Tailwind-class contracts when the dependent intentionally inherits styling from another primitive;
- registry graph integrity.

Snapshots may be used only when they add specific value and remain small/stable.

## Out of scope

- Full visual screenshot regression infrastructure.
- Testing every component in the registry in this spec.
- Storybook.
- Cypress.
- Rewriting registry architecture.
- Automatically rewriting dependent components after a primitive change.
- Weakening Button, AlertDialog, or Calendar contracts to satisfy tests.
- Broad Calendar cleanup.
- Tests for async Next.js Server Components.

## Acceptance criteria

- `pnpm test` contains registry dependency integrity coverage.
- Invalid `registryDependencies` references cause tests to fail.
- AlertDialog regression tests use the real Button-derived styling behavior.
- Breaking the tested Button default/outline contract causes the AlertDialog contract test to fail.
- AlertDialog open/cancel/action behavior is exercised.
- Calendar regression test imports the real Calendar and real Button dependency.
- The known invalid Calendar Button import path is corrected minimally.
- Breaking the tested Button navigation variant contract causes the Calendar contract test to fail.
- Button's own primitive contract tests from spec 006 still pass.
- `.ai/rules.md` requires dependent-impact analysis for future registry changes.
- `docs/verification.md` requires dependent regression verification.
- `./init.sh` runs the complete suite because `pnpm test` exists.
- No test mocks away the shared primitive being protected.
- No broad production refactor is introduced.

## Architecture

Decision required: no.

Human-approved objective:

- shared primitive changes must be regression-tested against components that consume them.

Testing model:

```text
Primitive contract
       +
Dependency graph integrity
       +
Dependent integration contracts
       =
Regression guard
```

This deliberately combines static structure with behavior.

A passing primitive test alone is insufficient when the primitive has downstream consumers.

### Future component rule

When a new meaningful cross-component dependency is created, the same spec that introduces it must add a dependent contract test.

Example:

```text
new Modal -> Button
```

requires both:

```text
Modal behavior contract
Button -> Modal regression contract
```

when the Modal relies on Button behavior/API/styling.

## Relevant files

Existing:

- `registry.json`
- `src/registry/primitives/button.tsx`
- `src/registry/primitives/alert-dialog.tsx`
- `src/registry/primitives/calendar.tsx`
- `.ai/rules.md`
- `docs/verification.md`

From spec 006:

- Vitest configuration
- shared test setup
- Button primitive tests

Expected additions may include:

- `tests/registry/dependency-integrity.test.ts`
- `tests/contracts/button-alert-dialog.test.tsx`
- `tests/contracts/button-calendar.test.tsx`

Use equivalent naming if the established test layout is clearer.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

### Prove AlertDialog protection

Using an uncommitted temporary mutation:

- change one tested Button contract used by AlertDialog;
- run the relevant contract test;
- confirm it fails;
- revert the temporary mutation;
- confirm it passes.

### Prove Calendar protection

Repeat with a tested Button contract used by Calendar navigation.

Do not commit temporary mutations.

### Registry guard

Temporarily add an invalid `registryDependencies` name in-memory or through a reversible local mutation:

- test must fail;
- revert;
- suite must pass.

### UI review

Because the spec includes a minimal production fix to Calendar and protects visible component contracts, UI reviewer must check:

- AlertDialog representative composition;
- Calendar representative render/navigation;
- existing Button demos;
- no visual regression from the Calendar import correction.

If AlertDialog/Calendar do not yet have public demo pages, use an isolated browser test surface only if one already exists; do not add permanent product pages solely for review.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.
