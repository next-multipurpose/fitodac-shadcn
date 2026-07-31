export const THEME_STORAGE_KEY = "theme"

export type Theme = "light" | "dark"

export function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark"
}

export function resolveTheme(
  storedTheme: string | null,
  systemDark: boolean
): Theme {
  return isTheme(storedTheme) ? storedTheme : systemDark ? "dark" : "light"
}

export function getStoredTheme(): Theme | null {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)

    return isTheme(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

export function getEffectiveTheme(): Theme {
  return resolveTheme(
    getStoredTheme(),
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark")
  document.documentElement.style.colorScheme = theme
}

export function toggleTheme(currentTheme: Theme): Theme {
  const nextTheme = currentTheme === "dark" ? "light" : "dark"

  applyTheme(nextTheme)

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  } catch {
    // The document theme still changes when storage is unavailable.
  }

  return nextTheme
}

export const THEME_BOOTSTRAP_SCRIPT = `(() => {
  const root = document.documentElement;
  let storedTheme = null;
  try {
    const value = localStorage.getItem("${THEME_STORAGE_KEY}");
    storedTheme = value === "light" || value === "dark" ? value : null;
  } catch {}
  const theme = storedTheme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
})();`
