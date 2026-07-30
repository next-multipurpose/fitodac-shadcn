# Verification — How to prove the work works

> Golden rule: **the agent does not say “it works”; it proves it**.
> Every spec ends with executable evidence, not claims.

---

## Verification levels

### Level 1 — Base verification

Required before closing any spec:

```bash
./init.sh
```

`./init.sh` must finish without errors.

If it fails, the spec cannot be left in `REVIEW` or `DONE`.

---

### Level 2 — Project scripts

If `init.sh` does not cover everything, run the available scripts in `package.json`.

Typical priority:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Run only existing commands.

Expected report:

```txt
lint: passed / failed / not available
typecheck: passed / failed / not available
test: passed / failed / not available
build: passed / failed / not available
```

---

### Level 3 — Supabase

If the spec touches database, auth, storage, migrations, or queries:

Verify according to project availability:

```bash
supabase status
supabase db reset
```

Only run `supabase migration list` when the project is linked or the CLI supports local-only listing.

Also inspect migration/schema files directly:

```bash
ls supabase/migrations
```

Also review:

- new migrations were created correctly
- types were updated if applicable
- local Supabase is running
- auth is not broken
- data is not hardcoded

If Supabase is not available locally, document the blocker.

---

### Level 4 — UI / Browser

If the spec touches UI, layout, forms, responsive behavior, or visual navigation:

1. Start the app with `pnpm ai:dev:start` when useful.
2. Open the affected screen.
3. Verify the main flow.
4. Check visible browser errors.
5. Review desktop and mobile when applicable.

Possible scripts:

```bash
pnpm ai:dev:start
pnpm ai:dev:status
pnpm ai:dev:stop
pnpm test:e2e
pnpm test:ui
pnpm playwright test
```

Use Playwright if it is configured.

If there is no Playwright setup, run a manual review and document it.

---

### Level 5 — Smoke test

Before closing an important spec, run a minimal real flow.

Examples:

```txt
login -> dashboard
create record -> see it listed
edit record -> see persisted change
invalid form -> see error
```

The smoke test must prove real behavior, not just compilation.

---

## Anti-patterns

Do not:

- Say “it works” without evidence.
- Approve with `./init.sh` failing.
- Approve with TypeScript errors.
- Ignore unrelated broken tests without documenting them.
- Delete tests to make the suite pass.
- Test only that a component renders without validating behavior.
- Approve UI only because it compiles.
- Change old migrations to fix a new problem.
- Write dev-server logs to `/tmp`; use `.ai/run/logs/`.
- Use hardcoded data when it should come from Supabase.

---

## Final verification before closing

Before leaving a spec in `REVIEW`:

```bash
./init.sh
```

Everything must be green.

The spec report must also include:

```md
## Verification

- init.sh: passed / failed
- lint: passed / failed / not available
- typecheck: passed / failed / not available
- test: passed / failed / not available
- build: passed / failed / not available
- supabase: passed / failed / not available
- ui/playwright: passed / failed / not available / not applicable
```

If something fails, the spec must be left in `CHANGES` or documented as blocked.
