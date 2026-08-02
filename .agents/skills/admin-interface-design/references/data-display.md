# Data Display

Use this reference for tables, lists, cards, statistics, filters, search, pagination, and data-related states.

## Choose the right representation

Choose based on the comparison task:

- **Table:** records share comparable fields and users scan, sort, select, or act across rows.
- **List:** hierarchy, identity, or supporting text matters more than column comparison.
- **Cards:** records are few, independently actionable, and need visual grouping or richer preview.
- **List-detail:** users repeatedly inspect or edit records while preserving list context.
- **Stats:** a small set of metrics supports monitoring or a decision.

Do not use cards as the default wrapper for every collection. Do not use a table when most cells would be empty, multiline, or structurally unrelated.

## Tables

### Column design

- Put the primary identifier first.
- Order remaining columns by task importance and comparison frequency.
- Keep related values adjacent.
- Align text left, numbers right, and short status values consistently.
- Use tabular numerals for columns whose digits need comparison.
- Keep headers concise and use tooltips or supporting copy only when necessary.
- Hide low-value columns before truncating essential values.
- Avoid showing internal IDs unless the workflow requires them.

### Rows and actions

- Keep row height consistent within the same table.
- Make selection behavior distinct from navigation behavior.
- Place frequent row actions predictably.
- Use an overflow menu for infrequent actions.
- Do not hide the only important action behind a menu.
- Keep destructive actions separated and require confirmation when consequences are material.
- Preserve focus and selection after inline updates when practical.

### Sorting and selection

- Only present sorting where it works and matters.
- Make the active sort direction visible.
- Preserve selection when pagination or filtering behavior safely allows it.
- Clearly state whether bulk selection applies to the current page or all filtered results.
- Keep bulk actions close to the selection summary.

## Lists

- Give each item a clear primary label.
- Keep secondary metadata quieter but readable.
- Use consistent placement for status, timestamp, and actions.
- Limit item content to what supports scanning or the next decision.
- Use separators or spacing consistently; avoid combining heavy borders, shadows, and background changes.
- Make the clickable area and nested actions unambiguous.

## Cards

Use cards only when the boundary has meaning.

- Keep card anatomy consistent across equivalent records.
- Use one clear title and a limited amount of supporting metadata.
- Avoid nested cards.
- Do not use large imagery, oversized radius, or elevation unless the content requires it.
- Keep action placement stable.
- Prefer a list or table if users need rapid comparison across many records.

## Statistics and summaries

- Show metrics that support a real decision or indicate meaningful change.
- Use clear labels, units, and time ranges.
- Format numbers consistently.
- Distinguish absolute values from percentages and deltas.
- Do not use color alone to communicate positive or negative change.
- Avoid decorative charts or trend arrows without interpretable data.
- Keep the number of headline metrics small enough to scan.

## Search, filters, and sorting

- Use search for user-recognizable identifiers and text fields.
- Use filters for bounded attributes such as status, category, owner, or date range.
- Use sorting for meaningful comparison order.
- Do not combine these controls into one ambiguous interaction.
- Place common controls near the data they affect.
- Display active filters and provide a clear reset action.
- Preserve filter state during record inspection when it supports the workflow.
- Debounce remote search and communicate loading without disrupting input.
- Use labels that describe what can be searched, not generic placeholder-only instructions.

## Pagination and result counts

- Use pagination for large or remotely loaded collections.
- Show the current result range and total when known and useful.
- Keep page-size controls only when users benefit from changing density.
- Reset to a valid page after filters change.
- Preserve query state in the URL when users need shareable or recoverable views.
- Do not use infinite scroll for workflows requiring precise location, comparison, bulk selection, or return navigation.

## Data states

Every data surface must account for relevant states.

### Loading

- Preserve layout stability.
- Use skeletons when the eventual structure is predictable.
- Use a spinner for short, localized operations with no useful skeleton shape.
- Do not present stale data as current without an updating indicator.

### Empty

Differentiate:

- no records exist;
- no results match current search or filters;
- the user lacks access;
- data could not be loaded.

Explain the state briefly and offer the next valid action. Do not show a creation action when the user lacks permission.

### Error

- State what failed in user terms.
- Preserve recoverable inputs and context.
- Offer retry when retry can succeed.
- Keep technical details out of the primary message.

### Partial and stale data

- Mark unavailable sections without discarding successfully loaded content.
- Communicate background refreshes subtly.
- Prevent actions that depend on missing or stale prerequisites when unsafe.

## Status and color

- Use semantic theme tokens.
- Pair color with text, icon, shape, or position.
- Reserve strong colors for information that needs attention.
- Keep neutral statuses visually quiet.
- Use identical labels and treatments for identical states across screens.

## Responsive data display

Adapt according to task priority:

1. Keep the primary identifier, status, and essential action.
2. Hide or defer secondary columns.
3. Allow deliberate horizontal scrolling for genuinely tabular comparison.
4. Use a row detail disclosure when secondary fields remain necessary.
5. Convert to a list only when the comparison task still works in that form.

Do not automatically transform every table row into a card. Test the narrow layout with realistic content lengths.

## Content realism

Review with representative data:

- long names and labels;
- missing optional values;
- large and negative numbers;
- multiple statuses;
- one record and many records;
- no results;
- localized dates and currency when applicable.

## Review questions

- Does the representation match the comparison task?
- Can users find the primary identifier and status quickly?
- Are columns, values, and actions consistently aligned?
- Are search, filter, sort, and pagination roles distinct?
- Are loading, empty, error, and permission states accurate?
- Does the responsive version preserve essential comparison and actions?
- Is color semantic and supported by another cue?
- Are decorative containers or metrics adding noise without helping a decision?
