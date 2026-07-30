# 005 — Copyable AI integration prompt per demo

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must verify the final actions and responsive demo-card presentation before this spec can reach `REVIEW`.
