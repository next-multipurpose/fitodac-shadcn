# 011 — System theme support and animated header toggler

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add site-wide light/dark color mode with system preference as the initial default and a persistent header toggle using Magic UI's circular `AnimatedThemeToggler` effect.

Theme changes must apply to the complete site, including all component demo previews.

Use a **local copied implementation** of Magic UI's `AnimatedThemeToggler`.

Do **not** install `next-themes`.

Do **not** install Magic UI as a runtime component library.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 010 must be `DONE`.

## Product decisions

Supported effective color modes:

```text
light
dark
```

Initial behavior:

```text
no stored preference
        ↓
system preference
        ↓
OS light -> site light
OS dark  -> site dark
```

After the user manually toggles:

```text
manual light/dark choice
        ↓
persist in localStorage
        ↓
future visits use stored preference
```

The header toggle must use the circular View Transition reveal originating from the control.

## Scope

### Theme state model

Implement the simplest possible theme state model using:

- the document root `.dark` class;
- `localStorage` for an explicit user preference;
- `prefers-color-scheme` for the system default when no explicit preference exists.

Use one stable storage key, preferably:

```text
theme
```

Supported stored values:

```text
light
dark
```

Do not store `system`.

The absence of a stored value means:

```text
follow system preference
```

Do not add a theme context/provider unless a strict blocker is demonstrated and documented.

### Initial theme bootstrap

Add a minimal bootstrap mechanism that runs early enough to avoid a visible flash of the wrong theme.

On first load:

1. read the stored theme preference;
2. if it is `light`, ensure `.dark` is absent;
3. if it is `dark`, ensure `.dark` is present;
4. if no valid stored preference exists, resolve `prefers-color-scheme`;
5. apply `.dark` according to the resolved system preference.

Invalid stored values must be ignored and treated as no preference.

The bootstrap must not depend on a React client render completing first if that would cause a visible flash.

Keep this logic narrowly scoped to theme initialization.

### Follow system before manual override

While no explicit preference is stored, the site should follow system color mode.

If the browser/OS preference changes while there is no stored theme value, the document should update accordingly.

Once the user manually toggles theme and a valid `light` or `dark` value is stored:

- the manual preference becomes authoritative;
- subsequent system preference changes must not override it.

Do not add a visible `System` option to the header.

### AnimatedThemeToggler

Add only the Magic UI animated theme toggler component source required for this feature.

Preferred site-only location:

```text
src/components/animated-theme-toggler.tsx
```

or another clearly site-owned UI area.

Do **not** place it in `src/registry/` unless a separate product decision later makes it a distributable Fitodac component.

Do not add Magic UI itself as a runtime dependency.

Use Magic UI's `AnimatedThemeToggler` implementation as the source/reference for:

- View Transitions API;
- circular clip-path reveal;
- transition origin from the toggle control;
- light/dark icon/state behavior;
- document-root theme class toggling;
- local persistence behavior where applicable.

Adapt the copied implementation only as needed to fit:

- current project imports;
- existing registry primitives;
- accessibility;
- the system-default behavior required by this spec.

Do not rewrite the animation from scratch unless the copied implementation cannot be integrated cleanly.

### Toggle behavior

The toggle must:

1. determine the currently effective theme;
2. switch to the opposite effective theme;
3. apply/remove `.dark` on `<html>`;
4. persist the manual result as `light` or `dark`;
5. run the circular reveal when View Transitions are available;
6. still toggle correctly when animation is unavailable.

Conceptually:

```text
effective light
    ↓ click
animated reveal
    ↓
html.dark = true
localStorage.theme = "dark"
```

and:

```text
effective dark
    ↓ click
animated reveal
    ↓
html.dark = false
localStorage.theme = "light"
```

### Root document integration

Update the root document only as required for:

- initial theme bootstrap;
- hydration-safe class state;
- existing semantic token architecture.

The current CSS already uses:

```css
@custom-variant dark (&:is(.dark *));
.dark { ... }
```

Preserve that architecture.

Do not replace it with:

- hardcoded dark colors in components;
- per-component dark stores;
- a second theme token system.

### Header theme toggle

Place the animated theme toggle at the far-right control area of the header, adjacent to the language selector from spec 010.

Conceptually:

```text
Fitodac UI       Components          [EN ▾] [theme]
```

Exact responsive layout may follow existing site conventions.

### Theme coverage

The active theme must affect:

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

All surfaces must derive color from the existing semantic tokens.

### Component previews

Verify real demo components inherit the active document theme.

At minimum validate current demos for:

- Button;
- Badge;
- Alert.

Do not add a separate theme provider around each demo.

### View Transition fallback

The theme toggle must remain functional when:

- `document.startViewTransition` is unavailable;
- the transition throws/fails;
- animation cannot run.

In those cases the theme still changes without the circular animation.

### Reduced motion

Respect `prefers-reduced-motion: reduce`.

When reduced motion is requested:

- theme switching must still work;
- the circular expansion animation should be skipped or minimized;
- no functionality may depend on animation completion.

### Hydration and flash prevention

The implementation must avoid:

- visible light/dark flash caused by late theme initialization;
- hydration warnings caused by class mismatches;
- incorrect theme icon/state after mount.

Do not hide the whole application until hydration.

Use the smallest safe initialization strategy.

## Out of scope

- `next-themes`.
- Any other theme-state library.
- More than light/dark effective modes.
- A visible `System` selector.
- Theme editor.
- Theme presets.
- Custom user colors.
- Distributing AnimatedThemeToggler as a registry component.
- Installing the full Magic UI component library.
- Replacing the current CSS token system.
- Per-component theme overrides.
- Theme selection in the URL.
- Synchronizing theme to an authenticated user account.
- Server-side user theme storage.

## Acceptance criteria

- `next-themes` is **not** installed.
- No other theme-state library is introduced.
- Magic UI is not added as a runtime dependency.
- `AnimatedThemeToggler` exists as local project code.
- The toggler uses the circular reveal.
- A fresh browser with no stored preference follows system mode.
- System dark produces site dark.
- System light produces site light.
- While no manual preference exists, changing system mode updates the site.
- Manual toggle changes light -> dark and dark -> light.
- Manual selection stores only `light` or `dark`.
- Manual selection survives reload.
- After manual selection, system changes do not override the stored preference.
- Invalid stored values safely fall back to system behavior.
- Theme applies through the document `.dark` class and existing semantic variables.
- Site chrome and component demos change together.
- Button, Badge, and Alert demos inherit both modes.
- Language dropdown/header controls inherit both modes.
- Browsers without View Transitions still toggle correctly.
- Reduced-motion users can toggle without the reveal animation.
- No hydration warning occurs.
- No visible wrong-theme flash is introduced.
- Header remains responsive on desktop/mobile.
- Existing locale persistence remains intact.
- Existing demo Preview/Code/Copy prompt behavior remains intact.
- Automated tests cover theme resolution, persistence, fallback, and toggle behavior where practical.
- Browser/UI review verifies system, manual light, manual dark, persistence, and the circular reveal.

## Architecture

Decision required: no.

Human-approved architecture:

```text
localStorage.theme?
       │
       ├── light -> light
       ├── dark  -> dark
       └── absent
              ↓
      prefers-color-scheme
              ↓
       effective theme
              ↓
       document .dark
              ↓
existing semantic CSS variables
              ↓
site + component previews
```

Theme toggle:

```text
AnimatedThemeToggler
        ↓
View Transition circular reveal
        ↓
toggle document .dark
        ↓
persist light/dark
```

Magic UI is a source of component code, not a runtime library dependency.

### Dependency rule

Do not add:

```text
next-themes
magic-ui
@magicui/*
```

as runtime dependencies for this feature.

The Magic UI registry command may be used to obtain the component source if available, but the resulting implementation must live locally in the repository.

If the registry command cannot run in the current runtime, obtain the component source from an approved local/reference source available to the implementer rather than replacing the architecture with `next-themes`.

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

- `src/components/animated-theme-toggler.tsx`
- `src/components/theme-bootstrap.tsx` or equivalent minimal initialization helper
- focused theme utility/helper if it improves testability without creating a parallel state system

Do not create a generic theme provider unless required by a demonstrated blocker.

## Tests

Using the test foundation from spec 006, add focused tests for:

### Theme resolution

- stored `light` -> light;
- stored `dark` -> dark;
- no stored preference + system light -> light;
- no stored preference + system dark -> dark;
- invalid stored preference -> system resolution.

### Toggle behavior

- effective light -> toggle applies dark;
- effective dark -> toggle applies light;
- manual result is persisted;
- `.dark` class matches the effective theme.

### System-follow behavior

- no manual preference -> system change updates effective theme;
- manual preference exists -> system change does not override it.

### Fallbacks

- missing `document.startViewTransition` still toggles;
- transition failure still toggles;
- reduced motion still toggles.

### Header contract

- theme toggle has an accessible name/state;
- language selector remains available alongside it.

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

### Browser/UI — fresh system behavior

Clear:

```text
localStorage.theme
```

Test with system preference:

- light;
- dark.

Verify:

- initial render matches system;
- no visible wrong-theme flash;
- `<html>` class matches the effective theme;
- site and demos match.

While no stored value exists:

- switch simulated/browser system preference;
- site updates.

### Browser/UI — manual persistence

Starting from effective light:

- click theme toggle;
- observe circular reveal;
- entire site becomes dark;
- confirm `localStorage.theme === "dark"`;
- reload;
- dark remains.

Then:

- click toggle;
- observe circular reveal;
- entire site becomes light;
- confirm `localStorage.theme === "light"`;
- reload;
- light remains.

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

With View Transitions unavailable/disabled:

- toggle still changes theme;
- no runtime error.

With reduced motion:

- toggle still changes theme;
- circular animation is skipped/reduced.

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

### Changes

- Added a site-owned theme utility with valid stored-theme resolution, system fallback, document-root `.dark` application, manual `light`/`dark` persistence, and an early bootstrap script.
- Added the local `AnimatedThemeToggler` using the existing Button/icon infrastructure, Magic UI's circular View Transition pattern, reduced-motion handling, and functional fallbacks for missing or failed transitions.
- Integrated the bootstrap and accessible theme toggle into the root layout beside the existing language selector.
- Added localized English/Spanish theme-toggle labels and root View Transition CSS while preserving the existing semantic token system.
- Added focused automated coverage for resolution, document class application, persistence, system-follow behavior, transition fallbacks, reduced motion, and existing language-selector behavior.
- Made the toggler's server and first client render deterministic, then synchronized it to the bootstrapped document theme after hydration.

### Tests / verification

- `pnpm ai:graphify:query "Where are the root document, site header controls, language selector, semantic theme CSS, and demo preview components connected for system-wide theme support?"` — passed.
- `pnpm test` — passed: 8 files, 37 tests, including dark-bootstrap hydration without a React mismatch.
- `./init.sh` — passed; its documented build and UI checks were skipped by default.
- `pnpm lint` — passed.
- `pnpm exec eslint src/app src/components/animated-theme-toggler.tsx src/lib/theme.ts tests/theme.test.ts tests/animated-theme-toggler.test.tsx` — passed.
- `pnpm typecheck` — passed.
- `pnpm build` — runtime-limited: Turbopack attempted to bind an internal port and failed with `Operation not permitted (os error 1)`.
- `pnpm exec next build --webpack` — passed; all 74 static pages generated.
- `git diff --check` and focused `prettier --check` — passed.
- Browser/UI verification could not run in this sandbox because `pnpm dev` failed to bind `0.0.0.0:3000` with `listen EPERM`; visual verification remains required in `UI_REVIEW`.

### Modified files

- `src/lib/theme.ts`
- `src/components/animated-theme-toggler.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `messages/en.json`
- `messages/es.json`
- `tests/theme.test.ts`
- `tests/animated-theme-toggler.test.tsx`
- `.ai/specs/011-system-theme-animated-toggler.md`

### Notes

- No theme-state dependency or Magic UI runtime package was added.
- The local component follows Magic UI's documented View Transition origin/reveal approach and adapts persistence/system-follow behavior to this spec.
- Existing component demos inherit the root theme through the unchanged semantic CSS variables; no per-preview provider was introduced.
- Unrelated pre-existing `registry.json`, `cobalt/`, and `src/registry/themes/` work was preserved and is not part of this implementation.
- The generated `next-env.d.ts` build side effect was restored after verification.

## Technical review

### Verification

- init.sh: passed (build/UI checks skipped by default, matching report)
- lint: passed
- typecheck: passed
- test: passed (8 files, 37 tests)
- build: passed (`pnpm build` compiled successfully; 74 static pages generated)
- supabase: not applicable
- ui/playwright: not available in this sandbox; manual `pnpm ai:dev:start` + curl confirmed 200 on `/`, `/components`, `/components/button`, `/components/badge`, `/components/alert`, bootstrap script present in `<head>`, toggle renders with accessible name and `aria-pressed`, no dev-server errors

### Review

- Scope: passed
  - All theme state, bootstrap, toggler, header integration, i18n labels, and focused tests implemented as specified.
  - `next-themes`, Magic UI runtime, and any other theme library not added (`package.json`/`pnpm-lock.yaml` unchanged).
  - No theme context/provider introduced.
  - No per-demo theme providers; demos inherit the root `.dark` class and existing semantic tokens.
- Architecture: passed
  - `localStorage.theme` -> system fallback -> `.dark` class -> existing tokens; follows the human-approved architecture in the spec.
  - Magic UI used as code reference only (local `src/components/animated-theme-toggler.tsx`), no runtime dependency.
  - Root integration is minimal (`src/app/layout.tsx`, `src/app/globals.css`), preserves `@custom-variant dark`/`.dark` token system.
  - No new boundary or parallel pattern; decision recorded as "no".
- Code: passed
  - `src/lib/theme.ts` resolution/persistence/apply logic is small, testable, SSR-safe (browser APIs only inside functions).
  - Toggler: deterministic first render, post-hydration sync via `queueMicrotask`, `themeApplied` guard prevents reverse on failed/aborted transitions, reduced-motion and missing `startViewTransition` fallbacks verified by tests.
  - System-follow listener stops overriding once a stored preference exists; invalid stored values fall back to system.
  - Hydration-safe: `suppressHydrationWarning` on `<html>` + early inline bootstrap; hydration test asserts no React mismatch and correct post-hydration state.
  - `git diff --check` and targeted eslint/prettier clean; no dead code, logging, or TODOs.
- Out-of-scope changes: no
  - Pre-existing unrelated work (`registry.json` include line, `cobalt/`, `src/registry/themes/`) is preserved and documented in the report; it is not part of this implementation and does not affect this feature.
  - Harness state files (`.ai/progress/`, `.ai/run/`) are runner/agent bookkeeping, not product changes.
  - Spec 010 prerequisite (`DONE`) satisfied; branch is `migration-to-demo-site`.

### Result

- UI_REVIEW

### Requested changes

- None. Visual QA (circular reveal, system-default/system-follow, manual persistence, themed previews, no flash) remains for the UI reviewer.

## Visual review

### Reviewed surfaces

- Header (brand, Components nav, language selector, animated theme toggle) on desktop (1440px) and mobile (390px).
- `/` home page.
- `/components` catalog.
- `/components/button`, `/components/badge`, `/components/alert` detail pages with demo cards, Preview/Code views, copy and copy-prompt controls.
- Language dropdown menu in both modes.
- Reveal animation frames captured and analyzed pixel-by-pixel.

### Evidence

Visual QA was run with Playwright (Chromium) against `pnpm ai:dev:start` (`http://localhost:3000`). Screenshots and reveal frames were saved to `.ai/run/logs/` (`ui-review-desktop-*`, `ui-review-mobile-*`, `reveal-*`). The model cannot view images, so screenshots were verified programmatically through computed styles and per-pixel geometry rather than by eyeballing.

A second independent UI-review pass (2026-07-31, this session) re-ran the full suite: 30/30 primary probes and 4/4 supplemental probes passed, including the circular reveal against a real toggle click. In contrast to the earlier note, `document.getAnimations()` does report the pseudo-element animation in this Chromium build: `::view-transition-new(root)` was observed `running` (alongside `::view-transition-group(root)`) at t≈55ms, ≈105ms, and ≈157ms after the click, proving the WAAPI circular reveal executes; the clip-path reveal origin was additionally confirmed by the frame-pixel circle analysis below.

### Checks

- Desktop: passed — header, home, catalog, and all three detail pages render with correct semantic tokens in light and dark; backgrounds, foregrounds, borders, demo cards, header controls, and copy/prompt controls all derive from the token system. Fresh-pass confirmation: system light -> light body (`lab(100 ...)`), system dark -> `.dark` with dark body (`lab(2.75 ...)`); all 5 routes 200 with no page/console errors.
- Mobile: passed — at 390px the theme toggle (32×32) and language selector sit fully inside the viewport, remain clickable, and toggle works; no header horizontal overflow.
- Visual navigation: passed — single shared header shell; brand/nav/back links consistent across routes; no screen-specific copy of a shell or navigation. Keyboard Tab order: Fitodac UI -> Components -> Select language -> Switch to dark theme; toggle shows a visible `focus-visible` ring when reached by keyboard.
- Visible states: passed — light, dark, system-follow, persisted manual light/dark, invalid-value fallback, reduced-motion, and no-flash/hydration behavior all verified.
- View Transition circular reveal: passed — during the light→dark toggle the dark region grows monotonically and is geometrically a circle centered exactly on the toggle control (at t=180ms a circle of radius ≈344px around the button center (760,32) captures ~95% of dark pixels, score 0.895), completing over ~260–330ms; proves the reveal originates from the control and is not a cross-fade or instant flip. Fresh pass additionally confirmed `::view-transition-new(root)` running via `document.getAnimations()` at t≈55–157ms after a real toggle click.
- Hydration/console: passed — no console or page errors on any route in either mode; no hydration warnings; inline bootstrap script confirmed in `<head>` before body render.
- System behavior: passed — fresh visit with no stored preference follows system light/dark; system change updates the site while no preference is stored; after a manual toggle the stored preference is authoritative; invalid stored values fall back to system.
- Persistence: passed — manual light and dark each survive reload; combined `locale=es` + `theme=dark` persist independently (locale via `NEXT_LOCALE` cookie, theme via `localStorage`).
- Reduced motion: passed — toggle still switches theme with no reveal animation.
- Dropdown menu: passed — inherits popover/foreground tokens in both modes (dark mode content background `lab(2.75 ...)`, light text `lab(98.26 ...)`).

### Result

- REVIEW

### Requested changes

- None.

Limitation: no image-based eyeball review was possible in this environment (model does not accept image input); visual correctness was verified through computed-style and pixel-geometry analysis instead.
