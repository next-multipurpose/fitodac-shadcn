# 010 — Header language selector with browser persistence

Status: DRAFT
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

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must verify both locales and header behavior on desktop and mobile.
