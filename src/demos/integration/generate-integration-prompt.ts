import type { DemoIntegrationBundle } from "./types"

function formatList(values: string[]) {
  return values.length > 0
    ? values.map((value) => `- ${value}`).join("\n")
    : "- None"
}

export function generateIntegrationPrompt(bundle: DemoIntegrationBundle) {
  const files = bundle.files
    .map(
      (file) => `--- ${file.suggestedTargetPath} ---\n${file.code.trimEnd()}`
    )
    .join("\n\n")

  return `Integrate the following fitodac/shadcn component into the current project.

Use the supplied implementation as the source of truth. This is a local source-code integration task, not a request to recreate, generate a lookalike, or aesthetically reinterpret the component.

Component: ${bundle.component}
Example: ${bundle.demo}

Integration rules:
1. Inspect the target project's existing frontend structure before editing.
2. Inspect its \`components.json\` or equivalent shadcn aliases and configuration when present.
3. Check whether an equivalent component or required registry dependency already exists.
4. Reuse compatible existing files instead of creating duplicate parallel components.
5. Copy the supplied component source into the target project's appropriate local component location.
6. Copy supplied registry dependencies only when missing or when the existing local version is incompatible.
7. Install only missing npm/package dependencies listed below.
8. Adapt import paths and aliases to the target project's existing conventions.
9. Preserve the component's public API, variants, behavior, accessibility, and semantic Tailwind classes.
10. Do not redesign or aesthetically reinterpret the component.
11. Do not replace semantic theme tokens with hardcoded colors, radii, or project-specific values.
12. Preserve semantic theme tokens and let the copied component inherit the target project's existing theme variables and tokens.
13. Do not install \`@fitodac/shadcn\` as a runtime dependency.
14. Use the supplied example usage as the reference for reproducing the selected example when requested.
15. Keep changes limited to what is required for this integration.
16. Run the target project's available lint, typecheck, test, and build verification after integration.
17. If the target project is incompatible with the required React, Tailwind, or shadcn assumptions, report the blocker instead of silently rewriting its architecture.

Package dependencies:
${formatList(bundle.dependencies)}

Registry dependencies:
${formatList(bundle.registryDependencies)}

Files to integrate:

${files}

Example usage:

${bundle.usageCode.trimEnd()}

After integration:
- Run all available lint, typecheck, test, and build checks.
- Summarize the files changed and dependencies installed.
- Report any unresolved compatibility blockers.`
}
