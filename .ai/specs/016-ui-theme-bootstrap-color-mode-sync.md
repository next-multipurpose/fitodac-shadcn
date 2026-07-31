# 016 — UI theme bootstrap and color-mode synchronization

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Integrate the new Cobalt/Default UI-theme runtime with the existing Light/Dark color-mode runtime so:

- Cobalt is applied before first paint by default;
- a persisted Default preference loads without a flash of Cobalt;
- a persisted Cobalt preference loads without a flash of Default;
- Cobalt automatically switches between its Light and Dark token variants whenever the effective color mode changes;
- UI theme and color mode remain fully independent state dimensions.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 015 must be `DONE`.

## Existing color-mode architecture

The project already owns Light/Dark behavior in:

```text
src/lib/theme.ts
```

including:

- `Theme = "light" | "dark"`;
- `THEME_STORAGE_KEY = "theme"`;
- stored/system resolution;
- `.dark` class application;
- `colorScheme`;
- an early `THEME_BOOTSTRAP_SCRIPT`.

The existing header `AnimatedThemeToggler` consumes this runtime.

Preserve this ownership.

Do not merge Cobalt/Default into `Theme`.

Do not rename Light/Dark to UI theme.

## Scope

### Early UI-theme bootstrap

Add a pre-paint UI-theme bootstrap derived from the runtime/canonical Cobalt registry.

It must run in the document head early enough that a new visitor whose UI theme resolves to Cobalt does not visibly render Default first.

Resolution:

```text
localStorage["ui-theme"] valid?
        ├── cobalt  -> Cobalt
        ├── default -> Default
        └── absent/invalid -> Cobalt
```

The bootstrap must determine effective color mode from the state already established by the existing color-mode bootstrap.

Preferred sequence:

```text
1. THEME_BOOTSTRAP_SCRIPT
   -> resolves Light/Dark
   -> applies/removes .dark

2. UI_THEME_BOOTSTRAP_SCRIPT
   -> resolves Cobalt/Default
   -> reads effective color mode from document root
   -> applies Cobalt variant or no overrides
```

Do not independently reimplement the full Light/Dark storage/system resolver inside the UI-theme bootstrap if the effective `.dark` state has already been established.

### Canonical Cobalt source in bootstrap

The early UI-theme bootstrap may embed a serialized Cobalt token payload only when that payload is generated directly from:

```text
src/registry/themes/cobalt/registry.json
```

through imported runtime data.

Do not manually type token values into the bootstrap string.

The canonical registry remains the single source of truth.

### Bootstrap behavior

For Cobalt:

```text
common = cssVars.theme
variant = root has .dark ? cssVars.dark : cssVars.light
apply common + variant
```

For Default:

```text
remove/no Cobalt overrides
globals.css wins
```

Because a clean first page has no Cobalt overrides yet, Default bootstrap does not need to copy any Default token values into inline styles.

### Root-layout integration

Integrate the color-mode and UI-theme bootstrap in:

```text
src/app/layout.tsx
```

or the smallest existing document-level boundary.

Requirements:

- both execute before visible app content;
- color mode resolves before UI theme variant selection;
- existing `suppressHydrationWarning` behavior remains narrowly scoped to the known document-class bootstrap mismatch;
- no client provider is required solely for UI theme;
- do not hide the full page until React mounts.

### Runtime synchronization when color mode changes

When effective color mode changes:

```text
light ↔ dark
```

Cobalt must immediately reapply the correct variant.

When Default is active, color-mode switching must continue to rely only on:

```text
:root
.dark
```

from `globals.css`.

Do not store Cobalt's color-mode variant separately.

Do not add:

```text
ui-theme-mode
cobalt-mode
```

storage keys.

### Minimal synchronization boundary

Integrate the two runtimes without merging their state.

A valid architecture is one of:

#### Event-based

Color-mode runtime emits a focused browser event after applying an effective Light/Dark mode.

UI-theme runtime/controller listens and reapplies the active UI theme for that effective mode.

or:

#### Explicit composition

A small integration helper coordinates:

```text
apply color mode
then reapply active UI theme
```

without moving UI-theme storage into `theme.ts`.

Choose the smallest approach that preserves clear ownership and testability.

Avoid circular imports.

### Existing system-follow behavior

The current color-mode runtime supports:

```text
no manual color-mode selection
        ↓
follow prefers-color-scheme
```

When system mode changes and Cobalt is active:

```text
Cobalt Light
        ↓ system changes
Cobalt Dark
```

When Default is active:

```text
Default Light
        ↓ system changes
Default Dark
```

The UI-theme preference itself must remain unchanged.

### Independence requirements

Changing UI theme:

```text
Cobalt -> Default
```

must not change:

- `.dark`;
- effective Light/Dark mode;
- `localStorage.theme`.

Changing color mode:

```text
Light -> Dark
```

must not change:

- `localStorage["ui-theme"]`;
- Cobalt/Default selection.

All four combinations must be reachable and stable:

```text
Cobalt + Light
Cobalt + Dark
Default + Light
Default + Dark
```

### No flash / hydration regression

Verify pre-paint behavior for:

- no stored UI theme -> Cobalt;
- stored Cobalt;
- stored Default;
- each of those under effective Light and Dark.

Do not fix flash by rendering the entire app invisible until hydration.

Do not delay UI theme application until a React `useEffect`.

## Out of scope

- Header dropdown selector; spec 017 handles it.
- New UI themes.
- Three-state color-mode selector.
- Replacing AnimatedThemeToggler.
- Replacing `src/lib/theme.ts`.
- Default registry JSON.
- Theme provider architecture.
- Server/user-account persistence.
- Cross-tab synchronization unless already naturally supported by current runtime.
- Theme transition animation for Cobalt/Default.

## Acceptance criteria

- Color mode continues to be owned by `src/lib/theme.ts`.
- UI theme continues to be owned by `src/lib/ui-theme.ts`.
- Existing `theme` localStorage key remains unchanged.
- New `ui-theme` key remains independent.
- Color-mode bootstrap runs before UI-theme bootstrap.
- No stored UI-theme preference resolves to Cobalt before first paint.
- Stored Default loads with no Cobalt token overrides.
- Stored Cobalt loads with correct Light/Dark Cobalt variant.
- Invalid UI-theme storage resolves to Cobalt.
- Cobalt switches its variant when effective Light/Dark changes.
- Default continues to use `globals.css` for both modes.
- UI-theme change never changes color-mode state.
- Color-mode change never changes UI-theme selection.
- All four UI-theme/color-mode combinations work.
- No manually duplicated Cobalt values appear in bootstrap code.
- No whole-page hydration gate is introduced.
- No visible Default→Cobalt flash exists on first Cobalt load.
- No browser hydration errors are introduced.

## Architecture

Decision required: no.

Required state model:

```text
UI Theme
  ├── cobalt
  └── default

Color Mode
  ├── light
  └── dark
```

Composition:

```text
color-mode bootstrap
        ↓
effective .dark state
        ↓
UI-theme bootstrap
        ↓
Cobalt registry override OR Default fallback
```

Runtime update:

```text
Light/Dark changes
        ↓
effective color mode
        ↓
reapply active UI theme
        ↓
Cobalt variant changes OR Default does nothing
```

## Relevant files

Existing:

- `src/lib/theme.ts`
- `src/components/animated-theme-toggler.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/registry/themes/cobalt/registry.json`

From spec 015:

- `src/lib/ui-theme.ts`
- UI-theme tests

Expected focused additions may include:

- exported `UI_THEME_BOOTSTRAP_SCRIPT`;
- small synchronization helper/event/controller;
- integration tests for bootstrap/runtime coordination.

## Tests

Using existing Vitest/RTL infrastructure, cover:

### Bootstrap resolution

- no UI-theme storage + Light -> Cobalt Light variables;
- no UI-theme storage + Dark -> Cobalt Dark variables;
- stored Cobalt + Light;
- stored Cobalt + Dark;
- stored Default + Light -> no Cobalt overrides;
- stored Default + Dark -> no Cobalt overrides;
- invalid storage -> Cobalt.

### Independence

Starting from:

```text
Cobalt + Light
```

switch UI theme to Default:

- remains Light;
- `.dark` unchanged;
- color-mode storage unchanged.

Starting from:

```text
Cobalt + Dark
```

switch UI theme to Default:

- remains Dark;
- `.dark` unchanged.

Change color mode while Cobalt:

- UI-theme storage remains Cobalt;
- Cobalt variant changes.

Change color mode while Default:

- UI-theme storage remains Default;
- no Cobalt overrides appear.

### System-follow integration

With no stored color-mode selection:

- system Light -> Cobalt Light;
- system change to Dark -> Cobalt Dark;
- same behavior with Default using global fallbacks.

### Bootstrap source integrity

Test that bootstrap token data is derived from the same canonical Cobalt registry object/runtime representation.

Do not duplicate expected entire token catalogs in test fixtures.

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

Clear UI-theme storage and verify Cobalt default in:

```text
system Light
system Dark
```

Then verify:

```text
Cobalt + Light
Cobalt + Dark
Default + Light
Default + Dark
```

on representative pages:

```text
/
/components
/components/button
/components/badge
/components/alert
```

Check:

- no first-paint theme flash;
- no hydration warning;
- header and preview components use same active UI theme;
- color-mode toggle does not reset Cobalt/Default selection;
- switching system mode before manual Light/Dark override updates Cobalt variant correctly.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must explicitly validate the four UI-theme/color-mode combinations and first-paint behavior.
