# 011 — System theme support and animated header toggler

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add site-wide light/dark color mode with system preference as the default and a persistent header toggle using Magic UI's circular `AnimatedThemeToggler` effect.

Theme changes must apply to the complete site, including all component demo previews.

Use:

- `next-themes` for theme state, system detection, class application, and persistence;
- a **local copied implementation** of Magic UI's `AnimatedThemeToggler` for the View Transitions circular reveal.

Do not install Magic UI as a runtime component library.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 010 must be `DONE`.

## Product decisions

Supported effective color modes:

```text
light
dark
```

Initial preference:

```text
system
```

On first visit:

```text
OS light -> site light
OS dark  -> site dark
```

After the user manually toggles:

```text
manual light/dark choice persists in browser
```

The header toggle uses the circular View Transition reveal originating from the control.

## Scope

### next-themes

Add `next-themes` as the theme-state dependency.

Create a focused site theme provider using the library's App Router-compatible pattern.

Configure it so:

- theme class is applied to the document root;
- default theme is `system`;
- system preference is enabled;
- manual light/dark selection persists using the library's standard persistence;
- the site's existing `.dark` CSS token set is used.

The implementation must not create a competing custom theme store.

### Root document integration

Update the root document only as required by `next-themes`.

Use the appropriate hydration protection on `<html>` when required by the library.

Do not silence unrelated hydration errors.

The current CSS already uses:

```css
@custom-variant dark (&:is(.dark *));
.dark { ... }
```

Preserve that semantic token architecture.

Do not replace it with hardcoded per-component dark classes.

### AnimatedThemeToggler

Add only the Magic UI animated theme toggler component source required for this feature.

Preferred site-only location:

```text
src/components/animated-theme-toggler.tsx
```

or another clearly site-owned UI area.

Do **not** place it in `src/registry/` unless a separate product decision later makes it a distributable Fitodac component.

Do not add Magic UI itself as a runtime dependency.

Use the Magic UI implementation as the source/reference for:

- View Transitions API;
- circular clip-path reveal;
- transition origin from the toggle control;
- light/dark icon/state behavior.

Use the controlled integration supported by the component:

```text
resolved theme from next-themes
        ↓
AnimatedThemeToggler
        ↓
onThemeChange
        ↓
next-themes setTheme
```

The copied component may be adapted only as needed to fit current project imports/styles/accessibility.

### Header theme toggle

Place the animated theme toggle at the far-right control area of the header, adjacent to the language selector.

Conceptually:

```text
Fitodac UI       Components          [EN ▾] [theme]
```

Exact responsive layout may follow existing site conventions.

### Theme behavior

The theme must affect:

- header;
- body/background;
- home page;
- catalog;
- component detail metadata;
- demo card shell;
- rendered component previews;
- Code presentation;
- prompt/copy controls;
- dropdown menus;
- language selector.

All surfaces must derive color from existing semantic tokens.

### Component previews

Verify the real demo components inherit active theme through the document `.dark` class.

At minimum validate current demos for:

- Button;
- Badge;
- Alert.

Do not inject a separate theme provider around each preview.

### System behavior

Before a manual preference exists:

- system dark renders dark;
- system light renders light;
- changing OS preference while the theme remains `system` should update the site according to `next-themes` behavior.

After a manual light/dark choice:

- the manual choice persists;
- it is not overwritten by OS changes until the stored preference is reset externally.

No explicit `System` option is required in the header because the user requested a Light/Dark toggle rather than a three-option selector.

### View Transition fallback

The theme toggle must remain functional when:

- `document.startViewTransition` is unavailable;
- animation cannot run.

In those cases the theme changes without the circular animation.

Respect reduced-motion accessibility.

When `prefers-reduced-motion: reduce` applies, do not require the circular expansion animation for the toggle to work.

### Mount/hydration state

Avoid incorrect theme icon/state during hydration.

The toggle must not produce hydration warnings.

Use a minimal mounted-state strategy if needed by `next-themes`.

Do not hide the entire page until hydration.

## Out of scope

- More than light/dark effective modes.
- A theme editor.
- Theme presets.
- Custom user colors.
- Distributing AnimatedThemeToggler as a registry component.
- Installing the full Magic UI component library.
- Replacing the current CSS token system.
- Per-component theme overrides.
- Theme selection in the URL.
- Synchronizing theme to an authenticated user account.

## Acceptance criteria

- `next-themes` is installed.
- Magic UI is not added as a runtime dependency.
- AnimatedThemeToggler exists as local project code.
- The toggler uses the circle reveal by default.
- First visit uses system color preference.
- System dark produces site dark.
- System light produces site light.
- Manual toggle changes light -> dark and dark -> light.
- Manual choice survives reload.
- Theme applies through the document class and existing semantic variables.
- Site chrome and component demos change together.
- Button, Badge, and Alert demos inherit both modes.
- Language dropdown/header controls inherit both modes.
- Browsers without View Transitions still toggle correctly.
- Reduced-motion users can toggle without requiring animation.
- No hydration warning occurs from theme state.
- Header remains responsive on desktop/mobile.
- Existing locale persistence remains intact.
- Existing demo Preview/Code/Copy prompt behavior remains intact.
- Automated tests cover provider/toggle contracts where practical.
- Browser/UI review verifies system, light, dark, and persisted states.

## Architecture

Decision required: no.

Human-approved architecture:

```text
next-themes
   ├── system detection
   ├── persistence
   ├── resolvedTheme
   └── document .dark class
           ↓
existing semantic CSS variables
           ↓
site + component previews

AnimatedThemeToggler (local copied component)
   └── View Transition circular reveal
```

Magic UI is a source of component code, not a runtime library dependency.

### Dependency rule

Allowed new production dependency:

```text
next-themes
```

Do not add:

```text
magic-ui
@magicui/*
```

as runtime packages solely for this toggle.

The Magic UI registry command may be used to obtain the source, but the resulting component must live locally in the repository.

## Relevant files

Existing:

- `package.json`
- `pnpm-lock.yaml`
- `src/app/layout.tsx`
- `src/app/globals.css`
- header/navigation implementation
- language selector from spec 010
- current demos for Button, Badge, Alert

Expected additions may include:

- `src/components/theme-provider.tsx`
- `src/components/animated-theme-toggler.tsx`
- `src/components/theme-toggle.tsx` if a small controlled adapter improves separation

Reuse existing local `Button`/icon infrastructure where the Magic UI component permits it.

## Tests

Using the test foundation from spec 006, add focused tests for:

- ThemeProvider configured for system default;
- resolved light -> toggle requests dark;
- resolved dark -> toggle requests light;
- controlled callback path updates through `next-themes`;
- missing View Transitions API still toggles;
- reduced-motion fallback where testable;
- header exposes an accessible theme-toggle name/state.

Do not attempt to validate the full circular visual animation in jsdom.

The actual reveal is UI/browser-review responsibility.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

### Browser/UI — system default

Clear stored theme preference.

Test with OS/browser preference:

- light;
- dark.

Verify the site follows the system.

### Browser/UI — manual persistence

- start light;
- click toggle;
- observe circular reveal;
- site and demos become dark;
- reload;
- dark remains;
- click toggle;
- observe circular reveal;
- light remains after reload.

### Component coverage

Verify in both light and dark:

- `/`;
- `/components`;
- `/components/button`;
- `/components/badge`;
- `/components/alert`.

Check:

- backgrounds;
- foreground text;
- borders;
- demo cards;
- Preview content;
- Code content;
- language dropdown;
- header;
- focus states.

### Transition fallback

In a browser/environment without View Transitions support or with the API disabled:

- toggle still changes theme;
- no runtime error.

With reduced motion:

- toggle still changes theme;
- animation is suppressed/reduced appropriately.

### Combined persistence

Set:

```text
locale = es
theme = dark
```

Reload and navigate.

Both preferences must remain independently correct.

No browser console/hydration errors.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must explicitly verify the circular reveal, system-default behavior, persisted manual theme, and themed component previews.
