# 003 — Badge and alert demo coverage

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add initial visual documentation for the real `Badge` and `Alert` primitives
using the reusable demo architecture, then verify the first three documented
component pages together.

Work only on branch `migration-to-demo-site`.

## Scope

### Badge

- Add `badge` demos through the existing central demo registry.
- Import and render the real implementation from
  `src/registry/primitives/badge.tsx`.
- Provide representative demos for:
  - default usage;
  - base variants that work with the current site theme, at minimum `default`,
    `outline`, and `secondary`;
  - sizes `xs`, `sm`, `default`, `lg`, and `xl`;
  - radius modes `default` and `full`.
- Additional semantic variants may be demonstrated only if their required
  semantic theme tokens already exist and render correctly in the current demo
  site.
- Do not add global theme tokens merely to make optional badge variants
  demonstrable.

### Alert

- Add `alert` demos through the existing central demo registry.
- Import and render the real implementations from
  `src/registry/primitives/alert.tsx`.
- Demonstrate:
  - `default`;
  - `destructive`;
  - title and description composition.
- Additional existing exported alert composition may be shown when useful, but
  do not introduce unrelated component dependencies solely for decoration.

### Cross-page validation

- Keep `/components/button`, `/components/badge`, and `/components/alert`
  consistent in demo presentation.
- Preserve technical metadata on all three pages.
- Keep the valid-no-demo fallback working for other registry items.
- Apply only minimal responsive/layout corrections to the shared demo shell if
  cross-page review exposes a reusable clipping, wrapping, spacing, or overflow
  defect.
- Do not use cross-page validation as permission to redesign the demo shell.

## Out of scope

- New `Badge` or `Alert` variants.
- New theme tokens.
- Theme editor or theme presets.
- Code/Prompt UI.
- Copy actions.
- Broad fixes to registry metadata/path migration.
- Broad refactors of `Badge`, `Alert`, or unrelated primitives.
- Adding dependencies.
- Creating demos for the rest of the catalog.
- Redesigning the shared demo shell.

## Acceptance criteria

- `/components/badge` renders real badge examples through the shared demo
  architecture.
- Badge examples visibly cover:
  - default usage;
  - `default`, `outline`, and `secondary` variants;
  - all current public sizes;
  - both current radius modes.
- Optional semantic badge variants are not shown with broken/missing theme
  semantics.
- `/components/alert` renders real alert examples through the shared demo
  architecture.
- Alert examples visibly cover `default` and `destructive`.
- Alert examples use the real `Alert`, `AlertTitle`, and `AlertDescription`
  composition.
- `/components/button`, `/components/badge`, and `/components/alert` share the
  same demo presentation pattern.
- All three pages prioritize demos before technical metadata.
- All three pages remain readable on desktop and mobile without horizontal
  overflow.
- A valid registry slug with no demos continues to render a graceful fallback.
- Unknown slugs retain existing 404 behavior.
- No new dependency is added.
- No global theme variables are added for this task.
- No Code or Prompt controls are introduced.

## Architecture

Decision required: no.

This spec uses the architecture approved and implemented by specs 001–002:

- distributable code stays in `src/registry/`;
- site-only demo code stays outside `src/registry/`;
- one demo registry maps slugs to demos;
- one reusable demo shell presents examples;
- dynamic component routing remains centralized in `/components/[slug]`;
- demos use real component implementations and inherit the site theme.

Important pre-existing conditions:

- `Badge` exposes semantic variants beyond the basic theme surface. Do not solve
  theme-system completeness inside this spec. Demonstrate only variants that are
  valid under the existing theme, and report any uncovered variants that should
  be revisited during future theme work.
- `src/registry/primitives/badge.tsx` currently imports `./lib/utils`, but that
  path does not exist relative to `src/registry/primitives/`.

If importing a target primitive reveals that known defect or another
pre-existing, narrowly scoped import/path defect that prevents the demo from
compiling, a minimal correction is allowed only when:

- it is directly required to render the target primitive;
- it does not change public behavior;
- it preserves the distributable component contract;
- it is documented in the implementation report.

Do not expand that exception into a general registry cleanup.

## Relevant files

Existing:

- `src/registry/primitives/badge.tsx`
- `src/registry/primitives/alert.tsx`
- `src/registry/primitives/button.tsx`
- `src/app/components/[slug]/page.tsx`
- `src/app/globals.css`
- `src/lib/utils.ts`
- `registry.json`

Created by earlier specs, expected:

- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- `src/demos/button/`

Expected additions:

- `src/demos/badge/`
- `src/demos/alert/`

Do not modify `src/app/globals.css` to add semantic colors in this spec.

## Verification

Run:

```bash
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification:

### `/components/button`

- existing demos from spec 002 still render;
- no regression.

### `/components/badge`

- default/base variants render;
- all sizes render;
- radius examples render;
- no broken semantic styling is presented as a supported demo.

### `/components/alert`

- default renders;
- destructive renders;
- title and description render correctly.

### Shared behavior

- desktop viewport;
- mobile viewport;
- no horizontal overflow;
- no clipped demos;
- technical metadata remains visible;
- valid no-demo slug still shows the fallback;
- invalid slug still follows 404 behavior;
- no visible browser errors.

Follow `docs/verification.md`. This is the final cross-page visual check for the
initial Preview-only demo phase.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must review `/components/button`, `/components/badge`, and
`/components/alert` on desktop and mobile before this spec can reach `REVIEW`.
