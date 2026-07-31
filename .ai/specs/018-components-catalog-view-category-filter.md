# 018 — Components catalog view modes and category filter

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must compare Grid and List on desktop/mobile and verify category filtering.
