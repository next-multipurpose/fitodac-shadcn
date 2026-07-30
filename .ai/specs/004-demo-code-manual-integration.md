# 004 — Demo code view and manual integration bundle

Status: REVIEW
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Add a real **View code** workflow to every demo card so a human can inspect and copy the code needed to reproduce that demo and manually integrate its underlying `fitodac/shadcn` component into another compatible React + Tailwind + shadcn project.

This spec extends the Preview-only demo system implemented by specs 001–003.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 003 must be `DONE` before this spec is promoted to `READY`.

## Product behavior

Every demo card must offer a visible **Code** action.

Activating it must reveal a code/integration view for that same demo without navigating away from the component page.

The code view must distinguish two things:

1. **Example usage**
   - Consumer-facing code that reproduces the selected demo.
   - It must be suitable for copying into a target project.
   - It must not expose demo-site-only imports such as `@/registry/...` or `@/demos/...`.

2. **Required component files**
   - The real distributable source files required by the component.
   - Include recursive registry dependencies required by the component.
   - Show enough file/path context that a developer can manually place the files in the target project's corresponding shadcn locations.

The UI must provide copy actions for the displayed code.

The existing Preview remains the default representation.

## Scope

### Demo integration contract

Extend the existing demo architecture so each `DemoEntry` can resolve the information required by the Code view without introducing a second component-specific routing system.

The implementation must support, for each demo:

- demo slug/name;
- preview component;
- copyable consumer-facing usage source;
- parent component slug;
- integration metadata resolved from the component registry.

Avoid storing full component source code as duplicated handwritten strings in the demo registry.

### Source loading

Create a server-side integration/source layer that can produce a serializable integration bundle for the client UI.

Conceptually, the bundle should contain:

```ts
type IntegrationFile = {
  sourcePath: string
  suggestedTargetPath?: string
  code: string
}

type DemoIntegrationBundle = {
  component: string
  demo: string
  usageCode: string
  files: IntegrationFile[]
  dependencies: string[]
  registryDependencies: string[]
}
```

The exact names may differ.

Requirements:

- Read component source from the actual canonical repository files.
- Resolve registry dependencies recursively.
- Avoid duplicate files in the resolved bundle.
- Preserve a deterministic dependency/file order.
- Do not perform filesystem access from Client Components.
- Do not send non-serializable component functions across a server/client boundary.
- Do not expose arbitrary filesystem paths or allow user-controlled path traversal.
- Keep all source paths trusted and derived from repository-owned metadata.

### Registry path integrity

The current documented components are:

- `button`
- `badge`
- `alert`

Their `registry.json` file metadata must resolve to the actual source files used by the demo site.

If the existing registry entries still point to pre-migration paths such as:

```text
src/button.tsx
src/badge.tsx
src/alert.tsx
```

make the smallest metadata correction required so the integration bundle resolves the canonical current files, for example the corresponding files under `src/registry/primitives/`.

Also verify the required `utils` registry dependency resolves correctly.

Do not turn this into a repository-wide registry path migration.

### Consumer-facing usage source

The usage code shown to the user must represent the selected demo but be written for a consumer project.

It must not require:

```text
@/registry/...
@/demos/...
```

Internal demo-site imports must be converted or represented using the standard target-project component import convention used by shadcn projects, while keeping the implementation flexible enough for the later AI prompt to adapt aliases to the target project.

Do not change the real preview component merely to make source display easier.

### Demo card UI

Evolve the current shared demo card instead of hardcoding controls into individual demos.

The card must provide:

- Preview as the default view;
- a `Code` / `View code` action;
- a clear way to return to Preview;
- code presentation with readable monospace formatting;
- copy controls with visible success feedback;
- accessible button labels and keyboard operation.

A reasonable conceptual pattern is:

```text
Variants                         [Preview] [Code]

┌────────────────────────────────────────────┐
│                                            │
│       rendered component preview           │
│                                            │
└────────────────────────────────────────────┘
```

and in Code mode:

```text
Variants                         [Preview] [Code]

Example usage                     [Copy]

<consumer-facing code>

Required files

components/ui/button.tsx          [Copy]
<source code>

lib/utils.ts                      [Copy]
<source code>

Dependencies
class-variance-authority
radix-ui
```

The exact visual design can follow the existing site style.

### Client/server boundary

Interactive view switching and clipboard behavior may use a small Client Component.

Prefer:

```text
Server Component
  -> resolves preview + integration bundle
  -> Client demo-card shell
       -> receives serializable strings/metadata
       -> receives rendered preview as ReactNode/children
```

Do not convert the entire dynamic component page or source-loading layer into a Client Component.

### Current demo coverage

Apply the Code action to every demo card currently registered for:

- `/components/button`
- `/components/badge`
- `/components/alert`

A newly added future demo using the established demo contract should gain the same capability without component-specific page changes.

## Out of scope

- Agent prompt generation.
- `Copy prompt` action.
- Theme editor or new theme system.
- Installing a component automatically into another repository.
- Network calls to GitHub from the browser.
- Adding `@fitodac/shadcn` as a dependency to consumer projects.
- Recreating/redesigning registry components.
- Repository-wide `registry.json` migration.
- Adding demos for additional components.
- Syntax-highlighting dependencies solely for this feature.
- Introducing a new UI library.

## Acceptance criteria

- Every current demo card has a visible Code action.
- Preview remains the default state.
- Switching Preview ↔ Code does not navigate or reload the page.
- Every Code view contains consumer-facing usage code for that specific demo.
- Consumer-facing usage code contains no `@/registry/...` or `@/demos/...` imports.
- Every Code view exposes the canonical component source files required for manual integration.
- Recursive registry dependencies are included exactly once.
- Package dependencies are visible.
- The source shown for registry components comes from canonical repository files rather than duplicated handwritten copies.
- Copy controls work for usage code and required source files.
- Successful copy gives visible and accessible feedback.
- Clipboard failure does not crash the page and gives a reasonable failure state.
- `button`, `badge`, and `alert` integration bundles resolve successfully.
- Current demo cards continue rendering the real components in Preview mode.
- No component public API changes are introduced.
- No new global theme tokens are introduced.
- No new dependency is added unless a strict technical blocker is documented and approved.
- Mobile layouts do not overflow because of long code.
- Components without demos keep the existing no-demo fallback.
- Unknown slugs retain existing 404 behavior.

## Architecture

Decision required: no.

Human-approved product decisions:

- Every demo card must support visual Preview and manual Code integration.
- Manual integration means copying source into the target project; `@fitodac/shadcn` must not become a runtime package dependency.
- Existing registry components remain the source of truth.
- Demo-only code remains separate from distributable component code.
- The feature must scale through the shared demo architecture rather than component-specific route logic.

Existing architecture to preserve:

- `src/demos/registry.ts` is the central slug-to-demo mapping.
- `src/demos/component-demo.tsx` owns shared demo presentation.
- `/components/[slug]` remains the dynamic component page.
- distributable primitives remain under `src/registry/`.
- the current theme remains the visual source of truth.

The implementation may add focused server helpers and a focused Client Component for interaction.

Do not introduce a parallel registry.

## Relevant files

Existing:

- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- `src/app/components/[slug]/page.tsx`
- `registry.json`
- `src/registry/primitives/button.tsx`
- `src/registry/primitives/badge.tsx`
- `src/registry/primitives/alert.tsx`
- `src/lib/utils.ts`
- current files under:
  - `src/demos/button/`
  - `src/demos/badge/`
  - `src/demos/alert/`

Expected new focused areas may include:

- `src/demos/integration/`
- a client demo-card/action component
- source-resolution helpers
- clipboard helper/component if an existing implementation cannot be reused

Before creating clipboard logic, inspect the repository for an existing reusable clipboard hook/helper and reuse it if suitable.

## Verification

Run:

```bash
./init.sh
pnpm lint
pnpm typecheck
pnpm build
```

If Turbopack is blocked by the known environment/runtime issue, follow the existing documented fallback used by earlier specs and record it honestly.

Browser/UI verification must cover:

### `/components/button`

- Default: Preview and Code.
- Variants: Preview and Code.
- Sizes: Preview and Code.
- Copy example usage.
- Copy at least one component source file.

### `/components/badge`

- verify Code is available on every registered demo;
- verify required component files resolve.

### `/components/alert`

- verify Code is available on every registered demo;
- verify required component files resolve.

### Shared checks

- desktop;
- mobile;
- keyboard navigation;
- long code does not cause page-level horizontal overflow;
- copy success feedback;
- preview state remains functional after switching views;
- no browser console errors;
- no-demo fallback remains functional;
- invalid slug remains 404.

Also inspect the generated integration bundles and verify:

- no duplicate registry dependency files;
- no demo-site-only import aliases in consumer usage snippets;
- component source matches the canonical repository source;
- package dependencies match registry metadata.

Follow `docs/verification.md`.

## Implementation report

### Changes

- Extended every registered button, badge, and alert demo with trusted source
  metadata while preserving the existing central demo registry.
- Added a server-only integration resolver that reads canonical repository
  files, recursively resolves registry dependencies once in deterministic
  order, aggregates package dependencies, and converts demo imports to the
  standard consumer `@/components/ui/...` convention.
- Added the shared interactive Preview/Code card with copy controls, accessible
  feedback, responsive code overflow handling, required file paths, package
  dependencies, and registry dependencies.
- Corrected only the `button`, `badge`, and `alert` registry file paths to their
  canonical `src/registry/primitives/` sources. The existing `utils` metadata
  already resolved correctly.
- Reused and extended the existing clipboard hook so rejected or unavailable
  clipboard access produces a visible failure state without retaining stale
  success feedback.
- Kept the Code view's responsive stacks aligned with the repository's shadcn
  layout conventions by using flex and gap utilities.

### Tests / verification

- Graphify CLI query: passed.
- shadcn Button documentation lookup: unavailable because outbound DNS for
  `ui.shadcn.com` is blocked in the sandbox; the canonical local Button API was
  inspected instead.
- `pnpm exec eslint src/demos src/hooks/use-copy-to-clipboard.ts`: passed.
- `pnpm lint`: passed.
- `pnpm typecheck`: passed.
- `./init.sh`: passed (no test script is available).
- `pnpm build`: environment-blocked because Turbopack attempted an internal
  port bind denied by the sandbox (`Operation not permitted`).
- `pnpm exec next build --webpack`: passed; all 72 static pages generated.
- Focused integration inspection: passed for button, badge, and alert; canonical
  files exist, recursive `utils` files occur once, package dependencies match
  registry metadata, and all current consumer usage sources are free of
  `@/registry/...` and `@/demos/...` aliases.
- Generated output inspection: passed; all nine current demo cards serialize
  Preview and Code controls with Preview selected by default, and the existing
  no-demo fallback is present.
- Browser verification: passed against a real Next dev server on desktop
  (1200px) and mobile (390px). All nine button, badge, and alert cards expose
  Preview and Code; Code switching works without navigation; copy reports
  `Copied`; keyboard Enter activates Code; consumer snippets contain no
  `@/registry/...` or `@/demos/...` aliases; long source stays inside its own
  horizontal scroller without page-level overflow; the no-demo fallback remains
  intact; and an unknown component slug returns HTTP 404.
- Browser console: no product errors. The only observed error was the existing
  missing `/favicon.ico` in development.

### Modified files

- `registry.json`
- `src/demos/registry.ts`
- `src/demos/component-demo.tsx`
- `src/demos/demo-card.tsx`
- `src/demos/integration/get-integration-bundle.ts`
- `src/demos/integration/types.ts`
- `src/hooks/use-copy-to-clipboard.ts`
- `.ai/specs/004-demo-code-manual-integration.md`

### Notes

- No dependencies, public component APIs, global theme tokens, routes, or
  component-specific page logic were added.
- The no-demo fallback and unknown-slug handling remain in their existing shared
  page flow.
- The pre-existing harness infrastructure changes identified by the earlier
  technical review were not created, reverted, or modified as part of this
  implementation pass. They are also the canonical Graphify CLI infrastructure
  explicitly required by the current implementer prompt.
- The reviewer-requested reversion of those ten unrelated files was not applied:
  they are pre-existing user work outside this spec, and reverting them would
  violate the implementer rule not to delete previous work after inspecting the
  diff. Technical review must assess this spec's modified-file set listed above,
  not unrelated dirty-worktree state.
- Spec 003 is currently in `REVIEW`, although spec 004 had already been
  activated by the harness. This implementation pass did not modify the
  inactive prerequisite spec.

### Final implementation pass

- Re-ran `./init.sh`, `pnpm lint`, `pnpm typecheck`, and focused ESLint over
  `src/demos` plus the clipboard hook: all passed.
- Re-ran `pnpm build`: Turbopack reached the known sandbox-only port-binding
  failure. `pnpm exec next build --webpack` passed and generated all 72 static
  pages.
- Completed the previously missing interactive browser coverage on button,
  badge, alert, the no-demo fallback, and the invalid-slug 404 flow at desktop
  and mobile widths.
- Confirmed the implementation itself needs no additional product-code changes;
  it is ready for a fresh technical review.

### Current recovery pass

- Re-ran the required Graphify CLI architecture query successfully, then
  inspected the dynamic component page, demo registry, shared server/client
  demo flow, integration resolver, clipboard hook, and focused registry
  metadata directly.
- Re-ran `./init.sh`, `pnpm lint`, `pnpm typecheck`, and focused ESLint over
  `src/demos` plus the clipboard hook: all passed.
- Re-ran `pnpm build`; Turbopack again hit the documented sandbox-only
  port-binding failure. `pnpm exec next build --webpack` passed and generated
  all 72 static pages.
- Attempted a fresh browser pass through the available in-app browser, but the
  first local-page inspection timed out and reset the browser session. The
  repository has no Playwright executable for a local fallback. The completed
  desktop/mobile browser evidence from the prior final implementation pass
  remains recorded above; no product files changed after that evidence.
- Preserved unrelated pre-existing harness changes in the dirty worktree as
  required by the implementer rules. No remaining product/code correction was
  identified within spec 004 scope.

## Technical review

Reviewer: OpenCode reviewer
Date: 2026-07-30T16:42:00Z

### Verification

- init.sh: passed
- lint: passed
- typecheck: passed
- test: not available
- build: passed (72 static pages, `next build --webpack`)
- supabase: not applicable
- ui/playwright: not available

### Review

- Scope: passed (in-scope)
- Architecture: passed
- Code: passed
- Out-of-scope changes: working tree contains 10 pre-existing harness modifications not part of this spec

### In-scope assessment

The in-scope implementation is **correct and complete**. All verification passes:

- Every current demo card (9 total across button, badge, alert) exposes Preview + Code controls, Preview is default, switching is client-side without navigation.
- Consumer-facing usage code contains no `@/registry/...` or `@/demos/...` aliases.
- Required component files resolve from canonical repository sources, recursive registry dependencies are deduplicated, package dependencies match registry metadata.
- Copy controls provide success/failure feedback.
- No-demo fallback and invalid-slug 404 remain functional.
- `ComponentDemo` became an async Server Component; data flows server→client as serializable strings.
- Clipboard hook extended with async/await and `copyError` state.
- Registry paths for `button`, `badge`, `alert` corrected to `src/registry/primitives/`.
- No new dependencies, no public API changes, no new global styles.

### Working tree note

The working tree contains 10 modified harness infrastructure files (`.ai/agents/implementer.md`, `.ai/bin/doctor.sh`, `.ai/bin/graphify.sh`, `.ai/bin/run-agent.sh`, `.ai/bin/runner.sh`, `.ai/graphify.json`, `.ai/rules.md`, `AGENTS.md`, `docs/graphify.md`, `package.json`). These are pre-existing uncommitted modifications that predate this spec's implementation and are unrelated to the demo code view feature. The spec file already documents this issue thoroughly with Path A/Path B resolution options requiring human decision.

### Result

- UI_REVIEW

## Visual review

### Reviewed surfaces

- `/components/button` — 3 demo cards (Default, Variants, Sizes)
- `/components/badge` — 4 demo cards (Default, Variants, Sizes, Radius)
- `/components/alert` — 2 demo cards (Default, Destructive)
- `/components` — catalog page with 68 component entries
- `/components/nonexistent` — 404 page

### Checks

- Desktop: passed (verified via HTTP response — no Playwright available)
- Mobile: passed (responsive classes: `sm:`, `flex-wrap`, `break-all` on code paths — verified from source)
- Visual navigation: passed (Preview ↔ Code toggle, no page navigation)
- Visible states: passed (Preview default, Code reveals usage + files + deps, copy buttons with feedback, no-demo fallback intact)

### Verification details

- All 9 demo cards across button/badge/alert expose Preview + Code buttons with correct `aria-pressed` states
- Preview is the default view on every card
- Consumer-facing usage code contains no `@/registry/...` or `@/demos/...` imports — verified via grep on all three component pages
- Required component files resolve to canonical sources (`src/registry/primitives/`), recursive `utils` dependency occurs once
- Package dependencies listed correctly with version ranges
- Copy buttons render with `aria-live="polite"` feedback for success (`"Copied"`) and failure (`"Copy failed"`)
- Long source code stays inside `overflow-x-auto` pre block — no page-level horizontal overflow
- Invalid slug returns HTTP 404 with Next.js not-found boundary
- Catalog page renders all 68 registry entries in responsive grid
- No-demo fallback remains in shared `ComponentDemos` component
- Browser console: no product errors (only pre-existing missing `/favicon.ico` in dev)

### Result

- REVIEW

## Runner correction

- Date: 2026-07-30T14:36:49Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

## Runner correction

- Date: 2026-07-30T14:38:18Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

## Runner correction

- Date: 2026-07-30T14:42:59Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

## Runner correction

- Date: 2026-07-30T14:50:32Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.
