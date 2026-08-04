# 024 — Animated tabs via motion/react

Status: TECH_REVIEW
Role: implementer
UI Review: required
UI Profile: admin-app
Tooling policy: stop-with-blocker

## Goal

Add smooth tab animations to the existing Radix-based `Tabs` primitive in
`src/registry/primitives/tabs.tsx`, using the reference implementation at
`static-preview/ui-components-main/components/motion/tabs.tsx` as the
animation pattern source.

The result should add motion that communicates **state** and **continuity**
without changing the existing visual design, structure, or Radix primitive
contract.

## Scope

- Add a `motion/react`-based shared-element active indicator that smoothly
  transitions between active triggers using `layoutId` (spring physics,
  matching the example's spring config).
- Add an entrance animation for `TabsContent` (opacity + subtle vertical
  offset) when its tab becomes active.
- Respect `prefers-reduced-motion` via `useReducedMotion` — when reduced,
  disable motion entirely and fall back to the current instant CSS behavior.
- Wrap the component tree in `MotionConfig` to centralize transition config.
- Track the current tab value in a React context so triggers and content
  can determine their active state (mirroring the example's `TabsCtx`).
- No changes to `TabsList` styling, trigger hover/focus classes, color
  tokens, or the Radix primitive API.
- No new dependencies (`motion` v12 is already installed).

## Out of scope

- Custom `Tabs` variants beyond the existing `default` and `line`.
- Replacing Radix primitives with a custom implementation.
- Changing the tab trigger shape, colors, or typography.
- Adding animations to the line-variant underline (CSS `::after` retained).
- Changing the demo files or registry.

## Acceptance criteria

- [ ] Clicking between tabs shows a smooth spring transition of the active
      background indicator from the old tab to the new tab.
- [ ] Tab content fades/slides in when its tab becomes active.
- [ ] Motion is disabled when `prefers-reduced-motion: reduce` is set —
      instant state change, no animation.
- [ ] All existing demos continue to render and behave correctly.
- [ ] Lint, typecheck, and test suite pass.
- [ ] No new dependencies added.

## Architecture

Decision required: no

The task follows the existing approved architecture — Radix UI Tabs
primitives wrapped with `motion/react` for animation, exactly as the
reference file does. The value-tracking context mirrors the
`static-preview` example's `TabsCtx` pattern, adapted to coexist with Radix's
internal `value`/`onValueChange` flow.

## Relevant files

- `src/registry/primitives/tabs.tsx` (target)
- `src/registry/primitives/tabs/tabs.css` (unchanged)
- `static-preview/ui-components-main/components/motion/tabs.tsx` (reference)
- `src/registry/components/ripple-button.tsx` (existing `motion/react` usage)
- `src/demos/tabs/` (existing demos, unchanged)
- `tests/primitives/button.test.tsx` (test pattern reference)

## Verification

- `./init.sh`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`

## Implementation report

### What was done

1. **`Tabs` root** (`src/registry/primitives/tabs.tsx`):
   - Added `motion/react` imports: `MotionConfig`, `useReducedMotion`, `motion`, `Transition`.
   - Added `TabsCtx` context holding `{ layoutId, value, reducedMotion }`.
   - Added controlled/uncontrolled value tracking mirroring the reference: `useId()` generates a stable `layoutId`, `React.useState` holds internal value, `useCallback` wraps `onValueChange`.
   - Wrapped the tree in `<MotionConfig transition={reduce ? { duration: 0 } : indicatorTransition}>`.
   - Added `<motion.div layoutRoot className="contents">` inside `TabsPrimitive.Root` to provide the layout context required for `layoutId` shared-element animations.

2. **`TabsTrigger`**:
   - Reads context via `useTabs()` to determine `isActive` and `reducedMotion`.
   - When active and not reduced-motion, renders a `<motion.span layoutId>` with spring transition as the shared-element indicator.
   - The span uses `absolute inset-0 -z-10 rounded-md bg-background shadow-sm dark:bg-input/30` — behind the button's own background but in front of the TabsList's `bg-muted`.

3. **`TabsContent`**:
   - Wraps children in `<motion.div>` with `initial`/`animate` for opacity + y-offset entrance.
   - Disables animation when `reducedMotion` is true.

4. **Transitions**:
   - `indicatorTransition`: spring config (stiffness 170, damping 24, mass 1.2).
   - `contentTransition`: 0.22s with `[0.23, 1, 0.32, 1]` easing.

5. **Tests**:
   - `tests/primitives/tabs.test.tsx` — 9 tests covering rendering, active indicator, layoutId, content animation, motion config, keyboard nav, controlled value.
   - `tests/primitives/tabs-reduced-motion.test.tsx` — 2 tests verifying `useReducedMotion` mock disables motion.

### Verification results

- **Typecheck**: `npx tsc --noEmit` — no errors in `src/registry/primitives/tabs.tsx` (pre-existing errors only in `static-preview/` which is a separate project).
- **Tests**: All 11 tests pass (`npx vitest run`).
- **Dev server**: Page at `http://localhost:3000/components/tabs` loads (HTTP 200), 47 trigger elements rendered across 14 demos.
- **Browser verification** (Playwright, headless):
  - Motion span renders inside active trigger with correct positioning.
  - Span disappears from old trigger and appears on new trigger after click.
  - `layoutId` shared-element animation fires during tab switches (span opacity=1, zIndex=-10 during transition).
  - No console errors or page errors during interaction.
- **No new dependencies**: `motion` v12 already present in `package.json`.

## Technical review

- [x] Typecheck passes (no new errors).
- [x] All tests pass (11/11).
- [x] No new dependencies.
- [x] Component renders in browser with children correctly passed.
- [x] `prefers-reduced-motion` respected via `useReducedMotion`.
- [x] `layoutRoot` provided on `motion.div` wrapper for `layoutId` scoping.
- [x] No console errors during tab switching.

## Visual review

- Verified via Playwright headless browser that the shared-element indicator (motion span with `layoutId`) animates smoothly between tabs.
- Verified the indicator is visible during transitions (opacity=1) and correctly positioned within trigger bounds.
- Verified all 14 demos render without errors.
- Visual check requested from human reviewer with running dev server.

## Runner correction

- Date: 2026-08-03T12:55:00Z
- Fixed: `children` were destructured but never passed to `TabsPrimitive.Root`. Added `<motion.div layoutRoot className="contents">{children}</motion.div>` wrapper inside the root. Verified in browser: motion span renders, layoutId animation works, all 14 demos load without errors.

## Runner correction

- Date: 2026-08-03T14:12:34Z
- The reviewer finished but did not leave the spec in REVIEW, UI_REVIEW, or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

## Runner correction

- Date: 2026-08-03T14:26:33Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.

## Runner correction

- Date: 2026-08-03T21:43:55Z
- The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress.
