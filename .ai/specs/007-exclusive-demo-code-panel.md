# 007 — Exclusive demo Code panel per component page

Status: DRAFT
Role: implementer
UI Review: required
Tooling policy: stop-with-blocker

## Goal

Ensure that only one demo card on a component detail page can display its Code view at a time.

When Code is opened on one demo card, every other demo card on that same page must immediately return to Preview and show its rendered component.

Work only on branch `migration-to-demo-site`.

Prerequisite:

- Spec 006 must be `DONE`.

## Current behavior

`DemoCard` currently owns local state equivalent to:

```ts
const [view, setView] = useState<"preview" | "code">("preview")
```

Because each card owns its own state, multiple Code panels can be open simultaneously.

The state must instead be coordinated at the component-demo collection level.

## Scope

### Shared page-level state

Introduce one shared state boundary for the demos rendered on the current component detail page.

The state model should be equivalent to:

```ts
openCodeDemoId: string | null
```

Behavior:

- `null` means every card shows Preview;
- setting the id of demo A opens Code for A;
- opening Code for demo B replaces A as the active id;
- A therefore returns to Preview automatically;
- clicking Preview on the active card clears the active id;
- clicking Preview on an already closed card does not affect another active card;
- `Copy prompt` and code copy actions do not change which Code panel is open.

Do not use a global application store.

Do not persist this state in localStorage.

Do not add query parameters or URL state.

The state lifetime is the current component page.

### Server/client boundary

Preserve the existing server-side integration bundle resolution.

Use the smallest client-side coordination boundary possible.

A preferred architecture is a client provider/controller around the group of demo cards, while the server components remain responsible for resolving bundles and rendering preview content.

Server-rendered preview content may be passed through the client coordination boundary as children/React nodes.

Do not move filesystem/source resolution into the browser.

Do not convert `/components/[slug]/page.tsx` wholesale into a Client Component.

### DemoCard

Refactor `DemoCard` from independent local view state to controlled/shared view state.

It must continue supporting:

- Preview;
- Code;
- Copy prompt;
- code copy actions;
- existing integration bundle display;
- accessible pressed state;
- existing responsive behavior.

### Automated interaction tests

Using the test foundation from spec 006, add focused tests with at least two demo cards.

Test:

1. both cards start in Preview;
2. opening Code on A shows A Code while B remains Preview;
3. opening Code on B closes A and returns A to Preview;
4. clicking Preview on B closes B and leaves both cards in Preview;
5. opening A and then using `Copy prompt` on B does not close A;
6. copy controls inside the active Code panel do not change the active card;
7. keyboard activation follows the same single-open behavior.

Mock only the clipboard boundary needed by the interaction tests.

Do not mock the coordination state itself.

## Out of scope

- Accordion animation.
- Persisting which demo is open across navigation/reload.
- Changing Code contents.
- Changing prompt contents.
- Changing the integration bundle.
- Multiple Code panels intentionally open.
- Global state libraries.
- URL/query state.
- New UI dependencies.
- Redesigning demo cards.

## Acceptance criteria

- Every component page starts with all demos in Preview.
- At most one registered demo card can show Code at any instant.
- Opening another Code panel automatically returns the previous card to Preview.
- Preview renders the real demo content after another card takes focus.
- Copy prompt does not affect open/closed Code state.
- Copy-code actions do not affect open/closed Code state.
- Existing Preview/Code `aria-pressed` semantics remain correct.
- Keyboard users receive the same behavior as pointer users.
- State is scoped to the current component demo collection.
- Navigating to another component page starts with all demos in Preview.
- No global store or persistent browser storage is introduced.
- No source-resolution logic moves client-side.
- Existing Code and Prompt functionality remains intact.
- Automated tests cover the shared-state behavior.
- Tests pass through `pnpm test` and `./init.sh`.
- Desktop/mobile demo card layout does not regress.

## Architecture

Decision required: no.

Human-approved decision:

- only one Code view may be expanded per component demo page.

Implementation constraint:

- coordinate state at the closest common ancestor/client context;
- do not keep independent `view` state in every `DemoCard`;
- preserve the server/client split introduced by specs 004–005.

A small client context/provider is acceptable.

A global state library is not.

## Relevant files

Existing:

- `src/demos/demo-card.tsx`
- `src/demos/component-demo.tsx`
- `src/demos/registry.ts`
- integration helpers from specs 004–005
- clipboard hook used by the demo card

Expected additions may include:

- `src/demos/demo-view-provider.tsx`
- `tests/demos/demo-card-coordination.test.tsx`

Use equivalent names if a cleaner boundary already exists.

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

### `/components/button`

With Default, Variants, and Sizes:

- open Default Code;
- open Variants Code;
- verify Default immediately returns to rendered Preview;
- open Sizes Code;
- verify Variants returns to Preview;
- close Sizes through Preview;
- verify all three are Preview.

### `/components/badge`

Repeat with at least two cards to confirm the behavior is generic rather than button-specific.

### Shared checks

- Copy prompt while another demo is open: active Code panel remains open.
- Copy example/file source: active Code panel remains open.
- Keyboard activation.
- Desktop.
- Mobile.
- No page-level horizontal overflow.
- No browser console errors.

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Pending.

UI reviewer must explicitly verify that no page can display two Code panels simultaneously.
