# 018 — Components catalog view modes and category filter

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Enhance the `/components` catalog page with:

1. a Grid/List view switch;
2. a single-select category filter based on the component categories already defined by the catalog.

The controls operate only on the component entries displayed by `/components`.

Do not change component detail pages or individual demos.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 017 must be `DONE` before this spec is promoted to `READY`.

## Current behavior

`src/app/components/page.tsx` currently:

- reads entries from `registry.json`;
- owns a hardcoded category mapping;
- groups components into category sections;
- always renders component cards as a responsive grid;
- has no interactive catalog controls.

The current category keys are:

```text
primitives
forms
navigation
overlays
dataDisplay
feedback
layout
advanced
utilities
```

Preserve these category identities, their current order, and their translated labels.

## Product decisions

### View modes

Supported values:

```ts
type CatalogView = "grid" | "list"
```

Default:

```text
grid
```

The selected view is page-local UI state.

Do not persist it in localStorage, cookies, or URL query parameters.

Reloading or revisiting `/components` starts in Grid.

### Category filter

Supported values:

```text
all
primitives
forms
navigation
overlays
dataDisplay
feedback
layout
advanced
utilities
```

Default:

```text
all
```

The category filter is single-select.

Do not implement multi-select categories.

Do not persist the selected category.

## Scope

### Centralize catalog category metadata

Move the current category configuration out of the page component into one focused catalog module, for example:

```text
src/lib/component-catalog.ts
```

or an equivalent project-local location.

This module should own the equivalent of:

```ts
type ComponentCategoryKey =
  | "primitives"
  | "forms"
  | "navigation"
  | "overlays"
  | "dataDisplay"
  | "feedback"
  | "layout"
  | "advanced"
  | "utilities"

type ComponentCategory = {
  key: ComponentCategoryKey
  items: string[]
}
```

Use the existing category membership as the migration source.

Do not duplicate category membership in the page and interactive component.

Do not move the mapping into `registry.json` merely to implement the filter.

`registry.json` remains the distributable component registry. Catalog categories remain demo-site presentation/navigation metadata.

### Category integrity

Add validation/tests that ensure:

- category keys are unique;
- each component appears in at most one category;
- every component currently intended to appear in `/components` belongs to exactly one category;
- every configured component resolves to a real `registry.json` item;
- unknown category entries are not silently ignored.

If the current repository contains an uncategorized or duplicated item, correct the category mapping narrowly and document it in the implementation report.

Do not infer categories from dependencies or internal component usage.

### Server/client boundary

Keep the page responsible for:

- loading `registry.json`;
- loading server translations and metadata;
- preparing serializable catalog entries.

Introduce the smallest practical Client Component for:

- active category;
- active view mode;
- filtering prepared catalog entries;
- rendering the interactive toolbar and results.

Preferred boundary:

```text
src/app/components/page.tsx
        ↓ serializable entries and labels
src/components/components-catalog.tsx
```

Equivalent naming is acceptable.

Do not fetch `registry.json` from the browser.

Do not convert the root layout to a Client Component.

### Catalog entry model

Pass only data required by the UI, conceptually:

```ts
{
  name: string
  type: string
  filesCount: number
  packagesCount: number
  category: ComponentCategoryKey
  href: string
}
```

Do not send registry source contents to the browser.

### Toolbar

Add one coherent catalog toolbar above the results.

It must contain:

- category selector;
- Grid/List view switch;
- a layout position that can accommodate the search control introduced by spec 019.

Do not render a disabled fake search input in this spec.

The toolbar must be responsive.

### Category selector

Use an existing local Select, DropdownMenu, or native select pattern.

Prefer the simplest accessible option already supported by the repository.

Do not install a new select/menu library.

The selector must:

- show the active category;
- provide `All categories`;
- provide all current category labels;
- update immediately;
- be keyboard accessible;
- use translated labels.

Behavior:

#### All categories

Render every non-empty category section in established category order.

#### Selected category

Render only the selected category section and its entries.

Preserve the section heading and visible entry count.

### Grid view

Grid view preserves the current general behavior:

```text
responsive multi-column component cards
```

At minimum:

- one column on narrow screens;
- multiple columns at current responsive breakpoints;
- full-card link target;
- component name;
- registry item type;
- file count;
- package/dependency count.

Do not redesign cards beyond what is required for both view modes.

### List view

List view renders the same filtered entries as full-width rows.

Each row remains a link to:

```text
/components/<component-name>
```

At minimum show the same information as Grid:

- component name;
- registry item type;
- file count;
- package/dependency count.

List layout should prioritize scanning:

```text
name | type | files | packages
```

Metadata may stack on narrow screens.

Do not add a table library.

### View switch

Use an accessible two-option control, such as:

- two Buttons with `aria-pressed`;
- local ToggleGroup;
- an existing segmented-control pattern.

Accessible labels must be equivalent to:

```text
Grid view
List view
```

Icon-only controls require accessible labels.

The active mode must be visually and semantically apparent.

Switching view must not:

- change category;
- navigate or reload;
- change locale;
- alter UI theme or color mode.

### Counts

Each visible category count must represent the number of entries rendered in that category.

Do not count hidden categories.

A global visible-results count is optional and should not add unnecessary UI.

### i18n

Add English and Spanish translations for new labels, including equivalents of:

```text
All categories
Filter by category
Grid view
List view
```

English remains canonical.

Preserve current category translations.

Do not translate component slugs/names.

## Out of scope

- Text search; spec 019 handles it.
- Searching individual demos.
- Searching dependency graphs.
- Multi-select categories.
- Sorting controls.
- Pagination or infinite scrolling.
- URL-state synchronization.
- View/category persistence.
- Redesigning `/components/[slug]`.
- Changing demo registries.
- Changing distributed registry architecture.
- New third-party dependencies.
- New categories except a narrow correction for a proven current mapping gap.

## Acceptance criteria

- `/components` has a Grid/List switch.
- Grid is the default on every fresh page load.
- `/components` has a single-select category filter.
- `All categories` is the default.
- Existing categories remain available in existing order.
- Selecting one category hides all other category sections.
- Selecting `All categories` restores all sections.
- Category selection does not change view mode.
- View switching does not change category selection.
- Grid and List render exactly the same filtered entries.
- Both modes link to the same detail routes.
- Both modes show name, type, file count, and package count.
- Category configuration has one canonical demo-site source.
- Every catalog component is assigned exactly one valid category.
- No component is categorized twice.
- No unknown category name is silently ignored.
- `registry.json` is not repurposed as category UI configuration.
- No dependency is installed.
- Controls work in English and Spanish.
- Controls are keyboard accessible.
- Desktop/mobile layout has no horizontal overflow.
- Automated tests cover category filtering, mode switching, and category integrity.
- Existing locale, Cobalt/Default, and Light/Dark controls continue working.

## Architecture

Decision required: no.

Required interaction model:

```text
registry.json + catalog category configuration
                  ↓
        server catalog preparation
                  ↓
       ComponentsCatalog client shell
             ├── category = all | category
             └── view = grid | list
                  ↓
          visible category sections
```

State remains page-local.

## Relevant files

Existing:

- `src/app/components/page.tsx`
- `registry.json`
- i18n message catalogs
- existing Button/Select/Dropdown/Toggle primitives
- current Vitest/RTL setup

Expected additions may include:

- `src/lib/component-catalog.ts`
- `src/components/components-catalog.tsx`
- `src/components/catalog-view-toggle.tsx`
- focused catalog tests

Use fewer files if a simpler structure remains clear.

## Tests

Using existing Vitest/RTL infrastructure, cover:

### Category configuration

- unique category keys;
- every configured component exists;
- no component belongs to multiple categories;
- every catalog component belongs to one category.

### Defaults

- All categories active;
- Grid active;
- all category sections visible;
- List mode inactive.

### Category interaction

- select Forms;
- only Forms remains;
- switch to Overlays;
- only Overlays remains;
- restore All categories.

### View interaction

- switch Grid to List;
- same component names remain;
- metadata remains;
- category remains unchanged;
- switch List to Grid.

### Accessibility

- category selector has an accessible name;
- view controls expose active state;
- keyboard interaction works.

Do not rely exclusively on Tailwind class assertions to prove mode behavior.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification on `/components`:

### Desktop

- All categories + Grid;
- one selected category + Grid;
- one selected category + List;
- All categories + List.

### Mobile

Repeat category and view interactions.

Verify:

- toolbar wraps intentionally;
- selector remains usable;
- mode controls remain reachable;
- list metadata stacks cleanly;
- no horizontal overflow;
- component links remain usable.

### Shared regression

Verify:

- locale EN/ES;
- Cobalt/Default;
- Light/Dark;
- navigation to representative detail pages;
- no console or hydration errors.

## Implementation report

### Changes

- Centralized the ordered catalog category metadata and strict registry-to-category validation in `src/lib/component-catalog.ts`.
- Added `combobox` to Forms, correcting the existing mapping gap where the registry entry was counted in the page summary but not rendered in any category.
- Kept registry loading, translations, and serializable entry preparation on the server page; added a focused client catalog shell for page-local category and Grid/List state.
- Added a responsive native category selector, accessible Grid/List buttons, translated English/Spanish labels, and equivalent grid cards/list rows.

### Tests / verification

- Focused catalog and i18n tests: passed (9 tests).
- Focused ESLint for changed TypeScript/TSX files: passed.
- `pnpm lint`: passed.
- `pnpm demos:registry:check`: passed through `./init.sh`.
- `pnpm typecheck`: blocked by pre-existing unrelated errors in dropdown/input demos and event-calendar imports/schema; no reported error targets the files changed by this spec.
- `pnpm test`: 121 passed, 1 pre-existing unrelated failure in `tests/demos/registry.test.ts` because its four-entry Badge expectation is stale against the current 21-entry Badge demo registry.
- `./init.sh`: reached project checks and failed at the same unrelated repository-wide typecheck errors.
- `pnpm build`: reached the optimized production build step but did not produce a conclusive completion result in the available execution window.
- Browser/UI: pending UI reviewer. The in-app browser timed out loading the local dev page; project-local Chromium then failed to launch because the macOS sandbox denied its Mach port registration. No desktop/mobile screenshot evidence was produced.

### Modified files

- `src/app/components/page.tsx`
- `src/components/components-catalog.tsx`
- `src/lib/component-catalog.ts`
- `tests/component-catalog.test.tsx`
- `messages/en.json`
- `messages/es.json`
- `.ai/specs/018-components-catalog-view-category-filter.md`

### Notes

- Category and view state are not persisted and do not use URL state.
- No dependency, `registry.json`, demo registry, detail page, or global style was changed.
- Full automatic verification remains affected by unrelated existing repository failures listed above; visual verification remains required before approval.

## Technical review

### Verification

- init.sh: failed — stopped at the pre-existing unrelated repository-wide typecheck errors in `src/demos/dropdown-menu/*`, `src/demos/input/*`, `src/demos/input-group/*`, and `src/registry/components/event-calendar/*`; no error targets files changed by this spec
- lint: passed
- typecheck: failed — only pre-existing unrelated errors listed above; `src/app/components/page.tsx`, `src/components/components-catalog.tsx`, `src/lib/component-catalog.ts`, and `tests/component-catalog.test.tsx` report zero errors
- test: 121 passed, 1 pre-existing unrelated failure in `tests/demos/registry.test.ts` (stale Badge demo registry expectation, untouched by this spec)
- build: failed at the Next.js type-check phase on the same pre-existing demo type errors
- focused `tests/component-catalog.test.tsx`: passed (6/6)
- `pnpm demos:registry:check`: passed (through `./init.sh` before typecheck)

### Review

- Scope: passed — Grid/List switch, single-select category filter, centralized catalog module, server/client boundary, translated labels, and focused tests all implemented; the narrow `combobox` → Forms correction is a genuine mapping gap (registry item was counted in the page summary but not rendered) and is documented.
- Architecture: passed — page stays a Server Component (loads `registry.json`, translations, prepares serializable entries); client shell owns only page-local category/view state. Reuses `NativeSelect` and `Button` primitives; no new dependency; `registry.json` and demo registries untouched; category mapping has one canonical source in `src/lib/component-catalog.ts`.
- Code: passed — `prepareCatalogEntries` throws on duplicate keys, multiple/unknown assignments, unresolved or uncategorized entries (no silent ignores); Grid and List iterate the same filtered entries with identical `href`; state stays page-local; i18n keys added in EN and ES with English canonical.
- Out-of-scope changes: no — diff limited to the catalog files, messages, and the spec.

### Result

- UI_REVIEW

### Requested changes

- None for technical/functional correctness. Visual QA remains pending (Grid vs List on desktop/mobile, toolbar responsiveness, overflow, EN/ES and Cobalt/Default/Light-Dark regression).

## Visual review

### Reviewed surfaces

- `/components` catalog page (Grid/List, category filter, toolbar)
- Detail navigation to `/components/<name>`
- Shared header (locale switcher, theme selector, light/dark toggler) on `/components`
- EN and ES locales; Cobalt and Default UI themes; Light and Dark color modes

### Checks

Playwright 1.62.1 + Chromium on `http://localhost:3000` (existing dev server). Screenshots and audit scripts under `.ai/run/logs/ui-review-018/`.

- Desktop (1440x900): passed — default Grid+All on fresh load; Forms filter reduces to one section; List switch keeps the filter and same entries; All restores all 9 sections; Grid and List render the same 74 links to the same `href`s.
- Mobile (390x844): passed — Grid is single column; filter works; List rows become a single column with metadata stacking under the name (`meta display: flex` under `h3`); toolbar wraps with `flex-wrap` and remains fully usable; no horizontal overflow at any state.
- Visual navigation: passed — every card/row is a full-area link to `/components/<name>`; navigating to a detail page works from both views.
- Visible states: passed — view buttons expose active state via `variant` (secondary vs ghost) and `aria-pressed`; category selector reflects the active value; per-section counts reflect the filtered entries.
- Consistency: passed — toolbar is a `rounded-xl border bg-card` surface matching the site card language; `NativeSelect` renders at `h-9 rounded-md` and the toggle buttons at `size-9`, consistent with the form-control and Button baselines; cards/rows reuse the same surface treatment as the home page cards.
- i18n: passed — EN canonical; ES shows "Todas las categorías", "Filtrar por categoría", "Vista de cuadrícula", "Vista de lista", and category "Formularios"; ES filtering and List flow work with no errors.
- Theme/color mode: passed — Cobalt (default) and Default switch correctly on the page (body background changes accordingly); Light/Dark toggle applies `dark` class with no layout change or overflow.
- Browser errors: passed — 0 console errors and 0 page errors across all reviewed flows.

### Result

- REVIEW

### Requested changes

- None. Visual QA passed in browser; no visual issues found.
