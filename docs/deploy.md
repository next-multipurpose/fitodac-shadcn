# Deploy — Vercel

> This document defines the base rules for keeping the project deploy-ready.
> The goal is to avoid breaking production from local code.

---

## 1. Standard target

The standard deploy target is Vercel.

GitHub is the standard remote repository.

Do not modify deploy configuration unless the spec asks for it.

---

## 2. Build

Before approving an important spec, the build must pass if the script exists:

```bash
pnpm build
```

If the build fails, the spec cannot be approved.

---

## 3. Environment variables

Rules:

- Do not modify `.env` without documenting it.
- Do not commit secrets.
- Do not invent variable names if a convention already exists.
- If a spec requires a new variable, document it in the report.
- Differentiate local, preview, and production environments when applicable.

---

## 4. Remote Supabase

Do not assume local Supabase and production have the same state.

If the task touches DB/Auth:

- verify migrations
- avoid manual changes outside the project workflow
- document production impact if any
- do not break compatibility with existing data

---

## 5. Preview deploys

If the project uses Vercel previews:

- Code must work in preview without special manual configuration.
- Do not depend on local URLs.
- Do not hardcode domains.
- Use environment variables for public or private URLs.

---

## 6. Assets and UI

Before approving visual changes:

- verify that assets are versioned correctly
- avoid local absolute paths
- review new images or fonts
- verify responsive behavior when applicable

---

## 7. Things not to do

- Do not change Vercel configuration without need.
- Do not add dependencies that break the build.
- Do not depend on unversioned local files.
- Do not hardcode secrets, private URLs, or tokens.
- Do not approve if `pnpm build` fails.

---

## 8. Minimum verification

Before closing a spec with deploy impact:

```bash
pnpm build
./init.sh
```

The spec must report:

```txt
build: passed / failed / not available
deploy impact: none / documented
```
