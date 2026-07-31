import cobaltRegistry from "@/registry/themes/cobalt/registry.json"

import { THEME_CHANGE_EVENT, type Theme } from "@/lib/theme"

export type UITheme = "cobalt" | "default"

export const DEFAULT_UI_THEME: UITheme = "cobalt"
export const UI_THEME_STORAGE_KEY = "ui-theme"

type CSSVariables = Record<string, string>
type CobaltThemeDefinition = {
  theme: CSSVariables
  light: CSSVariables
  dark: CSSVariables
}

function isCSSVariables(value: unknown): value is CSSVariables {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((entry) => typeof entry === "string")
  )
}

function getCobaltThemeDefinition(): CobaltThemeDefinition {
  const item = cobaltRegistry.items.find(
    (candidate) =>
      candidate.name === "cobalt" && candidate.type === "registry:theme"
  )

  if (
    !item ||
    !isCSSVariables(item.cssVars?.theme) ||
    !isCSSVariables(item.cssVars?.light) ||
    !isCSSVariables(item.cssVars?.dark)
  ) {
    throw new Error(
      "Cobalt registry:theme item must define cssVars.theme, cssVars.light, and cssVars.dark"
    )
  }

  return item.cssVars
}

export const COBALT_THEME = getCobaltThemeDefinition()
const cobaltPropertyNames = new Set(
  Object.keys({
    ...COBALT_THEME.theme,
    ...COBALT_THEME.light,
    ...COBALT_THEME.dark,
  }).map((key) => `--${key}`)
)

let currentUITheme: UITheme = DEFAULT_UI_THEME

export function isUITheme(value: unknown): value is UITheme {
  return value === "cobalt" || value === "default"
}

export function resolveUITheme(storedTheme: string | null): UITheme {
  return isUITheme(storedTheme) ? storedTheme : DEFAULT_UI_THEME
}

export function getStoredUITheme(): UITheme | null {
  try {
    const storedTheme = localStorage.getItem(UI_THEME_STORAGE_KEY)

    return isUITheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

export function getInitialUITheme(): UITheme {
  return resolveUITheme(getStoredUITheme())
}

export function persistUITheme(theme: UITheme): void {
  try {
    localStorage.setItem(UI_THEME_STORAGE_KEY, theme)
  } catch {
    // The document theme remains applied when storage is unavailable.
  }
}

function removeCobaltOverrides() {
  for (const propertyName of cobaltPropertyNames) {
    document.documentElement.style.removeProperty(propertyName)
  }
}

function applyCobalt(colorMode: Theme) {
  removeCobaltOverrides()
  const variables = { ...COBALT_THEME.theme, ...COBALT_THEME[colorMode] }

  for (const [key, value] of Object.entries(variables)) {
    document.documentElement.style.setProperty(`--${key}`, value)
  }
}

export function applyUITheme(theme: UITheme, colorMode: Theme): void {
  currentUITheme = theme

  if (theme === "default") {
    removeCobaltOverrides()
    return
  }

  applyCobalt(colorMode)
}

export function reapplyUITheme(colorMode: Theme): void {
  applyUITheme(currentUITheme, colorMode)
}

export function initializeUIThemeSynchronization(): () => void {
  const initialColorMode: Theme = document.documentElement.classList.contains(
    "dark"
  )
    ? "dark"
    : "light"

  applyUITheme(getInitialUITheme(), initialColorMode)

  function synchronize(event: Event) {
    const colorMode = (event as CustomEvent<Theme>).detail

    if (colorMode === "light" || colorMode === "dark") {
      reapplyUITheme(colorMode)
    }
  }

  document.addEventListener(THEME_CHANGE_EVENT, synchronize)

  return () => document.removeEventListener(THEME_CHANGE_EVENT, synchronize)
}

const serializedCobaltTheme = JSON.stringify(COBALT_THEME)
const serializedCobaltPropertyNames = JSON.stringify([...cobaltPropertyNames])

export const UI_THEME_BOOTSTRAP_SCRIPT = `(() => {
  const root = document.documentElement;
  const cobalt = ${serializedCobaltTheme};
  const cobaltPropertyNames = ${serializedCobaltPropertyNames};
  let storedTheme = null;
  try {
    const value = localStorage.getItem("${UI_THEME_STORAGE_KEY}");
    storedTheme = value === "cobalt" || value === "default" ? value : null;
  } catch {}
  const uiTheme = storedTheme ?? "${DEFAULT_UI_THEME}";
  for (const propertyName of cobaltPropertyNames) {
    root.style.removeProperty(propertyName);
  }
  if (uiTheme === "default") return;
  const colorMode = root.classList.contains("dark") ? "dark" : "light";
  const variables = { ...cobalt.theme, ...cobalt[colorMode] };
  for (const [key, value] of Object.entries(variables)) {
    root.style.setProperty(\`--\${key}\`, value);
  }
})();`
