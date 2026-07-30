# Architecture — What “good work” means

> This document defines the project's architecture quality standard.
> Reviewer agents evaluate code against this file.
> If something is not here and not in the active spec, it is not a requirement.

---

## Principles

### 1. Clear layers

The project must keep responsibilities separated:

- **UI**: visual components, layout, forms, and interface states.
- **Feature logic**: module-specific logic or use cases.
- **Data access**: Supabase calls, queries, mutations, and auth.
- **Shared code**: helpers, hooks, utils, and reusable components.

Do not mix everything into one large component.

Expected separation example:

```txt
components/     -> reusable UI
features/       -> feature-specific logic and components
lib/            -> clients, helpers, and shared configuration
supabase/       -> migrations, seed, types, and local configuration
```

The exact structure may vary by project, but responsibilities must remain separated.

### 1.1 Reuse and composition

- Route and page files own routing, authorization, data loading, and composition. They must not own reusable shells, navigation, cards, controls, or visible state patterns.
- Repeated or independently meaningful UI must be implemented as reusable components with clear responsibilities.
- Reuse an existing component, hook, helper, layout, service, action, or backend method before creating another implementation of the same responsibility.
- Similar screens must share their shell and navigation instead of copying markup into each page.
- Shared navigation must come from one catalog or configuration and may be filtered by permissions, feature flags, or route context.
- Reusable page layouts belong in a clearly differentiated layouts directory. Framework-specific route layout files should only compose those reusable layouts and route-specific providers or data.
- Backend operations must be separated from visual components and must not be duplicated across routes or features.
- Do not create components or methods that merely wrap a single expression without establishing a meaningful responsibility or reuse boundary.

Suggested frontend structure:

```txt
src/
  app/                 -> routes and composition
  components/
    ui/                -> visual primitives
    layouts/           -> reusable page shells and layouts
    shared/            -> cross-feature application components
  features/            -> feature-specific UI and logic
  lib/                 -> data access, backend operations, and helpers
```

The exact names may follow an already approved project convention, but layouts must remain clearly separated and the responsibility boundaries above are mandatory.

### 1.2 Human-approved architecture decisions

Agents must not make architecture decisions without explicit human approval. Approval is required before a spec is written when the task would:

- create, remove, move, or redefine a package, layer, structural directory, or ownership boundary
- decide whether code belongs in an app, package, shared layer, or feature
- introduce or replace a pattern for state, data access, backend operations, navigation, layouts, routing, authentication, or authorization
- introduce a dependency that shapes the architecture
- create a parallel solution where a related component, method, service, or pattern already exists

Local implementation details that follow an already approved architecture do not require a separate decision. If there is doubt, the Leader must ask the human before writing the spec.

Every spec must state whether an architecture decision is required. When required, it must record the approved decision and the constraints the implementer must follow.

---

### 2. Next.js / Vite according to the project

If the project uses **Next.js**:

- Respect whether it uses `app/` or `pages/`.
- Do not mix App Router and Pages Router without a concrete reason.
- Use Server Components by default when possible.
- Use `"use client"` only when the component needs state, effects, events, or browser APIs.
- Do not put heavy business logic inside visual components.

If the project uses **Vite**:

- Respect the existing structure inside `src/`.
- Keep views, components, hooks, services, and utils separated if the project already follows that convention.

---

### 3. Supabase as the standard backend

Supabase is the main source for:

- database
- authentication
- storage, if applicable
- remote application data

Rules:

- Do not create custom auth if Supabase Auth solves the case.
- Do not use hardcoded data if it should come from Supabase.
- Do not edit old migrations unless explicitly instructed.
- Create a new migration for schema changes.
- Keep queries and data access in clear places, not scattered across the entire UI.
- Update generated types if the project workflow requires it.

### 3.1 Shared auth boundary

`packages/auth` may contain only app-agnostic Supabase Auth client plumbing and
identity/session/account helper primitives. Apps own their routes, UI, account
table queries, roles, permissions, and authorization rules. Extract a helper
only after the same behavior is proven useful in more than one app.

---

### 4. Consistent UI

Tailwind CSS and shadcn/ui are the preferred visual base.

Rules:

- Use existing components before creating new ones.
- Use shadcn/ui before installing another UI library.
- Do not change global styles unless necessary.
- Keep Tailwind classes readable.
- Avoid unnecessary visual abstractions.
- Do not duplicate page shells, sidebars, navigation catalogs, page headers, or visible state patterns across screens.
- The UI must be usable, responsive, and consistent.

A screen that compiles but is confusing, broken, or hard to use is not finished.

---

### 5. Controlled dependencies

Use `pnpm` as the standard package manager.

Before adding a dependency:

1. Check whether the project already has a solution.
2. Check whether common libraries are enough:
   - `day.js` for dates
   - `numeral.js` for numbers
   - `swiper` for sliders/carousels

3. Justify the new dependency in the spec.

Do not add libraries for convenience if the problem can be solved with the current stack.

---

### 6. Small and verifiable changes

Each spec must be solved with the smallest correct change.

Avoid:

- large unrequested refactors
- unnecessary global changes
- architecture changes for small tasks
- touching unrelated files
- mixing several specs into one implementation

If a task requires an architecture change, it must be documented in the spec or in this file.

---

### 7. Production and deploy

The project must remain compatible with Vercel deploys.

Rules:

- Do not break `pnpm build`.
- Do not modify environment variables without documenting it.
- Do not depend on local configuration that cannot be reproduced.
- Do not assume local data is production data.
- Do not change Vercel configuration unless the spec asks for it.

---

## Expected data flow

Typical flow:

```txt
UI / Page
  -> feature logic / hooks / actions
  -> Supabase client / server client
  -> Supabase DB/Auth/Storage
```

The UI should not know unnecessary persistence details.

Supabase should not be chaotically coupled to every component if it can be centralized in helpers, actions, services, or feature functions.

---

## What NOT to do

- Do not implement outside the spec scope.
- Do not create new architecture without need.
- Do not make architecture decisions without prior human approval recorded in the spec.
- Do not duplicate existing logic.
- Do not copy reusable layout or navigation markup into route pages.
- Do not install dependencies without justification.
- Do not use another UI library if shadcn/ui is enough.
- Do not create custom auth if Supabase Auth is enough.
- Do not hide errors to make tests pass.
- Do not leave `console.log`, dead code, or TODOs without context.
- Do not approve a task that does not pass verification.
