# 010 — Header language selector with browser persistence

Status: DONE
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add a language selector to the top-right header so users can switch between English and Spanish.

The selection must be remembered by the browser and applied across the whole demo site without changing route URLs.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 009 must be `DONE`.

## Product behavior

The header must contain a compact language dropdown aligned to the right-side controls.

Supported choices:

```text
English
Español
```

The control should communicate the current locale, for example:

```text
EN ▾
ES ▾
```

Exact visual copy may follow the established site style.

Behavior:

1. fresh browser -> English;
2. select Español -> visible site copy switches to Spanish;
3. navigate to another page -> Spanish remains active;
4. reload -> Spanish remains active;
5. select English -> English becomes active and remains active;
6. URLs do not gain locale segments.

## Scope

### Header composition

Refactor the header only as much as needed so it can contain:

- Fitodac UI brand/link;
- Components navigation;
- language dropdown;
- reserved neighboring area for the theme toggle from spec 011.

Do not redesign the full header.

On mobile, controls must wrap/collapse cleanly without horizontal overflow.

### Dropdown

Use an existing local shadcn/registry dropdown primitive if a suitable one already exists.

Inspect `src/registry/` before creating UI.

Prefer reusing the project's existing:

```text
DropdownMenu
Button
```

or equivalent primitives.

Do not add a new dropdown/menu library when an existing registry primitive can satisfy the requirement.

### Locale persistence

Persist the locale in the same cookie consumed by spec 009.

Do not create a second locale source of truth in localStorage.

The selector may set the cookie through the smallest appropriate mechanism, such as:

- a server action; or
- a narrowly scoped client cookie update followed by a router refresh.

Use the approach that best preserves the existing App Router/server-component architecture.

After locale selection:

- current URL stays unchanged;
- current page rerenders in the selected language;
- server-rendered content receives the same locale;
- `<html lang>` updates.

### Accessibility

The selector must:

- be keyboard accessible;
- expose an accessible language-selection label;
- indicate the currently selected locale;
- support menu navigation according to the existing dropdown primitive;
- not rely only on flag icons.

Flags are optional decoration, not the language label.

### Translation

All selector labels/accessibility copy must use the translation system established in spec 009 where appropriate.

Language names may be self-labeled:

```text
English
Español
```

regardless of current locale.

## Out of scope

- Locale routing.
- Browser-language auto detection.
- Geolocation.
- Additional languages.
- Theme toggle implementation.
- Account/user-profile preferences.
- Server-side user accounts.
- localStorage as a second locale preference.
- Changing component API identifiers or source code.

## Acceptance criteria

- A language dropdown is visible in the header.
- The current language is clearly identifiable.
- English and Español are available.
- English is selected for a fresh browser without locale cookie.
- Selecting Español updates current visible site copy without changing URL.
- `<html lang>` becomes `es`.
- Selecting English updates copy and `<html lang>` to `en`.
- Selection survives navigation.
- Selection survives full reload.
- Only the locale cookie from the i18n architecture is used as persistence/source of truth.
- Invalid/stale cookie values safely fall back to English.
- Keyboard operation works.
- Accessible name/state are present.
- No new dropdown library is introduced when a suitable local primitive exists.
- Header remains usable on desktop and mobile.
- Existing navigation, demo controls, Code, and Copy prompt still work.
- Automated tests cover switching/persistence behavior.

## Architecture

Decision required: no.

Approved locale flow:

```text
Header language selector
        ↓
set supported locale cookie
        ↓
refresh current App Router tree
        ↓
next-intl request config
        ↓
same URL, new language
```

Cookie is the locale source of truth.

Do not introduce:

```text
locale cookie + localStorage locale + React global locale store
```

### Header boundary

Interactive language selection may be a focused Client Component.

The complete root layout should not become client-rendered solely for the dropdown.

## Relevant files

From spec 009:

- locale config
- request config
- message catalogs

Existing:

- `src/app/layout.tsx`
- header/navigation implementation
- relevant registry dropdown/button primitives
- test configuration from spec 006

Expected additions may include:

- `src/components/language-switcher.tsx`
- focused locale persistence helper/server action if required

## Tests

Add focused interaction tests for:

- current locale renders in the control;
- English -> Spanish selection;
- Spanish -> English selection;
- correct cookie value is written;
- unsupported locale cannot become selected;
- selection triggers the required refresh/update path;
- keyboard selection.

Mock browser/router boundaries only where required.

Do not mock translation state so completely that the switching contract is untested.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Browser/UI verification:

### Desktop

Fresh browser:

- header shows English;
- choose Español;
- current page translates;
- URL remains identical;
- navigate Home -> Components -> Button;
- Spanish persists;
- reload;
- Spanish persists;
- choose English;
- English persists.

### Mobile

Repeat selection and navigation at narrow width.

Verify:

- no horizontal overflow;
- dropdown remains reachable;
- header navigation remains usable.

### Accessibility

Keyboard-only:

- focus selector;
- open dropdown;
- choose other language;
- verify focus/state remains sensible.

No browser console/hydration errors.

## Implementation report

### Changes

- Added a focused client `LanguageSwitcher` that composes the existing registry `Button` and Radix `DropdownMenu` primitives.
- Persisted supported selections only in the existing `NEXT_LOCALE` cookie and refreshed the current App Router tree without changing the URL.
- Composed the selector into the server-rendered root header, kept the resolved locale authoritative for `<html lang>`, and made the header wrap safely at narrow widths.
- Added translated selector labels and interaction tests for current state, both switch directions, cookie writes, refresh behavior, supported choices, and keyboard selection.

### Tests / verification

- Branch and prerequisite: passed (`migration-to-demo-site`; spec 009 is `DONE`).
- Graphify CLI discovery: passed.
- `pnpm test`: passed (6 files, 24 tests).
- `pnpm lint`: passed.
- Focused ESLint for the new component/test: passed.
- `pnpm typecheck`: passed before unrelated concurrent registry work introduced a missing `src/registry/components/scroll-area` import; the latest rerun fails only at `src/registry/components/autocomplete.tsx:7`.
- `pnpm build`: blocked by the sandbox denying Turbopack a process port; webpack compilation passed and then stopped on the same unrelated autocomplete import.
- `./init.sh`: harness checks and lint passed, then stopped on the same unrelated autocomplete import during typecheck.
- Browser plugin: unavailable for evidence after two controlled-tab timeouts; standalone Playwright is not installed, so desktop/mobile visual verification remains pending for the UI reviewer.
- `git diff --check` for spec 010 files: passed.

### Modified files

- `messages/en.json`
- `messages/es.json`
- `src/app/layout.tsx`
- `src/components/language-switcher.tsx`
- `tests/language-switcher.test.tsx`
- `.ai/specs/010-language-selector-persistence.md`

### Notes

- Existing unrelated harness, registry, autocomplete/demo, and spec 009 working-tree changes were preserved.
- The shadcn CLI confirmed the local Radix project context; remote component docs were unavailable because `ui.shadcn.com` DNS resolution failed, so the installed primitive source was used as the exact API reference.

## Technical review

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: passed (6 files, 24 tests)
- build: passed
- supabase: not applicable
- ui/playwright: not available (visual QA pending for UI reviewer)

### Review

- Scope: passed
- Architecture: passed
- Code: passed
- Out-of-scope changes: no (pre-existing concurrent autocomplete/demo/registry work was preserved and is not part of spec 010)

### Notes

- `LanguageSwitcher` is a focused client component composing the existing registry `Button` and `DropdownMenu` primitives; no new dependency was added.
- Locale persistence uses only the existing `NEXT_LOCALE` cookie consumed by spec 009 (`src/i18n/request.ts`); no localStorage second source of truth.
- Cookie write is guarded by `isLocale`; invalid cookie values fall back to English through `resolveLocale`.
- The root layout stays a server component; `resolveLocale(await getLocale())` keeps `<html lang>` correct.
- The report's earlier typecheck/build failures were caused by unrelated concurrent autocomplete work; that work is now committed and the current tree passes all checks.

### Result

- UI_REVIEW

### Requested changes

- None. Visual/behavioral verification of both locales and header wrapping on desktop and mobile is pending for the UI reviewer.

## Visual review

### Reviewed surfaces

- Root header (`src/app/layout.tsx`): Fitodac UI brand, Components nav, `LanguageSwitcher` trigger (`EN`/`ES`) right-aligned.
- Routes: `/`, `/components`, `/components/button` (desktop and mobile).
- Language dropdown: open state, radio selection, checked state, both locales.
- Related demo controls on the detail route: Preview/Code toggle, Copy, and Copy prompt.
- `<html lang>` attribute and visible copy in both locales.

### Checks

- Desktop: passed
- Mobile: passed
- Visual navigation: passed
- Visible states: passed

### Method and evidence

- Ran the app with `pnpm ai:dev:start` and verified the rendered pages with the local dev server.
- No project Playwright is configured; installed `playwright-core` in the temp harness dir and drove the cached headless Chromium. No application code was modified.
- Verified by scripted browser checks (functional + geometry) and by fetching server-rendered HTML with `curl` for the cookie paths:
  - Fresh browser -> `lang="en"`, `EN` trigger, English radio checked.
  - Choose Español -> `lang="es"`, visible site copy translates, URL unchanged (`/` and `/components` keep the same path, no locale segment).
  - Spanish persists across `/components` and `/components/button` and across full reload.
  - Choose English -> back to `lang="en"`, `EN` trigger.
  - Invalid cookie `NEXT_LOCALE=fr` -> falls back to English (`lang="en"`).
  - Keyboard: Enter opens the dropdown, ArrowDown moves into the menu, Escape closes it; trigger has an accessible label ("Select language") and the selected locale is reflected via the radio checked state.
  - Layout geometry at 1280, 390, and 320 px: brand and nav left of the trigger, trigger right-aligned inside the centered content area, no horizontal overflow (`scrollWidth - innerWidth = 0`) in English and Spanish, dropdown menu fully in viewport and end-aligned to the trigger at all widths, header items share one row without overlap at 320 px.
  - Demo controls still function: Preview/Code toggle opens the code panel; Copy and Copy prompt show their success feedback (clipboard stubbed because headless Chromium blocks `navigator.clipboard`).
  - No console/page errors. The only 404 is the default `/favicon.ico` request (no favicon declared), which is pre-existing and unrelated to this spec.
  - Header is defined once in the root layout; no screen-specific shell/nav copies were introduced.

### Limitations

- This reviewer model cannot inspect image screenshots, so pixel-level aesthetic judgment was replaced with programmatic geometry, overflow, alignment, visibility, and interaction checks; no visual anomalies were detected.
- The only real browser-accessible channel was headless Chromium via temp `playwright-core`; there is no project Playwright suite.

### Result

- REVIEW

### Requested changes

- None.
