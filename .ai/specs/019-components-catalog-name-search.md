# 019 — Components catalog name search and combined filtering

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add a simple local search input to `/components` that filters the component types shown on that page by component name.

The search is for catalog component names, not individual demos.

Examples:

```text
button
avatar
alert-dialog
```

The search must not inspect:

- demo titles such as `Button primary`;
- demo names or variants;
- source code;
- package dependencies;
- `registryDependencies`;
- components that merely use the searched component internally.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 018 must be `DONE`.

## Product decisions

### Search scope

Search only the component entries prepared for `/components`.

The searchable field is exactly:

```text
catalogEntry.name
```

This is the registry/catalog component name or slug.

Do not search:

```text
title
description
type
category
files
dependencies
registryDependencies
demo names
demo titles
internal imports
```

### Matching behavior

Matching is:

- case-insensitive;
- whitespace-trimmed;
- substring-based;
- local and immediate.

Conceptually:

```ts
item.name.toLowerCase().includes(query.trim().toLowerCase())
```

Therefore:

```text
button
```

may match catalog component names containing that text, such as:

```text
button
button-group
craft-button
ripple-button
```

because those are component names on the page.

It must not match an unrelated component merely because its implementation imports or renders Button.

An empty or whitespace-only query shows all entries allowed by the current category filter.

### State

Search state is page-local.

Do not persist it in:

- localStorage;
- cookies;
- URL query parameters.

Reloading `/components` clears the query.

## Scope

### Search control

Add the search input to the catalog toolbar created by spec 018.

It must:

- have an accessible label;
- provide a concise translated placeholder;
- update results as the user types;
- support keyboard input normally;
- provide a clear action when the query is non-empty, if consistent with current UI patterns.

Suggested English copy:

```text
Search components
```

Suggested Spanish copy:

```text
Buscar componentes
```

Do not add an autocomplete service or command palette.

### Client-side filtering

Use the serializable catalog entries already provided to the client shell.

Do not:

- add an API route;
- fetch registry data on every keystroke;
- query the filesystem;
- search the entire repository;
- add a search-index library;
- debounce a network request.

The current catalog size does not justify search infrastructure.

### Combined filter model

Search and category filter must combine as an intersection:

```text
visible = categoryMatches AND nameMatches
```

Examples:

#### All categories + `button`

Show every catalog component name containing `button`, grouped under its actual category.

Hide category sections with zero matches.

#### Forms + `button`

Show only components in Forms whose component name contains `button`.

Do not reset the category to All.

#### Overlays + `dialog`

Show only Overlay component names containing `dialog`.

### View-mode independence

Search must work identically in Grid and List.

Changing query must not change the active view mode.

Switching Grid/List must not clear the query.

The same result set must be shown in both modes.

### Category section behavior

When `All categories` is active:

- preserve established category order;
- render only categories containing matching component names;
- counts reflect matching visible entries.

When one category is active:

- render that category only when it contains matches;
- if it has no matches, render the catalog empty state rather than an empty category section.

### Empty state

When no component names match the combined category/query filters, render one clear empty state.

It should communicate that no components were found.

Provide actions appropriate to current state, preferably:

- clear search;
- reset category to All when a specific category is active.

Do not navigate away.

Do not show the generic component-detail missing-page state.

The empty-state copy must be translated.

### Result count

Visible category counts must update to the number of matched component entries.

A global result count is optional.

If added, it must count component types, not demo variations.

Do not display the total number of demos as search results.

### No demo-level search

The implementation must not import or inspect:

```text
src/demos/*
getDemosForComponent()
DemoEntry
demo titles
```

for search matching.

A component with 30 demos remains one catalog search result.

Examples:

```text
query: button primary
```

must not match `button` solely because a demo is titled `Primary`.

```text
query: profile popover
```

must not match `avatar` solely because Avatar has a profile-popover demo.

### No dependency-graph search

Do not match a component because:

- its `registryDependencies` contain the query;
- its source imports the query;
- it renders the query internally.

Example:

```text
query: button
```

must not return Dialog simply because Dialog uses Button internally.

### i18n

Add English and Spanish translations for:

```text
Search components
Clear search
No components found
Reset filters
```

Use only the labels actually needed by the final UI.

English remains canonical.

Component names remain untranslated.

### Performance

Use simple in-memory filtering.

Memoization is optional if it makes the component clearer, but avoid premature optimization.

Do not add fuzzy-search libraries.

Do not add worker/index infrastructure.

## Out of scope

- Searching individual demos or demo titles.
- Searching source code.
- Searching dependencies or internal usage.
- Fuzzy search, synonyms, stemming, or typo correction.
- Global site search.
- Search suggestions or autocomplete.
- Recent searches.
- Search history.
- Server-side search endpoints.
- URL query persistence.
- Sorting by relevance.
- Highlighting matched substrings unless trivial and non-disruptive.
- Changes to component detail pages.
- New third-party dependencies.

## Acceptance criteria

- `/components` has a search input in the catalog toolbar.
- Search filters only component entries on `/components`.
- Search reads only the component `name` field.
- Search is case-insensitive and trims surrounding whitespace.
- Search supports partial/sub-string component-name matches.
- Search does not inspect demo names/titles.
- Search does not inspect source, dependencies, or internal component usage.
- A component remains one result regardless of demo count.
- Search combines with category as an intersection.
- Search works identically in Grid and List.
- Search does not reset category or view mode.
- Grid/List switching does not clear search.
- Empty query restores category-filtered results.
- Categories with zero matches are hidden.
- Category counts reflect matched component entries.
- No-match state is clear and translated.
- Clear/reset controls restore expected results.
- Search state is not persisted.
- No API route or search library is added.
- English and Spanish labels work.
- Keyboard and screen-reader access are verified.
- Desktop/mobile layout remains usable.
- Automated tests prove search scope exclusions.

## Architecture

Decision required: no.

Required filter pipeline:

```text
all catalog component entries
            ↓
category filter
            ↓
component-name search
            ↓
visible grouped entries
            ↓
Grid or List renderer
```

The order may be implemented differently when mathematically equivalent, but the result must be:

```text
categoryMatches && nameMatches
```

Search source:

```text
catalogEntry.name only
```

## Relevant files

From spec 018:

- centralized catalog category module;
- components catalog Client Component;
- Grid/List controls;
- catalog tests.

Existing:

- `src/app/components/page.tsx`
- i18n message catalogs
- existing Input/Button primitives
- current Vitest/RTL setup

Expected additions/changes may include:

- `src/components/component-search.tsx`
- catalog filtering helpers;
- search and combined-filter tests.

Use fewer files if the existing catalog component remains clear.

## Tests

Using existing Vitest/RTL infrastructure, test:

### Basic name matching

- `button` matches component names containing `button`;
- `BUTTON` behaves the same;
- surrounding whitespace is ignored;
- empty/whitespace query shows all category-allowed components;
- `alert-dialog` matches its component name.

### Excluded search fields

Use controlled fixtures proving:

- a demo title containing `primary` does not make `button` match query `primary`;
- a component depending on Button does not match query `button` unless its own name contains `button`;
- package/file/type/category values do not create matches;
- multiple demos do not create duplicate component results.

The test should exercise the catalog filtering helper/model, not import demo registries for production matching.

### Combined filters

- All + `button` shows matching names across categories;
- Forms + a matching query shows only matching Forms entries;
- Forms + nonmatching query shows empty state;
- changing category preserves query;
- changing view preserves query and results.

### Empty state

- no match displays translated empty state;
- clear search restores results;
- reset filters restores All categories and empty query when offered.

### Accessibility

- search input has accessible name;
- clear action is accessible;
- keyboard input updates results;
- result links remain reachable.

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

### Search scope

Test:

```text
button
avatar
alert-dialog
primary
profile popover
```

Verify:

- component-name matches work;
- demo-specific phrases do not produce matches;
- dependency/internal-use relationships do not produce results.

### Combined controls

Verify:

```text
All + Grid + query
All + List + query
selected category + Grid + query
selected category + List + query
```

Check counts and empty-state transitions.

### Responsive and locale

Test desktop/mobile in English and Spanish.

Verify:

- toolbar remains usable;
- input and controls do not overflow;
- clear/reset controls are reachable;
- no console/hydration errors.

### Theme regression

Verify catalog controls and results under:

```text
Cobalt + Light
Cobalt + Dark
Default + Light
Default + Dark
```

## Implementation report

### Changes

- Added page-local component-name search to the existing catalog toolbar with an accessible clear action.
- Added a pure combined filter that intersects category and trimmed, case-insensitive `catalogEntry.name` substring matching.
- Hid empty category sections, updated category counts from the matched entries, and added a translated catalog empty state with reset controls.
- Added English and Spanish search, clear, empty-state, and reset labels.

### Tests / verification

- `pnpm vitest run tests/component-catalog.test.tsx tests/i18n/messages.test.ts`: passed (13 tests).
- `pnpm lint`: passed.
- Prettier check for all modified implementation/test/message files: passed.
- `git diff --check`: passed.
- `pnpm test`: blocked by an unrelated existing expectation in `tests/demos/registry.test.ts` for badge demo coverage (125 passed, 1 failed); the catalog tests pass within the full run.
- `pnpm typecheck`: blocked by unrelated existing duplicate JSX attributes, missing `react-payment-inputs`, and event-calendar alias/schema errors outside this spec.
- `./init.sh`: blocked when it reaches the same unrelated typecheck errors; harness, registry, and lint checks passed before that point.
- `pnpm build`: blocked by a Turbopack environment error while processing the unrelated event-calendar CSS (`creating new process` / `binding to a port` / `Operation not permitted`).
- Browser/UI verification: pending required UI review.

### Modified files

- `src/lib/component-catalog.ts`
- `src/components/components-catalog.tsx`
- `src/app/components/page.tsx`
- `messages/en.json`
- `messages/es.json`
- `tests/component-catalog.test.tsx`
- `.ai/specs/019-components-catalog-name-search.md`

### Notes

- Production filtering reads only `entry.name`; it does not import or inspect demo registries, source, files, packages, or dependency fields.
- Existing unrelated worktree changes were preserved.

## Technical review

### Verification

- init.sh: failed — stops at the same pre-existing repository-wide errors: typecheck errors in `src/demos/dropdown-menu/*`, `src/demos/input/*`, `src/demos/input-group/*`, and `src/registry/components/event-calendar/*`, plus the stale Badge demo expectation in `tests/demos/registry.test.ts`; harness, registry, and lint checks pass before that point
- lint: passed
- typecheck: failed — 52 errors, all pre-existing and unrelated; zero errors in `src/lib/component-catalog.ts`, `src/components/components-catalog.tsx`, `src/app/components/page.tsx`, `messages/*.json`, or `tests/component-catalog.test.tsx`
- test: focused `tests/component-catalog.test.tsx` + `tests/i18n/messages.test.ts`: passed (13/13); full `pnpm test`: 125 passed, 1 pre-existing unrelated failure in `tests/demos/registry.test.ts` (Badge demo coverage expectation, untouched by this spec)
- build: failed at the Next.js type-check phase on the same pre-existing demo type errors
- prettier `--check` on all modified implementation/test/message files: passed
- `git diff --check`: passed
- browser/UI verification: pending required UI review

### Review

- Scope: passed — toolbar search input with accessible label/placeholder and clear action; combined `categoryMatches && nameMatches` filtering; hidden zero-match categories; matched-entry counts; translated empty state with reset controls; Grid/List parity; EN/ES labels; page-local state with no persistence; focused tests including controlled fixtures proving search scope exclusions.
- Architecture: passed — page stays a Server Component; client shell owns only page-local `query`/`category`/`view` state; pure `filterCatalogEntries` lives in the centralized `src/lib/component-catalog.ts` and reads only `entry.name` (trimmed, case-insensitive, substring); reuses `Input`, `Button`, `Empty`, and `NativeSelect` primitives; no new dependency, API route, or search infrastructure; no demo/registry/source/dependency inspection in production filtering. Graphify confirms the catalog community is isolated: only `page.tsx` and `components-catalog.tsx` consume the module.
- Code: passed — `prepareCatalogEntries` still throws on unresolved/uncategorized entries (no silent ignores); the `filterCatalogEntries` intersection is verified by controlled fixtures (demo titles, `type`, `dependencies`, `registryDependencies` do not create matches; no duplicate results for multi-demo components); empty/whitespace query restores category-filtered results; category order preserved via `componentCategories`; accessible names on searchbox and clear/reset actions; keyboard input updates results (user-event tests).
- Out-of-scope changes: no functional out-of-scope work. Note: the diffs for the modified files include prettier tab normalization (the committed base files did not conform to the repo's `useTabs: true` config; the current state passes `prettier --check`). During this review, concurrent human work committed `file-upload` to `registry.json` (commit e282158) and added the `file-upload` entry to the `forms` category in `src/lib/component-catalog.ts`; the catalog tests pass on the resulting state.

### Result

- UI_REVIEW

### Requested changes

- None for technical/functional correctness. Visual QA remains pending: search scope, combined filters, empty state, and Grid/List parity on desktop/mobile, EN/ES, and Cobalt/Default with Light/Dark.

## Visual review

### Reviewed surfaces

- Route: `/components` (components catalog page).
- Toolbar: search input (`type=search`, search icon, clear action), category `NativeSelect`, Grid/List toggle group.
- Results: category sections with heading + count, Grid cards and List rows, links to `/components/<name>`.
- Empty state: `Empty` with search media icon, translated title, reset-filters action when a category is active.
- Views/states: default, filtered, no-match, clear/reset, Grid/List switching, and theme/color-mode combos.

### Method

- Playwright 1.62.1 + Chromium, local Chromium launched successfully.
- Dev server: `next dev` already running on `http://localhost:3000` (PID 4611, same worktree, hot reload); `pnpm ai:dev:start` refused to start a duplicate and the script logged port-in-use, so the running server was used directly.
- Viewports: desktop 1440x900, mobile 390x844.
- Locales: EN and ES via `NEXT_LOCALE` cookie.
- Themes: Default + Light/Dark, Cobalt + Light/Dark via `ui-theme`/`theme` localStorage bootstrap.
- Scripts and screenshots: `.ai/run/logs/ui-review-019/review.mjs`, `.ai/run/logs/ui-review-019/layout.mjs`, screenshots in `.ai/run/logs/ui-review-019/`.

### Checks

- Desktop: passed
- Mobile: passed
- Visual navigation: passed
- Visible states: passed

### Result

- REVIEW

### Evidence

Automated functional checks (39/39 passed):

- Baseline: 9 categories, 75 entries, per-section counts equal visible entries.
- Search scope: `button` -> `button, button-group, craft-button, ripple-button`; `avatar` -> `avatar`; `alert-dialog` -> `alert-dialog`; `dialog` -> `alert-dialog, dialog`; `primary` and `profile popover` -> no matches (proves demo titles/demo names do not create matches).
- Matching: `"  BUTTON  "` equals `button` (case-insensitive + trimmed); empty/whitespace query restores category-filtered results.
- Combined filters: Forms + `input` -> only 5 Forms entries; category preserved by query; Forms + `button` -> empty state with reset; reset restores All + empty query and full results.
- View-mode independence: Grid/List keep the same query and result set; toggling does not clear the query; query/result parity confirmed both directions.
- State: reload clears query (page-local, no URL/localStorage/cookie persistence).
- i18n: ES label/placeholder `Buscar componentes`, empty state `No se encontraron componentes`, reset `Restablecer filtros`, clear `Borrar búsqueda`.
- Themes: Cobalt Light, Cobalt Dark, Default Light, Default Dark all render controls and results correctly.
- Console: no console errors or page errors across all reviewed surfaces/theme/locale/viewport combinations.

Layout/geometry checks (16/17 passed; the single non-pass was an incorrect assertion in the reviewer script itself — expected an exact mobile input width derived from toolbar math — while the real requirement, no horizontal overflow, is satisfied; `scrollWidth === clientWidth` on mobile):

- Desktop toolbar is a single aligned row; search (770px, h-36), select (h-36), and Grid/List toggle do not overlap; search icon vertically centered; clear button sits inside the input, vertically centered, with 40px right padding so text is not obscured.
- Mobile toolbar stacks: search full-width (316px within `p-3` toolbar inside 390px viewport with `px-6` page padding), select and toggle below; grid is single column; no horizontal overflow.
- Grid cards equal-height (122px) and row-aligned; List rows equal-height (58px).
- Focus: search input shows `focus-visible` border/ring; focus lands on input; typing updates results; Tab from input reaches the accessible clear action.

### Requested changes

- None. Visual QA passes.

### Notes

- The reviewer script initially assumed a "Category filter" label, but the shipped label is "Filter by category" (EN) / "Filtrar por categoría" (ES); the app is correct.
- `type="search"` may surface a native cancel glyph in WebKit/Safari in addition to the custom accessible clear button; cosmetic only, not observed in Chromium, no action required.
