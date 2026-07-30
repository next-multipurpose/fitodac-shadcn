# 009 — i18n foundation and English-default site copy

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Introduce a simple, maintainable English/Spanish internationalization layer for the demo site and make **English the default language for all site-owned user-facing copy**.

Use `next-intl` as the i18n library.

Do not introduce locale-prefixed routes. Existing URLs such as:

```text
/
/components
/components/button
```

must remain unchanged in both languages.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Specs 006–008 must be `DONE` before this spec is promoted to `READY`.

## Product decisions

Supported locales:

```text
en — English
es — Español
```

Default locale:

```text
en
```

English is the canonical/default copy.

Spanish is the secondary translation.

Locale must not be encoded in the URL in this phase.

The locale preference will be persisted in a browser cookie and exposed through the language selector implemented by spec 010.

## Scope

### Install and configure next-intl

Add `next-intl` as the single i18n dependency for the demo site.

Configure it for the current Next.js App Router application.

Create one central locale configuration defining:

- supported locales;
- default locale;
- locale type;
- locale cookie name.

Use a stable cookie name, preferably:

```text
NEXT_LOCALE
```

or the standard value already expected by the chosen `next-intl` configuration.

Do not introduce another translation library.

### Request locale resolution

Create the request-level i18n configuration required by `next-intl`.

Locale resolution order must be:

1. valid persisted locale cookie;
2. default locale `en`.

Do not auto-select Spanish based on browser language or IP.

A new visitor must receive English unless they have explicitly selected Spanish previously.

Invalid/unknown cookie values must fall back safely to English.

### Message catalogs

Create message catalogs for:

```text
messages/en.json
messages/es.json
```

or an equivalent project-local structure.

Use stable namespaces/keys rather than duplicating raw strings throughout components.

Suggested conceptual namespaces:

```text
Metadata
Header
Home
Catalog
ComponentDetail
Demos
Actions
Common
```

Equivalent organization is acceptable.

English messages are the canonical source.

Spanish must contain the same required message keys.

### Translate current site-owned copy

Migrate current visible site copy from hardcoded strings to translations.

At minimum cover:

#### Root layout/header

Current Spanish copy such as:

- main navigation accessibility label;
- `Componentes`;
- site metadata description.

#### Home page

Current Spanish copy such as:

- main heading;
- supporting paragraph;
- components CTA;
- `Entradas`;
- `Dependencias`.

#### Components catalog

Current Spanish copy such as:

- page metadata title;
- `Catálogo`;
- `Componentes`;
- available-entry summary;
- `archivos`;
- `paquetes`.

#### Component detail

Current Spanish copy such as:

- fallback metadata component title;
- `Volver al catálogo`;
- `Archivos`;
- `Dependencias`;
- `Dependencias del registry`;
- empty dependency messages.

#### Demo shell

Current Spanish fallback copy such as:

- `Ejemplos`;
- `Todavía no hay ejemplos disponibles para este componente.`

Also migrate site-owned action/status labels that remain hardcoded in shared demo UI when they are intended for humans, including labels such as:

- Preview;
- Code;
- Copy;
- Copied;
- Copy failed;
- Copy prompt;
- Prompt copied;
- section labels such as Example usage / Required component files / Dependencies when they are presentation UI.

### Canonical technical terms

Do **not** translate identifiers that represent the public component API or source code.

Examples that remain unchanged:

```text
button
badge
alert
default
destructive
outline
secondary
ghost
link
xs
sm
lg
registry:ui
class-variance-authority
```

Code blocks, file paths, package names, component names, prop names, variant values, and generated integration source remain technical source material.

The generated AI integration prompt may remain English in this phase because it is a technical agent instruction rather than site navigation copy.

Do not translate source-code examples.

### Server and client components

Use `next-intl` according to the existing server/client boundary.

Prefer server translation APIs for Server Components.

Client Components may use the `next-intl` client provider/hooks only where required.

Do not convert pages to Client Components merely for translation.

### HTML language

The root `<html lang>` must reflect the resolved locale:

```text
en
es
```

It must no longer be permanently hardcoded to `es`.

### Metadata

Translate site-owned metadata where practical through the same message catalog.

At minimum:

- root description;
- catalog page title;
- component-detail fallback title.

Component-specific registry names remain unchanged.

## Out of scope

- Locale prefixes such as `/en` or `/es`.
- Localized component slugs.
- Browser-language auto detection.
- IP geolocation.
- More than English and Spanish.
- Translation management SaaS.
- Machine translation.
- Translating source code or package names.
- Translating generated source integration bundles.
- Translating component public API identifiers.
- Adding the language selector; spec 010 handles the interactive control.
- Theme work; spec 011 handles theme behavior.

## Acceptance criteria

- `next-intl` is installed and configured once.
- Supported locales are centrally defined as `en` and `es`.
- English is the default locale.
- No locale-prefixed routes are introduced.
- Existing URLs remain valid.
- A request without a valid locale cookie renders English.
- An invalid locale cookie falls back to English.
- English and Spanish message catalogs exist.
- Both catalogs expose the same required translation key structure.
- Current site-owned Spanish hardcoded UI copy is migrated to translation keys.
- The default rendered site no longer presents Spanish navigation/prose.
- `<html lang>` reflects the active locale.
- Server Components remain Server Components where possible.
- Technical identifiers/source code remain untranslated.
- Existing registry/demo behavior remains intact.
- No component public API changes are introduced.
- Automated tests cover locale resolution and message-catalog parity.
- `pnpm test`, `./init.sh`, lint, typecheck, and build pass.

## Architecture

Decision required: no.

Human-approved decisions:

- English is the default site language.
- Spanish is supported as an optional translation.
- The site requires a simple translation system.
- URLs remain locale-neutral.

Approved implementation:

```text
next-intl
   ↓
request locale resolver
   ↓
cookie or default=en
   ↓
shared message catalogs
   ↓
Server + Client Components
```

Do not create a handwritten translation context in parallel with `next-intl`.

### Rendering note

Because locale is request-specific and persisted by cookie, pages that consume request locale may no longer be fully static in the same way as the current English-only build.

Do not work around this by introducing locale routes unless explicitly approved.

Report any rendering-mode change clearly in the implementation report.

## Relevant files

Existing:

- `package.json`
- `pnpm-lock.yaml`
- current Next configuration
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/components/page.tsx`
- `src/app/components/[slug]/page.tsx`
- `src/components/component-detail.tsx`
- `src/demos/component-demo.tsx`
- `src/demos/demo-card.tsx`
- integration/prompt helpers where presentation labels are defined

Expected additions may include:

- `messages/en.json`
- `messages/es.json`
- `src/i18n/config.ts`
- `src/i18n/request.ts`

Use the structure recommended by the installed `next-intl` version and existing project conventions.

## Tests

Using the test foundation created by spec 006, add focused tests for:

- valid `en`;
- valid `es`;
- no cookie -> `en`;
- invalid cookie -> `en`;
- English/Spanish catalog key parity;
- English canonical labels exist;
- representative Spanish translations exist.

Do not snapshot entire catalogs.

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

### English default

Fresh browser/no locale cookie:

- `/`
- `/components`
- `/components/button`

Verify visible site UI is English.

Verify:

```html
<html lang="en">
```

### Spanish persisted request

Set the supported Spanish locale cookie manually for this spec's verification.

Reload the same three routes.

Verify visible site UI is Spanish and:

```html
<html lang="es">
```

### Shared regression

Verify:

- component previews still render;
- Preview/Code behavior still works;
- Copy prompt still works;
- code blocks and technical identifiers remain unchanged;
- no browser console errors;
- desktop/mobile layout remains usable.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must compare representative English and Spanish surfaces on desktop and mobile.
