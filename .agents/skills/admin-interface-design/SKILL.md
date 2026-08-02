---
name: admin-interface-design
description: Design and review sober, consistent administrative interfaces and component demos intended for dashboards, CRUDs, tables, forms, filters, navigation, data display, and information-management workflows. Use when planning, implementing, unifying, or visually reviewing admin panels or their reusable UI components.
---

# Admin Interface Design

Design administrative interfaces as predictable working tools.

Prioritize:

1. task completion;
2. information hierarchy;
3. readability and scanning;
4. consistency and learnability;
5. efficient daily use;
6. restrained visual presentation.

## Required workflow

Before making UI decisions:

1. Identify the user's primary task.
2. Identify the information hierarchy.
3. Inspect comparable components and screens.
4. Inspect the active theme and shared primitives.
5. Distinguish intentional variants from accidental inconsistencies.
6. Choose the most conservative existing pattern that satisfies the task.

## Source of truth

Apply visual decisions in this order:

1. Active theme semantic tokens.
2. Existing shared primitives and variants.
3. Comparable project components.
4. shadcn/ui composition patterns.
5. This skill's interface-design guidance.

Do not hardcode Cobalt-specific values into components.

## Interface principles

- Prefer tables for comparable structured records.
- Prefer lists when hierarchy or supporting content matters more than columns.
- Prefer cards only when records need independent visual grouping.
- Use list-detail layouts when maintaining context improves the workflow.
- Keep primary actions prominent and secondary actions quieter.
- Keep destructive actions separated and explicitly confirmed.
- Use color primarily for actions, status, warnings, and errors.
- Use restrained borders, radius, shadows, and decoration.
- Avoid decorative gradients and unnecessary cards.
- Avoid excessive empty space in information-dense workflows.
- Preserve consistent location, naming, and behavior across CRUD operations.
- Include loading, empty, error, success, disabled, invalid, and permission states when relevant.
- Preserve accessibility, responsive behavior, and keyboard interaction.

## Boundaries

Do not:

- redesign an interface outside the requested scope;
- change global theme tokens without human approval;
- change brand identity or global typography without human approval;
- invent a new component when an existing primitive or composition is adequate;
- use arbitrary values when semantic tokens already express the decision;
- make every data group a card.

## References

Read only the references needed for the task:

- `references/information-architecture.md` for navigation, hierarchy and page layout.
- `references/data-display.md` for tables, lists, cards, stats and states.
- `references/forms-and-actions.md` for forms, actions and CRUD flows.
- `references/component-consistency.md` for component and demo unification.
- `references/ui-review-checklist.md` when reviewing rendered UI.