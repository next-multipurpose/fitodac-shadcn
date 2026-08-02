# Code conventions

> Extreme consistency.
> AI predicts better when the repository looks like itself everywhere.

---

## Stack

- TypeScript
- React
- Next.js or Vite
- Supabase
- Tailwind CSS
- shadcn/ui
- pnpm

Always use the project's existing conventions if they are already defined.

---

## TypeScript

- Use strict TypeScript whenever the project allows it.
- Avoid `any` unless there is a clear justification.
- Prefer explicit types at boundaries: props, API responses, Supabase data, actions, and services.
- Use `type` by default.
- Use `interface` only if the project already follows that convention or if it makes more sense for extension.
- Do not ignore errors with `// @ts-ignore` except in exceptional and documented cases.

---

## Naming

| Type            | Convention             | Example             |
| --------------- | ---------------------- | ------------------- |
| Components      | `PascalCase`           | `UserMenu`          |
| Hooks           | `useCamelCase`         | `useCurrentUser`    |
| Functions       | `camelCase`            | `getUserProfile`    |
| Variables       | `camelCase`            | `userProfile`       |
| Constants       | `UPPER_SNAKE_CASE`     | `DEFAULT_PAGE_SIZE` |
| Types           | `PascalCase`           | `UserProfile`       |
| Component files | `kebab-case.tsx`       | `user-menu.tsx`     |
| Utility files   | `kebab-case.ts`        | `format-date.ts`    |
| Specs           | `number-kebab-case.md` | `001-login.md`      |

---

## Structure

Respect the existing structure.
If the project does not define one, use this as reference:

```txt
app/ or pages/     -> Next.js routes
src/               -> main code if applicable
components/        -> reusable components
features/          -> feature modules
lib/               -> clients, helpers, and shared configuration
hooks/             -> reusable hooks
supabase/          -> migrations, seed, types, and local configuration
tests/ or e2e/     -> tests
```

Do not create new folders if an existing one already solves the case.

---

## React

- Small components with clear responsibility.
- Explicit props.
- Do not mix heavy business logic inside UI.
- Extract hooks or helpers when a component grows too much.
- Do not use global state if local state is enough.
- Do not duplicate logic across components.

---

## Next.js

- Respect `app/` or `pages/` according to the project.
- Do not mix both patterns without reason.
- In App Router, use Server Components by default.
- Add `"use client"` only when needed for state, events, effects, or browser APIs.
- Keep actions, loaders, or data helpers outside visual components when possible.

---

## Vite

- Respect the existing structure inside `src/`.
- Separate views, components, hooks, services, and utils if the project already does it.
- Do not introduce Next.js patterns into Vite projects.

---

## Supabase

- Centralize Supabase clients and helpers in `lib/`, `services/`, or the existing pattern.
- Do not repeat Supabase configuration across multiple files.
- Do not edit old migrations unless explicitly instructed.
- Create new migrations for schema changes.
- Use generated types when available.
- Do not create custom auth if Supabase Auth solves the case.

---

## Tailwind and shadcn/ui

- Use shadcn/ui before installing another UI library.
- Keep Tailwind classes readable.
- Avoid inline styles except in specific cases.
- Do not change global styles unless the spec asks for it.
- Reuse existing components before creating new ones.
- UI must be usable on desktop and mobile when applicable.

## Visual consistency

Distributed components under `src/registry/primitives/` and
`src/registry/components/` must preserve the existing shadcn visual language.
When a custom component behaves like an existing primitive, use that primitive
as its visual reference rather than creating an independent convention.

Typical references include:

- Autocomplete input -> Input / Select.
- Combobox trigger -> Select / Button.
- Date selector -> Input / Button.
- Custom menu item -> Select / Dropdown Menu.

### Form controls

Standard form controls such as Input, Select, and Button use this baseline:

- Default: `h-9 rounded-md text-sm`.
- Small: `h-8` unless the reference primitive has a specific reason otherwise.
- Large: `h-10` unless the reference primitive has a specific reason otherwise.
- Border: use the closest primitive's semantic treatment, typically `border`
  or `border border-input`.
- Focus: use the closest primitive's exact treatment, typically
  `focus-visible:border-ring focus-visible:ring-[3px]
focus-visible:ring-ring/50`.
- Cobalt focus: text-entry controls must not show a focus ring. When Cobalt is
  active, Input, Textarea, Select, native select, Combobox, InputGroup, and
  InputOTP communicate focus only by changing the control border to `ring`.
  Keep the standard focus ring for the Default theme and for non-input
  interactive controls.
- Invalid: use destructive semantic tokens, typically
  `aria-invalid:border-destructive aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40`.
- Disabled: preserve `disabled:pointer-events-none disabled:opacity-50`, adding
  `disabled:cursor-not-allowed` when the interaction semantics require it.

### Semantic tokens

Distributed components must prefer semantic project tokens over hardcoded
visual values whenever an equivalent token already exists. Use roles such as
`bg-background`, `bg-card`, `bg-popover`, `bg-primary`, `bg-secondary`,
`bg-accent`, `bg-muted`, `text-foreground`, `text-muted-foreground`,
`border-border`, `border-input`, and `ring-ring`. Themes define the appearance
of these roles; components must not require theme-specific CSS overrides.

The demo site defaults to Cobalt through the UI-theme runtime, while Default
values remain in `src/app/globals.css`. Cobalt tokens have one canonical source
in `src/registry/themes/cobalt/registry.json`; do not copy them into runtime
constants. UI theme selection is independent from Light/Dark color mode, and
distributed components must respond only through semantic tokens rather than
theme-name conditionals.

### Radius and typography

Radius communicates component role. Typical guidance is `rounded-md` for form
controls, `rounded-sm` or `rounded-md` for menu and list items, `rounded-lg` for
dialogs and popovers, `rounded-lg` or `rounded-xl` for cards and surfaces, and
`rounded-full` for intentionally fully rounded items. Equivalent roles must use
equivalent radius treatment; not every component uses the same radius.

Reuse the current typography hierarchy: `text-sm` for controls,
`text-sm text-muted-foreground` for secondary text, `text-xs` for small labels,
`font-medium` for control emphasis, and `font-semibold` for titles. Do not add
an arbitrary size when an existing level fits.

### Interaction states

Compare custom distributed components with the closest primitive in default,
hover, focus, active or selected, disabled, and invalid states. When applicable,
also compare open, checked, highlighted, loading, and readonly states.
Equivalent states must use semantic theme tokens rather than component-specific
colors. Intentional structural differences such as compact badges or elevated
surfaces remain valid when they match their component role.

---

## Common libraries

Before adding dependencies, check whether there is already a solution with:

- `day.js` for dates
- `numeral.js` for numbers
- `swiper` for sliders/carousels

Do not add new libraries without justifying it in the spec.

---

## Tests

- Add or adjust tests when there is verifiable logic.
- Do not write decorative tests that do not validate real behavior.
- Tests must be clear and focused.
- If the spec touches critical UI, consider Playwright if available.
- Do not delete existing tests to make the suite pass.

## Demo registration

To add demos to an existing component:

1. Add or edit files under `src/demos/<component>/`.
2. Update `src/demos/<component>/registry.ts`.
3. Run `pnpm demos:registry`.
4. Run `pnpm demos:registry:check`.
5. Run `pnpm test` and the standard verification.

This does not require edits to `src/demos/registry.ts`,
`src/demos/registry.generated.ts`, or `registry.json`. The generated file remains
unchanged when only entries inside an existing group change.

For a new group, create `src/demos/<component>/registry.ts` and its colocated demo
sources, then run `pnpm demos:registry`. Never add a manual import or mapping to
the global registry. `registry.json` is reserved for real distributed
primitive/component/hook definition changes, not demo-site registration.

Normal component demo work owns its component folder. Do not deliver demo
registration as a patch against either global registry file or `registry.json`;
the generator owns global index updates.

---

## Errors

- Do not hide errors.
- Do not ignore TypeScript errors.
- Do not remove validations to make tests pass.
- User-visible errors must be clear.
- Technical errors must be handled where appropriate.

---

## Comments

By default, do not add comments.

Comments are allowed only when they explain a non-obvious **why**:

- documented workaround
- unusual technical decision
- external limitation
- important invariant

Names should explain the rest.
