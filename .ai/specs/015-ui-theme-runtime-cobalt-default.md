# 015 — UI theme runtime and Cobalt source-of-truth integration

Status: DONE
Role: implementer
UI Review: skip
Tooling policy: stop-with-blocker

## Goal

Introduce an independent runtime for the demo site's visual UI theme with exactly two supported values:

```ts
type UITheme = "cobalt" | "default"
```

Cobalt must be the default UI theme.

The runtime must apply Cobalt directly from:

```text
src/registry/themes/cobalt/registry.json
```

and must restore Default by removing Cobalt overrides so the neutral fallback values in:

```text
src/app/globals.css
```

take effect automatically.

Do not mix this responsibility with the existing light/dark color-mode runtime in:

```text
src/lib/theme.ts
```

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 014 must be `DONE`.

## Product decisions

Supported UI themes:

```text
cobalt
default
```

Default:

```ts
DEFAULT_UI_THEME = "cobalt"
```

Persistence key:

```ts
UI_THEME_STORAGE_KEY = "ui-theme"
```

Valid stored values:

```text
cobalt
default
```

Color mode remains a separate dimension:

```text
light
dark
```

Valid combinations:

```text
Cobalt + Light
Cobalt + Dark
Default + Light
Default + Dark
```

## Scope

### Create the UI theme runtime

Create a focused module:

```text
src/lib/ui-theme.ts
```

It owns UI-theme behavior only.

It must define/export the equivalent of:

```ts
export type UITheme = "cobalt" | "default"

export const DEFAULT_UI_THEME: UITheme = "cobalt"
export const UI_THEME_STORAGE_KEY = "ui-theme"
```

It must provide focused operations for:

- validating an unknown/stored UI theme value;
- resolving the initial UI theme;
- reading the persisted UI theme safely;
- persisting a valid selection safely;
- applying Cobalt for an effective color mode;
- removing Cobalt overrides to restore Default;
- reapplying the currently selected UI theme when color mode changes.

Exact function names may follow repository conventions.

Do not create a generic theme plugin API.

Do not create a dynamic registry of themes.

### Cobalt canonical source

Import/read the canonical theme definition from:

```text
src/registry/themes/cobalt/registry.json
```

The runtime must derive Cobalt variables from its existing:

```text
items[...].cssVars.theme
items[...].cssVars.light
items[...].cssVars.dark
```

The implementation must identify the intended Cobalt `registry:theme` item explicitly and fail clearly if the required shape is unavailable.

Do not create any manually maintained duplicate such as:

```text
cobalt.css
theme-cobalt.css
constants/cobalt.ts
cobalt-tokens.ts
```

Do not manually retype Cobalt token values inside `ui-theme.ts`.

A serialized/generated representation used by an early bootstrap is acceptable only when it is derived programmatically from the imported canonical registry rather than handwritten.

### Token application

When UI theme is `cobalt`, apply:

```text
cssVars.theme
+
cssVars.light | cssVars.dark
```

to:

```text
document.documentElement
```

as CSS custom properties.

Map registry keys mechanically:

```text
primary -> --primary
surface-muted -> --surface-muted
font-sans -> --font-sans
shadow-sm -> --shadow-sm
```

Do not create a second manual mapping table for every token.

Common theme values from:

```text
cssVars.theme
```

must apply in both color modes.

Variant values must come from:

```text
cssVars.light
```

for effective Light, and:

```text
cssVars.dark
```

for effective Dark.

### Remove Cobalt to restore Default

Selecting `default` must not apply a JavaScript copy of Default values.

Instead:

1. compute/know the complete set of CSS custom properties controlled by Cobalt;
2. remove those inline/root overrides;
3. allow `globals.css` to resolve the neutral Default values.

The removal set must account for the union of:

```text
cssVars.theme
cssVars.light
cssVars.dark
```

so no Cobalt value remains after switching to Default.

Do not remove unrelated inline CSS custom properties owned by another feature.

### globals.css remains Default

`src/app/globals.css` remains:

- Tailwind/shadcn infrastructure;
- the semantic token/utilities contract;
- neutral Default Light values;
- neutral Default Dark values.

Do not create:

```text
src/registry/themes/default/registry.json
```

Do not move the neutral fallback values into JavaScript.

Before implementing Cobalt runtime application, verify that the existing global token contract supports the semantic variables required by the current Cobalt registry.

If a token used by existing components/Cobalt is missing from the already-approved global contract, make only the smallest contract/fallback completion necessary in `globals.css`.

Do not use Cobalt values as Default fallback values.

Do not redesign the theme contract.

### Storage independence

The existing color-mode storage remains:

```text
theme
```

The new UI-theme storage is:

```text
ui-theme
```

`ui-theme.ts` must not read/write the color-mode preference key except through an explicit color-mode argument supplied by the integration layer.

Changing UI theme must not:

- add/remove `.dark`;
- alter `document.documentElement.style.colorScheme`;
- write `localStorage.theme`.

Changing UI theme only changes visual-token overrides and its own persisted preference.

### Safe storage behavior

Storage failures must not crash rendering.

Resolution:

```text
valid stored value -> stored value
missing value      -> cobalt
invalid value      -> cobalt
storage unavailable -> cobalt
```

Persistence failure may leave the current in-memory/document theme applied, but must not crash the UI.

## Out of scope

- Header selector UI; spec 017 handles it.
- Early pre-paint bootstrap; spec 016 handles it.
- More than Cobalt and Default.
- Theme discovery.
- Theme registry generation.
- Theme plugins.
- `/themes`.
- Theme editor.
- Remote theme loading.
- Default registry JSON.
- Component-specific `if (theme === "cobalt")` logic.
- Replacing the existing light/dark runtime.
- New third-party dependency.

## Acceptance criteria

- `src/lib/ui-theme.ts` exists.
- Only `cobalt | default` are supported.
- `DEFAULT_UI_THEME` is `cobalt`.
- `UI_THEME_STORAGE_KEY` is independent from the color-mode key.
- Missing/invalid stored values resolve to Cobalt.
- Cobalt token values come from the existing Cobalt registry JSON.
- No manually duplicated Cobalt token file is introduced.
- Cobalt common tokens and Light/Dark variants are applied as root CSS custom properties.
- Default removes all Cobalt-owned overrides.
- Default values come exclusively from `globals.css`.
- Switching UI theme does not change `.dark`.
- Switching UI theme does not change `localStorage.theme`.
- Cobalt application does not require changes inside registry primitives/components.
- Storage failures are handled safely.
- No generic future-theme infrastructure is introduced.
- Tests cover runtime resolution/application/removal.

## Architecture

Decision required: no.

Human-approved architecture:

```text
globals.css
    ├── Tailwind/shadcn infrastructure
    ├── semantic token contract
    └── Default values
              ↑
              │ fallback when no override
              │
document.documentElement
              ↑
              │ inline custom properties
              │
src/lib/ui-theme.ts
              ↑
              │
Cobalt registry.json
    ├── cssVars.theme
    ├── cssVars.light
    └── cssVars.dark
```

The component layer remains theme-agnostic:

```text
Button
  ↓
bg-primary / text-primary-foreground / rounded-md
  ↓
semantic CSS variables
  ↓
active UI theme
```

## Relevant files

Existing:

- `src/app/globals.css`
- `src/lib/theme.ts`
- `src/registry/themes/cobalt/registry.json`
- `package.json`
- current Vitest configuration/tests

Expected:

- `src/lib/ui-theme.ts`
- focused unit tests for UI-theme runtime

## Tests

Using the existing Vitest suite, test at minimum:

### Validation/resolution

- `"cobalt"` is valid;
- `"default"` is valid;
- unknown values are invalid;
- no stored value resolves to Cobalt;
- invalid stored value resolves to Cobalt;
- valid stored Default resolves to Default.

### Cobalt registry contract

- canonical Cobalt theme item exists;
- required `cssVars.theme`, `cssVars.light`, `cssVars.dark` objects resolve;
- runtime uses those actual values rather than a duplicated fixture.

Do not snapshot the full registry as the only assertion.

### Application

For Cobalt Light:

- common theme variables are applied;
- representative Light variables are applied.

For Cobalt Dark:

- common theme variables are applied;
- representative Dark variables are applied.

Test representative variables from different categories such as:

```text
--font-sans
--radius-md
--shadow-sm
--primary
--surface
--border
```

### Default removal

After Cobalt has been applied:

- selecting Default removes every Cobalt-owned property;
- unrelated custom properties remain untouched;
- `.dark` state remains untouched;
- `colorScheme` remains untouched.

### Persistence

- UI-theme preference writes only `ui-theme`;
- no write occurs to `theme`.

## Verification

Run:

```bash
pnpm test
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

Inspect the production diff and verify there is no second manually maintained Cobalt token representation.

## Implementation report

### Changes

- Added an independent `cobalt | default` UI-theme runtime with safe resolution and persistence under `ui-theme`.
- Derived the Cobalt token definition and complete owned-property removal set directly from the canonical Cobalt `registry:theme` item.
- Added Cobalt Light/Dark application, Default override removal, and current-theme reapplication without changing color-mode state or storage.
- Confirmed the existing `globals.css` semantic/default contract already covers the canonical Cobalt variables; no fallback changes were required.

### Tests / verification

- `pnpm test`: passed (13 files, 88 tests).
- `./init.sh`: passed, including demo registry integrity, lint, typecheck, and tests.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `pnpm exec eslint src/lib/ui-theme.ts tests/ui-theme.test.ts`: passed.
- `git diff --check`: passed.
- `pnpm build`: blocked by the execution sandbox when Turbopack attempted to bind a local port (`Operation not permitted`).
- `pnpm exec next build --webpack`: passed, including production compilation, TypeScript, and generation of 74 static pages.

### Modified files

- `src/lib/ui-theme.ts`
- `tests/ui-theme.test.ts`
- `.ai/specs/015-ui-theme-runtime-cobalt-default.md`

### Notes

- No Cobalt token values or Default token values were duplicated in TypeScript.
- The prescribed Turbopack build failure is environment-specific; the webpack production build provides successful build evidence for the same source tree.

## Technical review

### Verification

- init.sh: passed (demos:registry:check, lint, typecheck, test)
- lint: passed (`pnpm lint` and direct `eslint` on the new files)
- typecheck: passed
- test: passed (13 files, 88 tests)
- build: passed (`pnpm build`, exit 0, 74 static pages) — confirmed again during review

### Review

- Scope: passed. Only `src/lib/ui-theme.ts` and `tests/ui-theme.test.ts` were added; no other app files changed. Harness state files (progress/current.json/spec status) are expected runner mutations.
- Architecture: passed. Follows the recorded human-approved flow (Cobalt registry → `ui-theme.ts` → `document.documentElement` inline vars → `globals.css` Default fallback). No new boundary, no parallel light/dark runtime, no generic theme plugin/dynamic registry. `Theme` type is reused from `src/lib/theme.ts`.
- Code: passed. `UITheme = "cobalt" | "default"`, `DEFAULT_UI_THEME = "cobalt"`, `UI_THEME_STORAGE_KEY = "ui-theme"` independent of the color-mode `theme` key. Canonical Cobalt `registry:theme` item is located explicitly and fails with a clear error when the `cssVars.theme/light/dark` shape is unavailable. Token keys are mapped mechanically (`--${key}`) with no second mapping table. The Default-removal set is the union of `cssVars.theme/light/dark`, so no Cobalt value survives and unrelated inline properties are untouched. `applyUITheme` never touches `.dark`, `colorScheme`, or `localStorage.theme`. Storage reads/writes are guarded by try/catch and fall back to Cobalt. No manually duplicated Cobalt token representation exists (only the registry JSON is imported).
- Out-of-scope changes: no.

### Result

- REVIEW

### Requested changes

- None. Note for the human: `pnpm build` also passes in this review run; the implementation-report note about the sandbox build blocker is stale but harmless.

## Visual review

Not required unless this spec unexpectedly introduces visible controls. Final visual verification belongs to specs 016–017.
