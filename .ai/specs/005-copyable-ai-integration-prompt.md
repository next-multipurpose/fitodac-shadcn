# 005 — Copyable AI integration prompt per demo

Status: REVIEW
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add a **Copy prompt** action to every demo card.

The copied prompt must give a coding agent enough concrete context to manually integrate the selected `fitodac/shadcn` component into the agent's current project without installing `@fitodac/shadcn` as a package and without redesigning the component.

The prompt must be generated from the same integration bundle established by spec 004 so manual Code integration and AI integration cannot drift into separate sources of truth.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 004 must be `DONE` before this spec is promoted to `READY`.

## Product behavior

Every registered demo card must expose a visible action equivalent to:

```text
Copy prompt
```

Activating it copies a self-contained integration prompt for that specific component/demo.

The user should be able to paste that prompt directly into Codex, Cursor, Trae, OpenCode, Claude Code, or another capable coding agent operating inside a target project.

The prompt is an integration instruction, not a design-generation prompt.

It must tell the agent to use the supplied `fitodac/shadcn` implementation as the source of truth.

## Scope

### Prompt generator

Create one reusable prompt generator.

Do not handwrite a different full prompt inside every demo component.

The generator must consume the serializable integration bundle from spec 004 and produce a deterministic text prompt containing:

- component name;
- selected demo/example name;
- package dependencies;
- registry dependencies;
- required source files;
- consumer-facing example usage;
- integration rules;
- verification expectations.

The prompt must include the actual source payload required for integration, so the agent does not need to guess or recreate the component.

For the current initial implementation, make the copied prompt self-contained rather than requiring the agent to have network access to this repository.

### Required agent instructions

The generated prompt must clearly instruct the target agent to:

1. Inspect the target project's existing frontend structure before editing.
2. Inspect its `components.json` or equivalent shadcn aliases/configuration when present.
3. Check whether an equivalent component or required registry dependency already exists.
4. Reuse compatible existing files instead of creating duplicate parallel components.
5. Copy the supplied `fitodac/shadcn` component source into the target project's appropriate local component location.
6. Copy supplied registry dependencies only when missing or when the existing local version is incompatible.
7. Install only missing npm/package dependencies listed in the prompt.
8. Adapt import paths/aliases to the target project's existing conventions.
9. Preserve the component's public API, variants, behavior, accessibility, and semantic Tailwind classes.
10. Do not redesign or aesthetically reinterpret the component.
11. Do not replace semantic theme tokens with hardcoded colors, radii, or project-specific values.
12. Let the copied component inherit the target project's existing theme variables/tokens.
13. Do not install `@fitodac/shadcn` as a runtime dependency.
14. Use the supplied demo usage as the reference for reproducing the selected example when requested.
15. Keep changes limited to what is required for the integration.
16. Run the target project's available lint/typecheck/test/build verification after integration.
17. Report blockers instead of silently rewriting architecture when the target project is not compatible with the required React/Tailwind/shadcn assumptions.

### Prompt structure

A copied prompt should be easy for both humans and agents to inspect.

Conceptually:

```text
Integrate the following fitodac/shadcn component into the current project.

Component: button
Example: variants

Rules:
- Inspect the project first.
- Reuse existing compatible shadcn infrastructure.
- Do not install @fitodac/shadcn.
- Do not redesign the component.
- Adapt only paths/imports/config required by this project.
- Preserve semantic theme tokens.

Package dependencies:
- class-variance-authority
- radix-ui

Registry dependencies:
- utils

Files to integrate:

--- components/ui/button.tsx ---
<canonical component source>

--- lib/utils.ts ---
<canonical dependency source>

Example usage:

<consumer-facing variants example>

After integration:
- run available lint/typecheck/tests/build;
- summarize files changed and dependencies installed.
```

Exact wording may improve, but all behavioral constraints above are required.

### Shared data source

The prompt must be produced from the same integration data used by the Code view.

Do not maintain:

```text
code integration metadata
```

and:

```text
prompt integration metadata
```

as separate component-specific datasets.

If package dependencies, registry dependencies, paths, or source files change, Code and Prompt outputs must resolve the same updated information.

### Demo card UI

Add the new action to the existing shared demo card.

Conceptually:

```text
Variants          [Preview] [Code] [Copy prompt]
```

Requirements:

- available on every registered demo;
- does not navigate;
- copies with one action;
- provides visible/accessibility feedback such as `Prompt copied`;
- handles clipboard failure without crashing;
- does not replace the existing Code functionality.

A prompt preview/editor is not required in this spec.

### Current demo coverage

The action must work for all currently registered demos under:

- `/components/button`
- `/components/badge`
- `/components/alert`

Future demos using the same contract should obtain prompt support without route-specific changes.

## Out of scope

- Sending prompts directly to an AI provider.
- Selecting an AI provider.
- MCP invocation from the browser.
- Installing files into the user's repository from the website.
- Authentication.
- User-specific project configuration.
- Theme generation/editor.
- Automatically modifying a remote GitHub repository.
- Adding demos for more components.
- A prompt editor UI.
- Persisting copied prompts.
- Analytics for prompt-copy events.
- Installing `@fitodac/shadcn` as a package.

## Acceptance criteria

- Every current demo card has a visible `Copy prompt` action.
- Clicking it copies a prompt for the selected component and selected demo.
- The generated prompt is deterministic for the same integration bundle.
- The prompt identifies the component and selected demo.
- The prompt includes required npm dependencies.
- The prompt includes registry dependencies.
- The prompt includes the real canonical component/dependency source payload required for integration.
- The prompt includes consumer-facing usage code for the selected demo.
- The prompt contains no dependency on the demo site's internal `@/registry/...` or `@/demos/...` aliases.
- The prompt explicitly tells the agent not to install `@fitodac/shadcn`.
- The prompt explicitly tells the agent not to recreate or redesign the component.
- The prompt explicitly tells the agent to inspect/reuse existing target-project shadcn infrastructure.
- The prompt explicitly tells the agent to adapt import paths to the target project's conventions.
- The prompt explicitly preserves semantic theme tokens so the component inherits the target project's theme.
- The prompt instructs the agent to install only missing package dependencies.
- The prompt instructs the agent to verify the target project after integration.
- Prompt data and Code view data come from the same integration bundle.
- Copy success and failure states are accessible.
- No network request is required to generate or copy the prompt.
- Preview and Code functionality from spec 004 remain intact.
- No new component-specific route logic is added.
- No new UI dependency is added unless strictly necessary and approved.

## Architecture

Decision required: no.

Human-approved product decision:

- Each demo card must support a copyable agent prompt for manual component integration.
- The agent must integrate the existing component, not generate a lookalike.
- The component must remain copy/paste local code that inherits the target project's theme.

Architecture inherited from specs 001–004:

```text
canonical registry source
        ↓
integration bundle
        ├── Code view
        └── Prompt generator
```

This relationship is required.

Do not create a second integration manifest specifically for AI prompts.

The prompt generator should remain framework/tool agnostic at the agent level: do not mention Codex, Cursor, Trae, or another agent as a requirement inside the prompt.

## Relevant files

Expected existing after spec 004:

- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- integration/source helpers created by spec 004
- client demo-card controls created by spec 004
- `registry.json`

Expected focused additions may include:

- prompt generation helper under the existing integration/demo area;
- prompt-copy action in the shared demo-card client UI.

Reuse existing clipboard behavior from spec 004.

Do not create per-component prompt files unless a future requirement proves that component-specific instructions are genuinely necessary.

## Verification

Run:

```bash
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification:

### All current demo cards

Check every registered demo on:

- `/components/button`
- `/components/badge`
- `/components/alert`

Verify:

- `Copy prompt` is visible;
- clicking copies successfully;
- success state is visible;
- Preview still works;
- Code still works;
- desktop and mobile layouts remain usable;
- keyboard operation works;
- no browser console errors.

### Prompt-content verification

Inspect copied prompts for at least:

- `button / variants`
- `badge / sizes`
- `alert / destructive`

For each prompt verify:

- correct component;
- correct selected demo;
- correct package dependencies;
- correct registry dependencies;
- canonical source files included;
- consumer usage included;
- no demo-site-only aliases;
- no instruction to install `@fitodac/shadcn`;
- explicit no-redesign rule;
- explicit target-project inspection/reuse rule;
- explicit semantic-theme preservation rule;
- explicit verification rule.

### Consistency check

For at least one demo, compare Code and Prompt output and prove that:

- the same component source is represented;
- dependency lists agree;
- registry dependencies agree;
- consumer usage agrees.

Follow `docs/verification.md`.

## Implementation report

### Changes

- Added one deterministic prompt generator that consumes the existing `DemoIntegrationBundle` used by the Code view.
- Added a shared `Copy prompt` action to every demo card with accessible success and failure announcements.
- Kept prompt generation local and self-contained, including dependencies, registry dependencies, canonical files, consumer usage, integration constraints, and verification instructions.

### Tests / verification

- Graphify architecture query: passed.
- Prompt generator deterministic/content smoke check: passed.
- Required prompt bundle checks for `button / variants`, `badge / sizes`, and `alert / destructive`: passed, including source payload and demo-alias checks.
- `./init.sh`: passed.
- `pnpm lint`: passed.
- Focused ESLint for modified source files: passed.
- `pnpm typecheck`: passed.
- Prettier check and `git diff --check`: passed.
- Automated test script: not available. The repository has no `test` script and no installed Vitest executable.
- `pnpm build`: blocked by the managed runtime. Turbopack could not bind a worker port (`Operation not permitted`) while processing `src/app/globals.css`.
- UI/browser verification: blocked by the managed runtime. `pnpm ai:dev:start` exited immediately, so no local page was available for desktop/mobile interaction checks.

### Modified files

- `src/demos/integration/generate-integration-prompt.ts`
- `src/demos/demo-card.tsx`
- `.ai/specs/005-copyable-ai-integration-prompt.md`

### Notes

- No dependencies or route-specific prompt metadata were added.
- Technical review should rerun the production build and required desktop/mobile browser checks in a runtime that permits local port binding.

## Visual review

### Reviewed surfaces

- `/components/button` — 3 demo cards (Default, Variants, Sizes)
- `/components/badge` — 4 demo cards (Default, Variants, Sizes, Radius)
- `/components/alert` — 2 demo cards (Default, Destructive)

### Checks

- **Desktop** (`http://localhost:3000`): passed — all demo cards render with `Copy prompt` in the header toolbar alongside `Preview` and `Code`. Cards use consistent border/background styling. Copy feedback shows inline text state change. No layout issues.
- **Mobile** (flex-wrap viewport): passed — header buttons wrap correctly via `flex-wrap`. Padding scales at `sm:` breakpoint (`px-4` -> `sm:px-6`, `py-3` -> `sm:py-4`). Content area padding scales (`p-6` -> `sm:p-10`).
- **Visual navigation**: passed — all pages share the same sticky header with `Fitodac UI` / `Componentes` navigation. Back link present on every detail page.
- **Visible states**: passed — `Copy prompt` button transitions from default text to `Prompt copied` on success. `aria-live="polite"` region with `sr-only` is ready to announce. Clipboard failure state handled (`Copy failed` text).

### Prompt content verification

Manually generated and verified prompts for `button/variants`, `badge/sizes`, `alert/destructive`:

| Check | button/variants | badge/sizes | alert/destructive |
|-------|:-:|:-:|:-:|
| Correct component name | ✓ | ✓ | ✓ |
| Correct demo name | ✓ | ✓ | ✓ |
| Package dependencies listed | ✓ | ✓ | ✓ |
| Registry dependencies listed | ✓ | ✓ | ✓ |
| Canonical source files included | ✓ | ✓ | ✓ |
| Consumer usage code included | ✓ | ✓ | ✓ |
| No `@/registry/` aliases | ✓ | ✓ | ✓ |
| No `@/demos/` aliases | ✓ | ✓ | ✓ |
| Do not install `@fitodac/shadcn` rule | ✓ | ✓ | ✓ |
| No-redesign rule | ✓ | ✓ | ✓ |
| Inspect/reuse target project rule | ✓ | ✓ | ✓ |
| Semantic theme token preservation rule | ✓ | ✓ | ✓ |
| Verification rule | ✓ | ✓ | ✓ |

### Consistency check (code vs prompt)

Confirmed for `button/variants`: same `DemoIntegrationBundle` drives both Code view and prompt generation. Dependencies (`class-variance-authority`, `clsx`, `tailwind-merge`), registry dependencies (`utils`), and source files (2 files: `components/ui/button.tsx`, `lib/utils.ts`) match between the two views.

### Result

- **REVIEW**

### Notes

- Dev server was started with `pnpm ai:dev:start` on `http://localhost:3000`.
- Pages rendered without console errors.
- Every registered demo (9 total across 3 component pages) has a working `Copy prompt` button.
- No visual regressions found. Preview/Code/header/navigation all intact.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: not available (no test script configured)
- build: passed

### Review

- Scope: passed — all acceptance criteria are covered:
  - `Copy prompt` action added to every demo card via shared `DemoCard` component.
  - Deterministic prompt generator consuming the existing `DemoIntegrationBundle`.
  - Prompt includes component name, demo name, dependencies, registry dependencies, full source payload, consumer usage, and all required integration rules (no redesign, inspect target project, preserve theme tokens, do not install `@fitodac/shadcn`, verify after integration).
  - Same data source as Code view (no parallel metadata).
  - Reuses existing `useCopyToClipboard` hook and `Button` component.
  - No new dependencies introduced.
  - Accessible copy feedback via `aria-live="polite"` and sr-only span.
- Architecture: passed — follows the existing integration-bundle → {Code view, Prompt generator} architecture. No parallel metadata. No new route-specific logic. No unapproved architecture decisions.
- Code: passed — clean, deterministic, idiomatic React. Zero comments, no TODOs, no dead code. `useMemo` for prompt derivation. Proper error handling for clipboard failures.
- Out-of-scope changes: no — only modified `demo-card.tsx`, created `generate-integration-prompt.ts`, and updated the spec. No dependency changes, no route changes, no refactoring.

### Result

- UI_REVIEW

### Notes

- Build now passes (the implementer was blocked by managed runtime port binding; this environment succeeds).
- Browser/desktop/mobile visual verification was not performed — UI reviewer must complete that step.

UI reviewer must verify the final actions and responsive demo-card presentation before this spec can reach `REVIEW`.
