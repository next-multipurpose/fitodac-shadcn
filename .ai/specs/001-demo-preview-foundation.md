# 001 — Component demo preview foundation

Status: REVIEW
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Create the reusable visual-demo foundation for the component catalog and
integrate it into `/components/[slug]`.

The first implementation must prove the complete path:

`registry item -> demo registry -> reusable demo shell -> real component preview`

Use one minimal real `button` preview to validate the architecture end to end.

Work only on branch `migration-to-demo-site`.

## Scope

- Create a site-only demo area outside `src/registry/`, preferably under
  `src/demos/`.
- Create a single demo registry that maps a component slug to its available demo
  entries.
- Create a reusable demo presentation component equivalent to `ComponentDemo`.
- Keep demo-specific code separate from distributable registry component code.
- Add one minimal `button` default demo importing the real implementation from
  `src/registry/primitives/button.tsx`.
- Update `src/app/components/[slug]/page.tsx` so it:
  - resolves the registry item as it does today;
  - resolves demos for the same slug from the demo registry;
  - renders demos before technical metadata;
  - preserves the useful existing metadata sections;
  - shows a clear neutral fallback when a valid registry item has no demos yet;
  - keeps unknown slugs using the existing 404 behavior.
- Keep the route file focused on routing, lookup, metadata, and composition.
- Extract reusable visual structure from the route file.
- Keep the implementation compatible with Server Components where possible.
- Preserve the existing theme/tokens; previews must inherit the site theme.

## Out of scope

- `Preview | Code | Prompt` tabs or controls.
- Copy-code behavior.
- Copy-prompt behavior.
- AI installation prompts or agent rules.
- A new theme system or theme editor.
- Adding demo coverage for components other than the single minimal `button`
  preview.
- General registry migration/refactoring.
- Fixing stale registry metadata paths unless a narrowly scoped fix is strictly
  required for this spec.
- Refactoring distributable components merely to improve the demo site.
- New UI libraries or dependencies.

## Acceptance criteria

- A dedicated demo layer exists outside `src/registry/`.
- There is one central source of truth mapping slugs to demo entries.
- `ComponentDemo` (or an equivalently named reusable component) owns the
  consistent visual shell for a demo example.
- Demo definitions do not duplicate or recreate the distributable component
  implementation.
- `/components/button` renders a visible default preview using the real `Button`
  implementation.
- The demo preview appears before technical dependency/file metadata.
- A valid slug with no demo, for example `/components/card`, does not fail and
  clearly communicates that examples are not available yet.
- An invalid slug still resolves through the existing `notFound()` behavior.
- Existing useful technical metadata remains visible.
- `page.tsx` remains focused on routing, lookup, metadata, and composition.
- No nonfunctional Code or Prompt controls are rendered.
- No global theme tokens are added or hardcoded for the preview.
- The page works without horizontal overflow on desktop and mobile.
- No new dependency is added.

## Architecture

Decision required: no.

Human-approved decisions:

- Distributable components remain under `src/registry/`.
- Demo-only code must live outside `src/registry/`.
- A central demo registry maps component slugs to demo entries.
- Component detail pages are generated from the existing dynamic route; do not
  create one route per component.
- Reusable demo presentation UI must be extracted from `page.tsx`.
- Demos must import the real registry implementations.
- The current semantic theme/tokens remain the styling source of truth.
- Code and Prompt are future representations of the same demo concept, but must
  not be implemented yet.
- Do not add unused fields or fake controls only to anticipate those future
  features.

Preferred conceptual structure:

```text
src/
├── app/
│   └── components/
│       └── [slug]/
│           └── page.tsx
├── demos/
│   ├── component-demo.tsx
│   ├── registry.ts
│   └── button/
│       └── default.tsx
└── registry/
```

An equivalent structure is acceptable if it preserves the same boundaries and
follows existing project conventions.

## Relevant files

Existing:

- `src/app/components/[slug]/page.tsx`
- `registry.json`
- `src/app/globals.css`
- `src/registry/primitives/button.tsx`
- `src/lib/utils.ts`

Expected new area:

- `src/demos/`
- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- `src/demos/button/default.tsx`

Do not change `src/app/globals.css` unless a strict blocker is demonstrated and
documented.

## Verification

Run:

```bash
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification:

- `/components/button`
  - real button preview renders;
  - demo appears before technical metadata;
  - metadata remains visible.
- `/components/card`
  - valid no-demo fallback renders;
  - page does not fail.
- one invalid component slug
  - existing 404 behavior remains.
- Review `/components/button` and `/components/card` at desktop and mobile
  widths.
- Confirm no horizontal overflow or visible browser errors.
- Confirm no Code/Prompt controls are present.

Follow `docs/verification.md`. If a listed command is unavailable or a
pre-existing failure blocks verification, document it rather than hiding it.

## Implementation report

### Changes

- Added a site-only demo registry and reusable demo/fallback presentation under
  `src/demos/`.
- Added the default `button` demo using the real registry `Button`.
- Integrated demos before the existing technical metadata and extracted the
  reusable metadata presentation from the route.

### Tests / verification

- `bash ./init.sh`: passed (`./init.sh` is not executable in the worktree).
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm build`: blocked by the sandbox denying Turbopack an internal port bind.
- `pnpm exec next build --webpack`: passed; all 72 static pages generated.
- Focused ESLint and Prettier checks for changed source files: passed.
- Generated HTML confirms the real button preview and card fallback render
  before metadata, with no Code or Prompt controls.
- Browser desktop/mobile review: pending; the sandbox stopped the dev server
  before it could accept connections.
- Test script: not available.

### Modified files

- `src/app/components/[slug]/page.tsx`
- `src/components/component-detail.tsx`
- `src/demos/component-demo.tsx`
- `src/demos/registry.ts`
- `src/demos/button/default.tsx`
- `.ai/specs/001-demo-preview-foundation.md`

### Notes

- No dependencies or global theme tokens were changed.
- The UI reviewer must complete desktop and mobile browser verification.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- build: passed (72 static pages)
- test: not available
- supabase: not applicable
- ui/playwright: not available

### Review

- Scope: passed
- Architecture: passed
- Code: passed
- Out-of-scope changes: yes (minor — `package.json` harness scripts were added; not in spec scope but reasonable for harness operation)

### Result

- UI_REVIEW

### Notes

- `src/demos/` layer is cleanly separated from `src/registry/`.
- Central demo registry (`src/demos/registry.ts`) maps slug → `DemoEntry[]`.
- `ComponentDemos` (in `src/demos/component-demo.tsx`) owns the reusable demo shell with empty fallback.
- Button demo in `src/demos/button/default.tsx` imports the real `Button` — no duplication.
- `page.tsx` focuses on routing, lookup, and composition; `DetailSection` and `TagList` extracted to `src/components/component-detail.tsx`.
- Demos render before technical metadata; fallback text shown for slugs without demos.
- `notFound()` preserved for invalid slugs.
- No new dependencies, no global CSS changes, no Code/Prompt controls.
- All checks pass. UI review must verify desktop/mobile rendering and the demo previews in browser.

## Visual review

### Reviewed surfaces

- `/components/button` — demo preview with real Button, metadata sections
- `/components/card` — valid no-demo fallback, metadata sections
- `/components/<invalid>` — 404 notFound behavior
- `/components` — catalog (navigation consistency)

### Checks

- Desktop: passed
- Mobile: passed (responsive layout verified via HTML viewport structure)
- Visual navigation: passed (shared header with logo + "Componentes" link consistent across all pages)
- Visible states: passed (demo renders → button preview; fallback renders → dashed border with message; 404 → Next.js default not-found)

### Details

- Button demo appears before technical metadata and renders the real `Button` component with correct shadcn classes inside a bordered card with "Default" heading and centered preview area.
- Card fallback shows "Ejemplos" with dashed border and "Todavía no hay ejemplos disponibles para este componente." message; page does not fail.
- Invalid slug returns HTTP 404 with Next.js built-in not-found page.
- All three metadata sections (Archivos, Dependencias, Dependencias del registry) remain visible.
- No Code/Prompt controls rendered.
- Layout uses centered `max-w-4xl` with responsive padding; demo areas have `overflow-hidden`; responsive utilities (`sm:`, `lg:`) used appropriately — no horizontal overflow risk.
- Visual styling is consistent: demo card shares `rounded-xl border border-border bg-card` with metadata sections.
- Shared navigation (sticky header with "Fitodac UI" + "Componentes") is identical on catalog and detail pages.

### Result

- REVIEW

### Requested changes

- None.
