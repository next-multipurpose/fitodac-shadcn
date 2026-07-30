# 002 — Button demo coverage

Status: DONE
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

### Changes

- Added reusable `Variants` and `Sizes` button demos and registered them in the
  central demo registry.
- Covered all public variants, text sizes, and icon sizes with the real registry
  `Button`; icon-only examples include accessible labels.
- Used wrapping layouts and the installed Lucide icon source without adding
  dependencies.

### Tests / verification

- `./init.sh`: passed.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: environment-blocked because Turbopack could not bind an internal
  port (`Operation not permitted`).
- `pnpm exec next build --webpack`: passed; generated all 72 static pages.
- Focused Prettier check and `git diff --check`: passed.
- Browser desktop/mobile verification: pending UI reviewer; the sandbox did not
  permit the dev server to bind a port.
- No-demo fallback: unchanged central `[]` fallback and shared fallback UI;
  production static generation passed for components without registered demos.

### Modified files

- `src/demos/button/variants.tsx`
- `src/demos/button/sizes.tsx`
- `src/demos/registry.ts`
- `.ai/specs/002-button-demo-coverage.md`

### Notes

- No dependencies, global styles, registry component APIs, or route-specific
  logic changed.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: not available
- build: passed (72 static pages, including `/components/button`)

### Review

- Scope: passed — all acceptance criteria covered (variants, text sizes, icon sizes, accessible labels, wrapping layout, no-demo fallback, no new deps, no global theme changes).
- Architecture: passed — follows spec 001 demo system; no new registry, no route-specific logic, no parallel component, no API changes.
- Code: passed — clean components, real `Button` import, proper TypeScript, no dead code, no logging, no TODOs.
- Out-of-scope changes: no — changed files are only `variants.tsx`, `sizes.tsx`, `registry.ts`, and harness tracking files.
- Dependencies: no new dependencies.
- Styling: no global style changes; uses current theme and component classes.

### Result

- UI_REVIEW

### Notes

UI review required per spec (touches visible components, responsive layout). Desktop and mobile browser verification on `/components/button` is pending.

## Visual review

### Reviewed surfaces

- `/components/button` — Default demo, Variants demo, Sizes demo, technical metadata sections
- `/components/accordion` — no-demo fallback
- Site shell: header with branding and main navigation, back-link pattern

### Checks

- Desktop (1280×900): **passed** — all 3 demo sections render with correct buttons; all 6 variants visible; all 4 text sizes visible; all 4 icon sizes visible; icon-only buttons have `aria-label`; flex-wrap containers prevent overflow; technical metadata (Archivos, Dependencias, Dependencias del registry) present.
- Mobile (375×812): **passed** — no horizontal overflow; flex-wrap layout wraps cleanly on narrow viewport; all buttons remain accessible.
- Visual navigation: **passed** — header (Fitodac UI + Componentes) and "← Volver al catálogo" back link unchanged.
- Visible states: **passed** — no loading/empty/error states; all demos render immediately; no-demo fallback shows "Todavía no hay ejemplos disponibles" for components without demos.
- Screenshots: `ui-review-desktop.png` (29 KB), `ui-review-mobile.png` (23 KB) saved to `.ai/run/logs/`.
- Browser console errors: **none**.

### Result

- **REVIEW**

### Requested changes

None.
