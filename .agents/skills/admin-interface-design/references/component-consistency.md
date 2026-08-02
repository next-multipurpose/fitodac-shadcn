# Component Consistency

Use this reference when creating, comparing, unifying, or reviewing reusable components and component demos.

## Objective

Equivalent visual roles should feel like members of the same system while preserving intentional variants. Consistency work is not permission to redesign the component family.

If an equivalent element looks uncomfortably different, determine whether it is an intentional variant or an accidental divergence before changing it.

## Source of truth

Resolve decisions in this order:

1. active theme semantic tokens;
2. shared component primitives and declared variants;
3. comparable components and demos in the project;
4. established shadcn/ui composition patterns;
5. the most restrained solution that fits the role.

Do not hardcode Cobalt-specific values. Do not copy an accidental majority pattern when it conflicts with the theme, accessibility, or component API.

## Comparison method

Before editing:

1. Render all equivalent demos under the same theme, viewport, content conditions, and interaction state.
2. Identify the shared role and expected invariant properties.
3. List meaningful differences.
4. Classify each difference as intentional, content-driven, state-driven, or accidental.
5. Find the lowest appropriate correction point: demo composition, variant, primitive, or theme.
6. State the detected divergence and rationale in the implementation report.

Do not rely only on source inspection. A difference in code may render identically, and a subtle inherited difference may be visible only when rendered.

## Properties to compare

### Geometry

- component height and width behavior;
- padding and internal gaps;
- alignment and baseline;
- icon size and placement;
- border radius;
- border width;
- control and target size.

### Typography

- font family inherited from the theme;
- size, weight, line height, and letter spacing;
- label, description, metadata, and value hierarchy;
- truncation and wrapping behavior;
- numeral formatting when values are comparable.

### Surface and color

- background and foreground tokens;
- border and separator treatment;
- elevation and shadow;
- muted, accent, destructive, and status roles;
- contrast in light and dark modes.

### Interaction

- hover, focus-visible, active, pressed, selected, disabled, loading, and invalid states;
- pointer and keyboard behavior;
- transition purpose and duration;
- tooltip and accessible-name behavior for icon-only controls.

### Composition

- title, description, action, and content order;
- placement of badges, icons, metadata, and menus;
- responsive stacking and overflow;
- alignment with neighboring components.

## Intentional variants

A difference is intentional when it communicates a documented difference in:

- hierarchy;
- state;
- behavior;
- density;
- content type;
- platform or viewport constraint.

An intentional variant should be named, repeatable, and implemented through a component API, variant, or documented demo purpose. A one-off class difference without a clear purpose is not sufficient evidence of intent.

## Choosing the correction level

### Correct the demo when

- the primitive already behaves consistently;
- the divergence comes from wrapper layout, sample content, or isolated classes;
- the demo is not intentionally demonstrating that difference.

### Correct the variant when

- the difference belongs to a supported semantic option;
- multiple consumers need the same behavior;
- expressing the option through the API improves predictability.

### Correct the primitive when

- the inconsistency affects all or most consumers;
- the current default violates the theme or accessibility contract;
- the correction does not silently break intentional variants.

### Correct the theme only when

- the token itself is demonstrably wrong across the system;
- the change is explicitly in scope;
- human approval has been obtained when required.

Do not change a shared primitive to repair one isolated demo without checking its consumers.

## Demo presentation

Equivalent demo containers should use consistent:

- background and border treatment;
- radius and elevation;
- padding and minimum height;
- heading and description hierarchy;
- spacing between examples;
- alignment and responsive behavior.

The container should support inspection, not compete with the component. Do not add decoration that makes a simple primitive appear more elaborate than it is.

Sample data may vary to explain behavior, but avoid arbitrary content differences that distort height, wrapping, or visual weight during comparison.

## Tailwind and tokens

- Prefer semantic utilities backed by the active theme.
- Prefer existing spacing, sizing, radius, and shadow scales.
- Avoid arbitrary values unless the requirement cannot be expressed otherwise.
- Avoid hardcoded colors when semantic tokens exist.
- Keep state classes adjacent and understandable.
- Do not duplicate a component variant through repeated demo-level classes.

## Light, dark, and responsive modes

Verify both light and dark modes when supported. A component is inconsistent if it only matches its peers in one mode.

At minimum, compare:

- normal and high-content cases;
- desktop and narrow widths;
- wrapping, truncation, and overflow;
- focus-visible and disabled states;
- selected, invalid, or destructive states when applicable.

## Acceptable outcome

A consistency change is complete when:

- the outlier and its cause are identified;
- intentional variants remain intact;
- the smallest appropriate layer was changed;
- semantic tokens and existing primitives are used;
- accessibility and behavior are preserved;
- the result matches equivalent components in rendered comparison;
- no unrelated redesign was introduced.

## Review questions

- What role is shared by the compared elements?
- Which properties should therefore remain invariant?
- Is the difference intentional and documented?
- Is the correction applied at the lowest correct layer?
- Would changing a shared primitive affect unrelated consumers?
- Does the result remain consistent in light, dark, narrow, and interaction states?
- Were arbitrary styles introduced to imitate rather than reuse the system?
