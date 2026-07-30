# 006 — Component regression test foundation

Status: DRAFT
Role: implementer
UI Review: skip
Tooling policy: stop-with-blocker

## Goal

Establish the automated component-testing foundation required to protect `fitodac/shadcn` primitives and components from regressions.

The repository currently has no `test` script or installed component test runner, and the main TypeScript configuration excludes `src/registry`. This spec must create a repeatable test path that executes through the Lean AI Harness and can be extended by every future component spec.

Work only on branch `migration-to-demo-site`.

Prerequisites:

- Specs 003, 004, and 005 must be `DONE` before this spec is promoted to `READY`.

## Scope

### Test stack

Add a focused test stack using:

- Vitest;
- React Testing Library;
- `@testing-library/user-event`;
- `@testing-library/jest-dom`;
- jsdom;
- the React/Vite integration required by Vitest.

Use dev dependencies only.

Do not add Jest, Cypress, Storybook, or another parallel test framework.

### Configuration

Add a Vitest configuration suitable for the current React + Next.js + TypeScript project.

Requirements:

- jsdom environment for React component tests;
- support the existing `@/* -> ./src/*` alias;
- central test setup file;
- deterministic non-watch execution for CI/harness;
- test files isolated from production bundles;
- no dependency on a running Next.js dev server.

Add scripts equivalent to:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

The exact script names may follow project conventions, but `pnpm test` must run the full non-watch suite and exit.

`./init.sh` already runs `pnpm test` automatically when the script exists. Preserve that behavior; do not duplicate test execution inside `init.sh`.

### Shared test setup

Create a minimal shared setup for:

- DOM cleanup between tests;
- jest-dom matchers;
- only the browser API shims actually required by the tested Radix/React components.

Do not create broad mocks that hide real component behavior.

### Initial primitive contract

Add the first contract test for the real registry `Button`.

At minimum verify:

- default button renders as a native button;
- children are rendered;
- common native props are forwarded;
- disabled behavior is preserved;
- representative public variants produce their expected semantic styling contract;
- representative sizes produce their expected sizing contract;
- `asChild` preserves the public composition behavior if it is part of the current API.

Do not snapshot the entire rendered HTML as the primary assertion.

Prefer behavioral, accessibility, and focused semantic-class assertions.

### Harness and documentation

Update stable project guidance so future component work uses the suite.

Update `.ai/rules.md` with a concise rule equivalent to:

- adding or modifying a file under `src/registry/primitives/` or `src/registry/components/` requires automated tests for the affected public contract;
- existing tests must not be weakened or deleted to make a component change pass;
- dependent components must be considered when a shared primitive changes.

Update `docs/verification.md` so `pnpm test` is a required verification step once the test script exists.

Do not add task-specific implementation details to `.ai/rules.md`.

## Out of scope

- Cross-component dependency contract tests; those belong to spec 008.
- E2E/browser visual regression infrastructure.
- Screenshot baselines.
- Testing async Server Components with Vitest.
- Repository-wide fixes to existing registry source.
- Removing `src/registry` from the existing main `tsconfig.json` exclude list in this spec.
- Increasing test coverage by adding tests for every existing primitive.
- Production UI changes.

## Acceptance criteria

- `pnpm test` exists and runs Vitest in non-watch mode.
- The suite runs without a Next.js server.
- The existing `@/` alias works in tests.
- DOM state is cleaned between tests.
- jest-dom matchers are available.
- The real `Button` implementation is imported from `src/registry/primitives/button.tsx`.
- Button tests verify behavior/public contract rather than only module import success.
- `./init.sh` automatically executes the new test script through its existing project-check flow.
- `.ai/rules.md` requires tests for future registry component changes.
- `docs/verification.md` documents `pnpm test` as required project evidence.
- No production component API is changed.
- No new production dependency is added.
- The suite is deterministic and passes from a clean checkout after dependency installation.

## Architecture

Decision required: no.

Technical testing choice:

- use Vitest + React Testing Library + jsdom for synchronous React unit/component/integration tests;
- use build/browser verification for surfaces that require async Server Components or a real browser;
- keep one test framework rather than introducing parallel unit-test stacks.

Rationale:

- the project has no current test framework;
- the requested feature explicitly requires component regression tests;
- the stack fits the current React/Next/TypeScript project and does not affect runtime production code.

Important existing constraint:

`tsconfig.json` currently excludes `src/registry`, so `pnpm typecheck` alone is not accepted as evidence that registry components are safe. Tests must import real registry components directly.

## Relevant files

Existing:

- `package.json`
- `pnpm-lock.yaml`
- `init.sh`
- `tsconfig.json`
- `.ai/rules.md`
- `docs/verification.md`
- `src/registry/primitives/button.tsx`

Expected additions may include:

- `vitest.config.ts`
- `tests/setup.ts`
- `tests/primitives/button.test.tsx`

Follow the established `tests/` directory if present.

## Verification

Run:

```bash
pnpm test
pnpm lint
pnpm typecheck
./init.sh
RUN_BUILD=1 ./init.sh
```

Verify:

- tests run once and exit under `pnpm test`;
- Button contract test fails when a tested contract is intentionally broken, then passes after reverting the temporary local mutation;
- test failures cause `./init.sh` to fail;
- production build remains green;
- no dev server is required.

Do not commit any intentional mutation used to prove the regression guard.

## Implementation report

### Changes

- Added Vitest, React Testing Library, user-event, jest-dom, jsdom, Vite, and
  the React Vite plugin as dev-only manifest entries, plus deterministic
  `test` and `test:watch` scripts.
- Added jsdom Vitest configuration with the existing `@/*` alias and a central
  cleanup/jest-dom setup file.
- Added focused behavioral and semantic-contract tests for the real registry
  `Button`, including native props, disabled behavior, variants, sizes, and
  `asChild`.
- Added the stable registry-test rule and required `pnpm test` verification
  guidance.

### Tests / verification

- Graphify CLI query: passed.
- `package.json` JSON parse: passed.
- `git diff --check`: passed.
- `pnpm test`: blocked (`vitest: command not found`) because dependency
  installation could not complete.
- `pnpm lint`, `pnpm typecheck`, `./init.sh`, and `RUN_BUILD=1 ./init.sh`: not
  run because `node_modules` could not be restored in this restricted runtime.
- Intentional contract-break regression proof: not run because Vitest is not
  installed.

### Modified files

- `package.json`
- `vitest.config.ts`
- `tests/setup.ts`
- `tests/primitives/button.test.tsx`
- `.ai/rules.md`
- `docs/verification.md`
- `.ai/specs/006-component-test-foundation.md`

### Notes

- Product/configuration work is present, but the spec cannot advance to
  `TECH_REVIEW` without an installed suite and generated `pnpm-lock.yaml`
  entries.
- `pnpm add -D ...` first failed because the existing `node_modules` used
  `/Volumes/external-ssd/.pnpm-store/v10`, which this runtime cannot update.
  A workspace-local reinstall then failed because
  `registry.npmjs.org` is unavailable (`ENOTFOUND`) and removed the previous
  `node_modules` links. Run `pnpm install`, then the spec verification commands,
  in an environment with registry access.

## Technical review

Pending.

## Visual review

Not applicable unless production UI files are unexpectedly modified.
