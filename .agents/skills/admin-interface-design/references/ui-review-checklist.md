# UI Review Checklist

Use this reference when visually reviewing rendered administrative UI or reusable components intended for administrative interfaces.

Compilation, type checking, tests, and source inspection are necessary technical evidence but are not visual verification.

## Required evidence

Record:

- reviewed route or component;
- relevant state and test data;
- viewport dimensions;
- color mode;
- interaction states inspected;
- before and after evidence for corrections when available;
- any limitation that prevented complete review.

Use screenshots or equivalent rendered evidence. Keep comparisons under the same viewport, theme, data, and state whenever possible.

## Review sequence

### 1. Scope and intent

- Confirm the requested workflow and acceptance criteria.
- Identify the primary user task.
- Identify comparable pages, components, or demos.
- Distinguish intentional variants from accidental divergences.
- Reject unrelated redesign or scope expansion.

### 2. Information architecture

- The page purpose and current location are immediately clear.
- Navigation terminology matches page terminology.
- The primary action is prominent without competing actions.
- Sections follow user meaning rather than storage structure.
- Repeated actions appear in predictable locations.
- Density suits regular administrative work.
- Cards, tabs, borders, and containers communicate real structure.

Read `information-architecture.md` when the change affects navigation, hierarchy, or page layout.

### 3. Data display

- Table, list, cards, list-detail, or stats match the comparison task.
- Primary identifiers, statuses, and important values are easy to scan.
- Columns, numbers, labels, metadata, and actions align consistently.
- Search, filtering, sorting, selection, and pagination are understandable.
- Loading, empty, no-results, error, stale, and permission states are distinct.
- Realistic long, missing, and extreme values do not break the layout.

Read `data-display.md` when the change displays or manipulates collections or metrics.

### 4. Forms and actions

- Field order follows the task and user mental model.
- Labels remain visible and help text is attached to the correct control.
- Required, optional, invalid, and disabled states are clear.
- One primary action exists per form region.
- Pending submission prevents duplicates without obscuring context.
- Success and failure feedback appear at the appropriate level.
- Destructive actions are separated, explicit, and proportionally confirmed.
- User input survives validation and recoverable server errors.

Read `forms-and-actions.md` when the change affects input or mutation flows.

### 5. Component consistency

Compare equivalent elements for:

- height, width behavior, padding, and gaps;
- alignment and icon sizing;
- typography and content hierarchy;
- radius, borders, backgrounds, and shadows;
- hover, focus-visible, active, selected, disabled, loading, and invalid states;
- demo container presentation;
- responsive behavior.

Require an explanation of any visible outlier and whether it is intentional. Read `component-consistency.md` for component or demo unification.

### 6. Theme and restraint

- Semantic theme tokens are used.
- No Cobalt-specific values are hardcoded into reusable components.
- Light and dark modes retain hierarchy and contrast.
- Color communicates action, status, warning, or error rather than decoration alone.
- Radius, shadows, gradients, and decoration remain subordinate to function.
- Equivalent roles receive equivalent styling.
- Arbitrary Tailwind values are justified or removed.

### 7. Responsive behavior

Review at least one representative desktop width and one representative mobile width when applicable.

- Priority survives reflow.
- Primary identity, status, and actions remain accessible.
- Columns collapse in a meaningful order.
- Tables preserve their comparison task or use a deliberate alternative.
- Menus, dialogs, sheets, popovers, and tooltips remain within the viewport.
- Sticky or fixed elements do not obscure content.
- Long content does not cause page-wide horizontal overflow.
- Touch targets and spacing remain usable.

### 8. Accessibility and interaction

- Keyboard navigation follows a logical order.
- Focus-visible is clear and not clipped.
- Icon-only actions have accessible names.
- Labels and errors are programmatically associated.
- Color is not the only state cue.
- Disabled and read-only states are distinguishable.
- Dialog focus, escape behavior, and focus restoration work.
- Hover-only information has a keyboard-accessible equivalent.
- Motion communicates change and respects reduced-motion preferences when relevant.

### 9. Regression check

- Existing intentional variants remain correct.
- Shared primitive changes were checked against representative consumers.
- Behavior, component APIs, and responsive states remain intact.
- No unrelated theme, dependency, or global typography change was introduced.
- Console errors and obvious layout shifts were checked during the rendered review.

## Minimum viewport matrix

Use project-defined viewports when available. Otherwise select representative widths rather than treating these values as product requirements:

| Context | Representative viewport |
| --- | --- |
| Mobile | 390 x 844 |
| Desktop | 1440 x 900 |

Add intermediate or wide viewports when the layout has breakpoints or dense tables that require them.

## Review result

Choose one result:

- **Approve:** acceptance criteria are met and rendered evidence covers relevant states.
- **Approve with notes:** only non-blocking observations remain and they are documented.
- **Request changes:** a visible, behavioral, responsive, accessibility, or scope issue remains.
- **Blocked:** required rendering, route, data, authentication, browser access, or skill guidance was unavailable.

Do not approve solely because the code compiles or resembles the expected classes.

For each requested change, report:

1. where it occurs;
2. the state and viewport;
3. what is visibly or behaviorally wrong;
4. which established pattern or rule it violates;
5. the smallest expected correction, without prescribing arbitrary CSS unless required.

## Completion template

```md
UI review: approve | approve with notes | request changes | blocked

Reviewed:
- Route/component:
- Viewports:
- Color modes:
- States:

Evidence:
- [screenshot or rendered artifact]

Findings:
- None.

Limitations:
- None.
```
