# 021 — Charts catalog and detail pages
Status: DRAFT
Role: implementer
UI Review: required
UI Profile: admin-app
Tooling policy: stop-with-blocker

## Goal
Create a `/charts` catalog similar in hierarchy to `/components`, plus `/charts/[slug]` pages that render each registered chart through the existing demo experience.

Prerequisite: spec 020 must be `DONE`.

Work only on branch `migration-to-demo-site`.

## Scope
- Add `Charts` to the shared header navigation without duplicating navigation markup.
- Add localized EN/ES metadata and UI labels for Charts.
- Create `/charts` as a Server Component using `getCharts()`.
- Match the established catalog width, hierarchy, spacing, semantic tokens, and responsive behavior.
- Render registered charts as a responsive grid of full-card links showing title and stable name.
- Use the existing `Empty` primitive when no charts are registered.
- Create `/charts/[slug]`, resolve with `getChart(slug)`, and call `notFound()` for unknown names.
- Generate static params from registered chart names.
- Reuse `ComponentDemo`/`DemoCard` so Preview, Code, and Copy Prompt remain canonical.
- Add a back link to `/charts`; do not copy component-detail sections Charts do not own.
- Keep pages as Server Components unless browser interaction strictly requires a client boundary.
- Add route, i18n, empty-state, lookup, and integration regression tests.

## Out of scope
- Creating chart examples.
- Search, categories, filters, Grid/List controls, sorting, or pagination.
- Embedded live previews inside catalog cards.
- Chart-specific Code or Copy Prompt implementations.
- A second registry, runtime discovery, or manual generated-index edits.
- Changes to `/components/chart`, the Chart primitive, or Recharts.
- New dependencies.

## Acceptance criteria
- Header navigation exposes `/charts` in English and Spanish.
- `/charts` lists exactly the entries from `chartsDemos`.
- Empty registry renders a clear localized empty state.
- Each card links to `/charts/<name>`.
- Unknown chart slugs return 404.
- Detail pages render the selected chart with Preview, Code, and Copy Prompt.
- Cobalt/Default and Light/Dark propagate through catalog and chart previews.
- Desktop and mobile layouts are usable without page-level overflow.
- Existing Components and Layouts navigation remains intact.
- Tests, build, and browser review pass.

## Architecture
Decision required: no.

The routes reuse the approved generated demo registry and existing demo rendering/integration surfaces; no new ownership boundary or parallel implementation is introduced.

## Relevant files
- `src/app/layout.tsx`
- `src/app/components/page.tsx`
- `src/app/components/[slug]/page.tsx`
- `src/demos/component-demo.tsx`
- `src/lib/chart-catalog.ts`
- `messages/en.json`
- `messages/es.json`
- existing catalog and route tests

## Verification
- `pnpm test`
- `./init.sh`
- Browser: `/charts` and one valid `/charts/[slug]`, desktop/mobile
- Browser: EN/ES, Cobalt/Default, Light/Dark, empty state, unknown slug
- Confirm no console or hydration errors

## Implementation report
Pending.

## Technical review
Pending.

## Visual review
Pending.
