# Information Architecture

Use this reference when planning or reviewing navigation, page hierarchy, layouts, and information-dense workflows in administrative interfaces.

## Start with the task

Before choosing a layout, identify:

1. the user's primary task;
2. the information needed to complete it;
3. the most frequent secondary tasks;
4. the context that must remain visible;
5. the actions that change or destroy data.

Organize the page around the primary task. Do not begin from a preferred visual pattern and force the content into it.

## Page hierarchy

A standard administrative page should normally contain, in order:

1. application navigation;
2. contextual navigation such as breadcrumbs when useful;
3. page title and concise supporting context;
4. primary page action;
5. controls for finding or narrowing information;
6. the main content or working surface;
7. secondary information and lower-priority actions.

Do not add breadcrumbs when the hierarchy is already obvious from persistent navigation. Do not repeat the same title or context in multiple adjacent regions.

## Navigation

- Group destinations by user task or domain, not by implementation detail.
- Keep labels short, concrete, and consistent with page titles.
- Keep the current location unmistakable through selection state and page heading.
- Put frequent, high-value destinations before infrequent administrative settings.
- Avoid deep nesting. Prefer a shallow hierarchy with clear section labels.
- Preserve navigation position and terminology across related applications.
- Do not use icons without labels for primary navigation unless the meaning is universally clear and an accessible name is present.
- Keep global navigation separate from record-specific navigation.

Use sidebar navigation when there are several persistent product areas. Use top navigation when the number of peer destinations is small. Use tabs for views of the same object or workflow, not for unrelated destinations.

## Page actions

- Place the primary page-level action near the title or at the start of the main working region.
- Use one visually dominant action per page region.
- Keep recurring actions in consistent locations across equivalent CRUD pages.
- Place record-specific actions with the record, not in a distant global area.
- Move low-frequency actions into a secondary menu when this improves scanning.
- Separate destructive actions from routine actions.
- On mobile, keep the primary action discoverable without obscuring content.

## Page layout selection

Choose the layout that preserves context with the least interaction cost:

- **Single column:** focused forms, settings, empty states, and linear tasks.
- **Content plus aside:** primary work with supporting metadata or help.
- **List-detail:** repeated selection and inspection of records where returning to the list would be disruptive.
- **Tabs:** multiple views or categories belonging to the same entity.
- **Dashboard grid:** genuinely independent summaries that need comparison or monitoring.

Do not use a dashboard grid simply because cards are available. A continuous surface is usually clearer for one coherent workflow.

## List-detail layouts

Use list-detail when users repeatedly switch between records while preserving search, filters, or selection context.

- Keep the list scannable and the selected item clear.
- Preserve filters, scroll position, and selection when practical.
- Give the detail pane enough width for the actual task.
- Provide a sensible narrow-screen fallback, usually list to detail navigation with a clear return action.
- Avoid duplicating every field in both list and detail views.

## Sections and grouping

- Group information by user meaning, not database schema.
- Use headings only when they clarify distinct sections.
- Prefer spacing and alignment before borders, backgrounds, or nested cards.
- Keep closely related controls visually close.
- Avoid containers nested inside containers unless each boundary communicates a real scope.
- Keep important status and blocking information near the action it affects.

## Density

Administrative interfaces are working tools. Favor efficient scanning without crowding.

- Use compact density for repetitive data and frequent workflows.
- Use comfortable density for complex forms or infrequent tasks.
- Preserve readable line length and clear row separation.
- Avoid large empty areas that push relevant information below the fold.
- Do not compress interactive targets below accessible sizes merely to fit more content.
- Apply the same density to equivalent screens unless the task justifies a difference.

## Responsive behavior

Responsive design must preserve task priority, not merely shrink desktop layout.

1. Keep identity, status, and primary actions visible.
2. Collapse or defer secondary metadata.
3. Replace multi-column layouts with a deliberate reading order.
4. Preserve access to filters and actions through clear drawers, sheets, or menus.
5. Avoid horizontal overflow for the entire page.

When a dense table cannot fit, use the responsive guidance in `data-display.md` rather than turning every row into an unrelated card by default.

## Consistency rules

Equivalent destinations and workflows should share:

- title and breadcrumb behavior;
- action placement;
- filter placement;
- content width and spacing rhythm;
- empty, loading, and error presentation;
- navigation terminology;
- mobile adaptation.

Differences are acceptable when driven by a different user task or information structure. Document the reason when breaking an established pattern.

## Review questions

- Can the user identify the page and its primary task immediately?
- Is the primary action clear without competing actions?
- Does the layout preserve the context needed for repeated work?
- Are navigation labels and destinations predictable?
- Is content grouped by user meaning?
- Is the interface appropriately dense for daily administrative use?
- Does the mobile layout preserve priority and access to actions?
- Are any cards, borders, tabs, or nested containers present without a functional purpose?
