# 017 — Header UI-theme selector, persistence, and regression coverage

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add a compact header selector that lets users switch the demo site between:

```text
Cobalt
Default
```

The selector must:

- show the active UI theme;
- apply changes immediately;
- persist the selection in `localStorage["ui-theme"]`;
- leave Light/Dark color mode untouched;
- apply globally to the site and all component previews.

Cobalt remains the default when no valid preference is stored.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 016 must be `DONE`.

## Scope

### Header control

Add a dedicated site UI component, preferably:

```text
src/components/theme-selector.tsx
```

This component is for:

```text
Cobalt / Default
```

It is distinct from:

```text
AnimatedThemeToggler
```

which remains responsible for Light/Dark.

The header must visually keep both controls separate.

Conceptually:

```text
Fitodac UI      Components        [EN ▾] [Cobalt ▾] [☀/🌙]
```

Exact sizing/alignment should follow the existing header style.

### Selector type

Use a dropdown/menu selector unless an existing repository pattern provides a simpler equivalent.

Before creating UI, inspect and reuse existing shadcn/registry primitives such as:

```text
DropdownMenu
Button
```

when suitable.

Do not install a new dropdown library.

### Options

Expose exactly:

```text
Cobalt
Default
```

No third option.

No theme discovery.

No disabled placeholders for future themes.

No theme-management UI.

### Active state

The control must show the currently resolved UI theme.

Fresh browser:

```text
Cobalt
```

Stored:

```text
ui-theme = default
```

must show:

```text
Default
```

The visible active label must stay in sync after switching.

### Selection behavior

When user selects Cobalt:

1. apply Cobalt immediately using `src/lib/ui-theme.ts`;
2. preserve current effective Light/Dark mode;
3. persist:

```text
ui-theme = cobalt
```

When user selects Default:

1. remove Cobalt overrides immediately;
2. preserve current effective Light/Dark mode;
3. persist:

```text
ui-theme = default
```

Do not reload the page solely to change UI theme.

Do not change URL.

Do not change locale.

### Color-mode independence

Switching:

```text
Cobalt -> Default
Default -> Cobalt
```

must not call the existing Light/Dark toggler and must not change:

```text
localStorage.theme
html.dark
document.documentElement.style.colorScheme
```

The existing animated Light/Dark toggle must remain functional beside the new selector.

### Global propagation

The selector must not update components individually.

It should update root custom properties once through the UI-theme runtime.

That single root change must affect:

- site header;
- home;
- component catalog;
- detail pages;
- demo cards;
- previews;
- dropdowns;
- Code presentation;
- buttons/badges/alerts;
- future semantic-token-based components.

Do not introduce React conditions like:

```tsx
theme === "cobalt" ? "bg-blue-..." : "..."
```

inside registry primitives/components.

### Existing semantic components

At minimum visually verify theme switching for representative components that consume semantic tokens:

```text
Button
Badge
Alert
```

Also verify a surface/container using:

```text
background
card
border
muted
```

and any current component that uses extended tokens such as:

```text
surface
primary-hover
shadow-sm
radius-md
```

when those components already exist.

Do not modify component styling merely to exaggerate theme differences.

### i18n

The site's user-facing copy is already localized.

Add translation keys for the selector's accessibility/UI labels where required.

English canonical labels should communicate:

```text
Theme
Cobalt
Default
Select theme
```

Spanish equivalents should be provided where actual translatable copy exists.

Proper theme names may remain:

```text
Cobalt
Default
```

in both locales if treated as product/theme names.

Do not hardcode translatable accessibility labels in only one language.

### Accessibility

The selector must:

- be keyboard accessible;
- have an accessible name;
- expose both choices;
- indicate the current selection;
- preserve focus sensibly after selection;
- not rely solely on color/visual appearance to communicate the active theme.

Use the semantics provided by the reused dropdown/menu primitive.

### Client boundary

The selector may be a focused Client Component because it reads/writes browser storage and applies runtime CSS variables.

Do not convert the full root layout or pages to Client Components.

Do not introduce a global React theme provider solely to display the selector state.

The selector may initialize from the already-resolved document/storage state after mount, while the pre-paint bootstrap from spec 016 remains responsible for preventing initial flash.

### Persistence behavior

Verify:

#### First visit

```text
no ui-theme
    ↓
Cobalt active
```

#### Select Default

```text
ui-theme = default
    ↓
Cobalt overrides removed
    ↓
globals.css fallback active
```

#### Reload

```text
ui-theme = default
    ↓
Default remains active before paint
```

#### Select Cobalt

```text
ui-theme = cobalt
    ↓
canonical Cobalt values applied
```

#### Reload

```text
ui-theme = cobalt
    ↓
Cobalt remains active before paint
```

### Existing header controls

Preserve:

- Fitodac UI navigation;
- locale selector;
- animated Light/Dark toggler.

The new selector must coexist with them on desktop and mobile.

Do not redesign the whole navigation.

### Mobile layout

At narrow widths:

- controls remain reachable;
- dropdown is usable;
- no page-level horizontal overflow;
- header wrapping remains intentional;
- theme labels do not break layout.

Use the existing responsive header behavior rather than introducing a full mobile-navigation system.

## Stable repository rules

Update stable guidance where appropriate so future agents understand:

- Cobalt is the default demo-site UI theme;
- Default lives in `globals.css`;
- Cobalt tokens live only in its theme registry;
- UI theme and color mode are separate;
- registry components consume semantic tokens and do not branch on Cobalt;
- future theme work must not duplicate Cobalt tokens into runtime constants.

At minimum inspect:

```text
.ai/rules.md
docs/conventions.md
docs/verification.md
```

Add only stable project-level rules, not implementation diary notes.

## Out of scope

- More themes.
- Theme gallery/page.
- Theme editor.
- Theme marketplace.
- Token editing UI.
- Per-component theme selection.
- Theme-specific component forks.
- Locale-specific themes.
- URL theme state.
- Account/server persistence.
- Automatic theme registry discovery.
- Installing a new state-management library.
- Combining the Cobalt/Default selector with the Light/Dark toggle into one state/control.

## Acceptance criteria

- Header has a visible Cobalt/Default selector.
- Fresh browser shows Cobalt.
- Selector shows the active UI theme.
- Selecting Default immediately restores `globals.css` values.
- Selecting Cobalt immediately applies canonical Cobalt registry values.
- Selection persists across reload/navigation.
- Cobalt remains the fallback for missing/invalid storage.
- UI-theme switching does not change Light/Dark state.
- Light/Dark switching does not change UI-theme selection.
- Selector works in English and Spanish site locales.
- Header Light/Dark toggle remains available.
- All component previews inherit the global UI theme.
- Button, Badge, and Alert visibly respond through semantic tokens without component-specific branching.
- No Cobalt-specific conditional styling is added inside registry primitives/components.
- No Cobalt token copy is added outside the canonical registry.
- Default values remain in `globals.css`.
- No Default registry JSON is added.
- No additional theme/state library is installed.
- Desktop/mobile header remains usable.
- Keyboard operation and accessible selected state are verified.
- Automated tests cover selector interaction and persistence.
- Final browser review covers all four UI-theme/color-mode combinations.

## Architecture

Decision required: no.

Human-approved UI:

```text
Header
 ├── Navigation
 ├── Language selector
 ├── UI Theme selector
 │     ├── Cobalt
 │     └── Default
 └── Light/Dark toggle
```

State remains:

```text
localStorage["ui-theme"]
    = cobalt | default

localStorage["theme"]
    = light | dark | absent(system)
```

These are independent.

## Relevant files

Existing:

- `src/app/layout.tsx`
- `src/components/language-switcher.tsx`
- `src/components/animated-theme-toggler.tsx`
- existing dropdown/menu/button primitives
- i18n message catalogs
- `src/app/globals.css`
- `src/lib/theme.ts`

From specs 015–016:

- `src/lib/ui-theme.ts`
- UI-theme bootstrap/synchronization helpers

Expected:

- `src/components/theme-selector.tsx`
- i18n key updates
- selector interaction tests
- stable docs/rules updates

## Tests

Using existing Vitest/RTL setup, add focused tests for:

### Initial selector state

- no stored UI theme -> Cobalt label/selected state;
- stored Cobalt -> Cobalt;
- stored Default -> Default;
- invalid storage -> Cobalt.

### User interaction

Starting Cobalt + Light:

- select Default;
- document remains Light;
- Cobalt overrides removed;
- `ui-theme` persisted as Default;
- `theme` storage unchanged.

Starting Cobalt + Dark:

- select Default;
- `.dark` remains present;
- Default Dark fallback remains active.

Starting Default + Light:

- select Cobalt;
- Cobalt Light variables apply;
- Light remains active.

Starting Default + Dark:

- select Cobalt;
- Cobalt Dark variables apply;
- Dark remains active.

### Storage failures

- selector still applies requested theme if persistence fails;
- UI does not crash.

### Accessibility

- control has accessible name;
- both choices are reachable;
- current choice is represented;
- keyboard selection works with the reused menu primitive.

### i18n

Representative English/Spanish selector accessibility labels resolve.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

### Browser/UI matrix

Verify:

```text
Cobalt + Light
Cobalt + Dark
Default + Light
Default + Dark
```

on:

```text
/
/components
/components/button
/components/badge
/components/alert
```

For each combination inspect:

- site background;
- cards/surfaces;
- borders;
- typography;
- semantic primary states;
- radii/shadows where represented;
- component previews;
- header controls.

### Persistence

Test:

```text
Cobalt -> reload
Default -> reload
```

and navigation between pages.

### Independence

Set:

```text
Default + Dark
```

change only UI theme:

```text
Cobalt + Dark
```

Then change only color mode:

```text
Cobalt + Light
```

Then change only UI theme:

```text
Default + Light
```

At each step verify only the intended state dimension changed.

### First-paint regression

Clear storage and reload:

- Cobalt must be visible immediately;
- no Default flash;
- selector resolves to Cobalt after hydration.

Set Default and reload:

- Default must be visible immediately;
- no Cobalt flash;
- selector resolves to Default.

### Locale regression

Verify selector/header in:

```text
en
es
```

with both UI themes.

### Console/hydration

No runtime errors, hydration warnings, or theme-related console errors.

## Implementation report

### Changes

- Added a focused `ThemeSelector` Client Component using the existing Button and DropdownMenu radio primitives, with exactly Cobalt and Default choices.
- Composed the selector beside the existing language and Light/Dark controls in the root header.
- Added English and Spanish theme labels and accessible selector names.
- Added selector regression coverage for initial resolution, all four UI-theme/color-mode combinations, persistence independence, storage failure, selected semantics, keyboard selection, focus restoration, and Spanish labels.
- Documented the stable separation between UI theme and color mode, the Cobalt registry as canonical source, Default globals, and semantic-token-only distributed components.

### Tests / verification

- `pnpm ai:graphify:query "Where are the site header, locale selector, light dark theme toggle, UI theme runtime from spec 016, i18n messages, and relevant tests connected? Return file paths and dependency relationships."`: passed.
- Focused Vitest suite: passed, 51 tests across selector/theme/i18n regressions.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm test`: passed, 15 files / 114 tests.
- `./init.sh`: passed, including demo registry check, lint, typecheck, and 114 tests.
- `pnpm build`: environment-blocked; Turbopack could not bind an internal CSS worker port under the managed sandbox (`Operation not permitted`).
- Browser/UI: environment-blocked. The in-app Chrome connection timed out twice while creating a controllable tab; standalone Playwright Chromium then failed before launch because the macOS sandbox denied Mach port registration. No browser or screenshot claims are made; visual review remains pending.

### Modified files

- `src/components/theme-selector.tsx`
- `src/app/layout.tsx`
- `messages/en.json`
- `messages/es.json`
- `tests/theme-selector.test.tsx`
- `.ai/rules.md`
- `docs/conventions.md`
- `.ai/specs/017-header-ui-theme-selector.md`

### Notes

- No dependency was added and no registry primitive/component styling was changed.
- The selector applies the current document color mode to the UI-theme runtime and never calls or mutates the Light/Dark preference.
- Upstream shadcn CLI docs were network-unavailable, so implementation was verified against the installed local Button/DropdownMenu primitives and the repository's existing LanguageSwitcher pattern.

## Technical review

### Verification

- init.sh: passed (demo registry check, lint, typecheck, 114 tests)
- lint: passed
- typecheck: passed
- test: passed, 15 files / 114 tests
- build: passed (reproduced by reviewer; Turbopack warning on `get-integration-bundle.ts` is pre-existing and unrelated)
- supabase: not applicable
- ui/playwright: not available in reviewer environment; pending UI reviewer

### Review

- Scope: passed
- Architecture: passed
- Code: passed
- Out-of-scope changes: no

### Result

- UI_REVIEW

### Requested changes

- None.

### Notes

- Prerequisite met: spec 016 is `DONE`; work is on `migration-to-demo-site`.
- `ThemeSelector` is a focused Client Component composed in `src/app/layout.tsx` between the language switcher and the Light/Dark toggler, matching the human-approved header concept and the existing `LanguageSwitcher` pattern. It reuses the repository's Button and DropdownMenu radio primitives; no dependency or registry primitive/component styling was changed.
- Behavior verified against `src/lib/ui-theme.ts` and via tests: Cobalt is the fallback for missing/invalid storage; Default removes Cobalt overrides and restores `globals.css`; persistence is independent from `localStorage.theme`, `html.dark`, and `colorScheme`; the selector reads the current document color mode and never calls or mutates the Light/Dark preference. Spec-016 `initializeUIThemeSynchronization` keeps Cobalt tokens in sync on color-mode change.
- Acceptance criteria covered: initial resolution (fresh/Cobalt/Default/invalid), all four UI-theme/color-mode combinations, storage-failure resilience, accessible name, radio selected state, keyboard selection, focus restoration, and English/Spanish labels. No Cobalt token copy exists outside `src/registry/themes/cobalt/registry.json`, and no Default registry JSON was added.
- i18n parity between `messages/en.json` and `messages/es.json` is enforced by the existing `tests/i18n/messages.test.ts`; new keys were added under the `Header` namespace in both locales with theme names kept as product names.
- The implementation report claim that `pnpm build` was environment-blocked could not be reproduced by the reviewer; the reviewer's build finished successfully. Visual/browser review remains pending as documented.

## Visual review

### Reviewed surfaces

- Routes: `/`, `/components`, `/components/button`, `/components/badge`, `/components/alert`.
- Components: `ThemeSelector` trigger and dropdown, `LanguageSwitcher`, `AnimatedThemeToggler`, root header, previews consuming semantic tokens (Button/Badge/Alert demos, cards/surfaces).
- Viewports: desktop 1280x800, mobile 390x844.
- Environment: existing Next.js dev server on `http://localhost:3000`; Playwright 1.62.1 / project-local Chromium.

### Checks

Browser automation (`review.mjs`, 182 assertions) + DOM geometry (`geometry.mjs`):

- **Cobalt default**: fresh storage resolves to Cobalt (`--background #f6f8fb`, `--primary #315efb`); trigger shows "Cobalt"; no `ui-theme` key written on first visit. Passed.
- **Default fallback / removal**: selecting Default immediately restores `globals.css` values (computed `lab(100% 0 0)` background, neutral primary); persists `ui-theme=default`; invalid storage falls back to Cobalt. Passed.
- **Persistence + first-paint**: with `ui-theme=default`/`cobalt`, computed tokens are already correct at `domcontentloaded` (bootstrap runs before hydration); trigger resolves to the stored theme. No flash window observed. Passed.
- **Independence matrix**: all four combinations verified — Cobalt+Light, Cobalt+Dark, Default+Light, Default+Dark — by toggling only one dimension at a time; switching UI theme never touches `html.dark`, `localStorage.theme`, or `colorScheme` (value is set by the Light/Dark bootstrap, unchanged by the selector), and toggling Light/Dark never changes `ui-theme`. Passed.
- **Selector active state**: radio menu exposes exactly Cobalt and Default; exactly one item checked; checked item matches trigger label after every switch. Passed.
- **Accessibility**: accessible name (`aria-label="Select theme"`), keyboard open/navigate/select with the reused menu primitive (focus reaches target item), focus restored to trigger after selection. Passed.
- **i18n**: English and Spanish (`NEXT_LOCALE=es`) — Spanish accessible name "Seleccionar tema", menu label "Tema", theme names kept as product names; key parity enforced by existing `messages.test.ts`. Passed.
- **Visual navigation / header**: control order matches the approved concept — Navigation, Language `[EN ▾]`, UI Theme `[Cobalt ▾]`, Light/Dark toggle. Passed.
- **Visual consistency contract**: `ThemeSelector` and `LanguageSwitcher` use the same `Button size="sm" variant="outline"` + `DropdownMenu` radio primitive — identical height (h-8, 32px), `text-sm`, `rounded-md`, border/hover/focus treatment; all three header controls share the same height; dropdown uses the popover surface. Passed.
- **Responsive**: at 390px, no page-level horizontal overflow on any route, header wraps and remains reachable, dropdown fits the viewport, selecting Default works. Passed.
- **No overflow / regression**: no horizontal overflow at 1280px on any reviewed route in either theme. Passed.
- **Console/hydration**: zero console errors, zero hydration warnings, zero page errors across the whole session. Passed.
- **No theme conditional in distributed code**: grep shows Cobalt referenced only in the canonical registry, `src/lib/ui-theme.ts` (which reads the registry), and selector labels; no Cobalt token copy and no `theme === "cobalt"` styling branch in any registry primitive/component. Passed.

Screenshots stored under `.ai/run/logs/ui-review-017/`.

- Desktop: passed
- Mobile: passed
- Visual navigation: passed
- Visible states: passed

### Result

- REVIEW

### Requested changes

- None.
