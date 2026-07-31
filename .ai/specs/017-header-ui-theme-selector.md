# 017 — Header UI-theme selector, persistence, and regression coverage

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must explicitly verify:

- selector active state;
- Cobalt default;
- Default fallback behavior;
- persistence;
- independence from Light/Dark;
- all four theme/mode combinations;
- representative component previews;
- desktop/mobile header behavior.
