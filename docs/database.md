# Database — Supabase

> This document defines the base rules for working with Supabase.
> If a specific decision is not here, it must be in the active spec.

---

## 1. Role of Supabase

Supabase is the standard source for:

- database
- authentication
- storage, if applicable
- remote application data

Do not create parallel solutions if Supabase solves the case.

---

## 2. Local development

Development must use local Supabase with Docker.

Before modifying DB/Auth, inspect:

```txt
supabase/
```

If local Supabase is not working, document the blocker before touching related code.

---

## 3. Migrations

Rules:

- Do not edit old migrations unless explicitly instructed.
- Create a new migration for each schema change.
- Keep names clear and descriptive.
- Do not make manual DB changes that are not reflected in migrations.
- Do not mix unrelated DB changes in the same spec.

---

## 4. Auth

Supabase Auth is the standard authentication solution.

Rules:

- Do not create custom auth if Supabase Auth solves the case.
- Do not duplicate sensitive user data if it already exists in auth.
- Separate auth data and user profile data when appropriate.
- Verify permissions before exposing private data.

---

## 5. RLS and security

If a table contains user or business data, check whether it needs RLS.

Rules:

- Do not assume a table is public.
- Do not disable RLS to quickly solve errors.
- Document any new or modified policy.
- Do not expose data across users without an explicit rule.

---

## 6. Generated types

If the project uses generated Supabase types:

- Update them when the schema changes.
- Use them in queries, services, actions, or helpers.
- Do not replace them with `any`.

---

## 7. Seeds and test data

Seeds must support local development and tests.

Rules:

- Do not depend on hardcoded data in components.
- Do not treat local data as production data.
- Keep seeds simple and reproducible.

---

## 8. Verification

If the spec touches Supabase, verify according to project availability:

```bash
supabase status
supabase db reset
```

For local-only projects, `supabase migration list` may fail if the project is not linked. Only require it when the project is linked or the local CLI supports it.

Also review migration files directly:

```bash
ls supabase/migrations
```

Then run:

```bash
./init.sh
```

The spec must report:

```txt
supabase: passed / failed / not available
```
