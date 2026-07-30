# .ai/rules.md — Project rules for agents

> Stable project rules.
> This file must stay short. Task-specific details belong in the active spec.

---

## 1. Standard stack

This project normally uses:

- React
- Next.js or Vite
- TypeScript
- Local Supabase with Docker
- Tailwind CSS
- shadcn/ui
- pnpm
- GitHub
- Vercel deploy

Allowed common libraries:

- `day.js` for dates
- `numeral.js` for numeric formats
- `swiper` for sliders/carousels

Before adding a new dependency, check whether one of these already solves the problem.

---

## 2. Package manager

Use `pnpm` as the standard package manager.

Do not use `npm install`, `yarn`, or `bun` unless the project explicitly says so.

Common commands:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run only scripts that exist in `package.json`.

---

## 3. Working principles

- Always work from a spec in `.ai/specs/`.
- Implement only the defined scope.
- Do not expand the task by yourself.
- Do not commit.
- Do not add dependencies without justification.
- Do not refactor outside the affected area.
- Do not change architecture if the spec does not ask for it.
- Do not make an architecture decision that the human has not approved explicitly.
- Do not modify critical configuration without a clear need.

The goal is the smallest correct, verifiable, and maintainable change.

---

## 4. Frontend architecture

General rules:

- Respect the project's existing structure.
- Inspect and reuse existing components, hooks, helpers, layouts, and backend methods before creating new ones.
- Keep business logic outside visual components when possible.
- Avoid components that are too large.
- Avoid duplicate logic.
- Use clear and consistent names.
- Pages and route files must focus on routing, authorization, data loading, and composition. Do not implement reusable visual structure directly in a page.
- Repeated or independently meaningful UI such as buttons, cards, form controls, headers, navigation, sidebars, visible states, and shells must be extracted into reusable components.
- Reusable page layouts must live in a clearly differentiated layouts directory. Framework route layout files may compose those layouts but must not duplicate them.
- Shared navigation must have one source of truth. Pages must not define competing copies of global or section navigation.
- Backend logic must be separated by responsibility and reused when the same behavior already exists. Do not create parallel methods for the same operation.
- Do not extract meaningless wrappers only to reduce JSX. Every abstraction must have a clear responsibility or reuse boundary.

If there is an existing code convention, follow it.

Before implementing UI or backend behavior, search the affected area for an existing equivalent. If a parallel implementation is necessary, the active spec must contain the human-approved reason.

---

## 5. Next.js / Vite

For Next.js:

- Respect whether the project uses `app/` or `pages/`.
- Do not mix App Router and Pages Router without reason.
- Use `"use client"` only when necessary.
- Do not turn components into client components if they can remain server components.

For Vite:

- Respect the existing structure inside `src/`.
- Keep views, components, hooks, services, and utils separated if the project already does it.

---

## 6. UI, Tailwind, and shadcn

Tailwind CSS and shadcn/ui are the preferred visual base.

Rules:

- Use existing components before creating new ones.
- Use shadcn/ui before installing another component library.
- Do not change global styles unless the spec asks for it.
- Do not introduce another UI library without approval.
- Keep Tailwind classes readable.
- Avoid unnecessary visual abstractions.

The UI must be usable, not just compile.

---

## 7. UI Review

If the spec modifies UI, layout, responsive behavior, visual navigation, forms, or visible components:

- It must go through `ui-reviewer` before being approved.
- Review the app in a browser when possible.
- Use Playwright if the project has it configured.
- Verify desktop and mobile when applicable.
- Do not approve UI only because it compiles.
- If visual review could not be done, document the reason in the spec.

Playwright is the preferred standard tool for:

- automated navigation
- screenshots
- responsive review
- basic visual checks
- visual regression if the project supports it

---

## 8. Supabase

Supabase is the standard solution for:

- Database
- Auth
- Storage, if applicable
- Auxiliary APIs, if applicable

Rules:

- Use local Supabase with Docker for development.
- Inspect `supabase/` before touching DB/Auth.
- Do not edit old migrations unless explicitly instructed.
- Create a new migration for schema changes.
- Do not create custom auth if Supabase Auth solves the case.
- Do not use hardcoded data if it should come from Supabase.
- If generated types change, update them according to the project workflow.

---

## 9. GitHub and deploy

GitHub is the standard remote repository.
Vercel is the standard deploy target.

Rules:

- Do not commit.
- Do not change Vercel configuration unless the spec asks for it.
- Do not modify environment variables without documenting it.
- Do not break production build compatibility.

Before closing a task, `pnpm build` must pass if the script exists.

---

## 10. Testing and verification

Before closing a spec, run:

```bash
./init.sh
```

If `init.sh` does not exist or does not cover everything, use the available scripts:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If the project uses Playwright and the spec touches UI, also run the available visual/E2E script, for example:

```bash
pnpm test:e2e
pnpm test:ui
```

Run only scripts that exist in `package.json`.

Do not declare a spec done if verification fails.

If a command does not exist, mark it as `not available` in the report.

---

## 11. Error handling

- Do not hide errors.
- Do not remove validations to make tests pass.
- Do not ignore TypeScript errors.
- Do not use fragile workarounds without documenting them.
- If the problem exceeds the scope, mark the spec as `CHANGES`.

---

## 12. Report

When finished, update the spec with a short report:

- What you did
- Which files you modified
- What you verified
- What remains pending, if applicable
- If there was visual review, what was reviewed

The report must be short.
The diff, tests, build, and visual review are the main evidence.

---

## Hybrid mode

The runner supports a manual implementer only when `runtime.json` defines:

```json
"implementer": {
  "tool": "trae-solo",
  "mode": "manual"
}
```

In that case:

- No CLI is run for implementation.
- A prompt is generated in `.ai/run/prompts/`.
- The spec is left in `WAITING_IMPLEMENTER`.
- Trae Solo must modify files and leave `Status: TECH_REVIEW`.
- Then the runner continues automatic QA.
