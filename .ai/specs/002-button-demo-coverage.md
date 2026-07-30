# 002 — Button demo coverage

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Expand the reusable demo system established by spec 001 so
`/components/button` documents the real `Button` API with representative visual
examples.

Work only on branch `migration-to-demo-site`.

## Scope

- Reuse the demo registry and `ComponentDemo` foundation from spec 001.
- Keep the existing default button demo.
- Add a `Variants` demo for the real public variants currently exposed by
  `buttonVariants`:
  - `default`
  - `destructive`
  - `outline`
  - `secondary`
  - `ghost`
  - `link`
- Add a `Sizes` demo that represents the public size API:
  - text-button sizes: `xs`, `sm`, `default`, `lg`;
  - icon sizes: `icon`, `icon-xs`, `icon-sm`, `icon-lg`.
- Icon-only examples must have an accessible label.
- Use an already installed icon source if needed; do not add a dependency.
- Ensure examples wrap cleanly and remain readable on narrow viewports.
- Register all button demos through the central demo registry.
- Use the real `Button` from `src/registry/primitives/button.tsx`.
- Keep styling dependent on the current semantic theme and component classes.

## Out of scope

- Changing the public `Button` API.
- Redesigning `Button`.
- Adding new variants or sizes.
- Code/Prompt tabs.
- Copy actions.
- Theme editor or new theme tokens.
- Demos for other components.
- Refactoring the registry or unrelated component source.
- New dependencies.

## Acceptance criteria

- `/components/button` displays at least these sections through the shared demo
  system:
  - Default
  - Variants
  - Sizes
- Every existing public button variant is visibly represented.
- Text sizes `xs`, `sm`, `default`, and `lg` are visibly represented.
- Icon sizes `icon`, `icon-xs`, `icon-sm`, and `icon-lg` are visibly
  represented.
- Icon-only controls have accessible names.
- All examples import and render the real registry `Button`.
- The demos do not duplicate `Button` styling or implementation.
- Layout wraps without clipping or horizontal overflow at mobile width.
- Technical registry metadata remains visible after demos.
- The no-demo fallback introduced by spec 001 still works for components without
  demo definitions.
- No new dependency is added.
- No global theme change is required.

## Architecture

Decision required: no.

This spec extends the human-approved architecture from spec 001:

- demo-only files stay outside `src/registry/`;
- the central demo registry remains the only slug-to-demo mapping;
- `ComponentDemo` remains the shared presentation shell;
- route-specific hardcoding is not allowed;
- the source `Button` remains the single component implementation.

Do not add a second demo registry or component-specific routing logic.

## Relevant files

Existing:

- `src/registry/primitives/button.tsx`
- `src/app/components/[slug]/page.tsx`
- `src/app/globals.css`

Created by spec 001, expected:

- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- `src/demos/button/`

Expected additions may include:

- `src/demos/button/variants.tsx`
- `src/demos/button/sizes.tsx`

Use equivalent names only if the established structure from spec 001 requires
them.

## Verification

Run:

```bash
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification on `/components/button`:

- desktop viewport;
- mobile viewport;
- Default demo;
- all public variants;
- text sizes;
- icon sizes;
- wrapping and spacing;
- no horizontal overflow;
- no visible browser errors;
- technical metadata remains available.

Also smoke-check one valid component without demos to ensure the fallback from
spec 001 is unchanged.

Follow `docs/verification.md`.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must verify `/components/button` in a browser on desktop and mobile
before this spec can reach `REVIEW`.
