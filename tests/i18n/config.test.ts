import { describe, expect, it } from "vitest"

import {
  defaultLocale,
  localeCookieName,
  locales,
  resolveLocale,
} from "@/i18n/config"

describe("locale configuration", () => {
  it("uses English for new visitors and invalid cookie values", () => {
    expect(resolveLocale(undefined)).toBe("en")
    expect(resolveLocale("fr")).toBe("en")
    expect(defaultLocale).toBe("en")
  })

  it("accepts each supported persisted locale", () => {
    expect(locales).toEqual(["en", "es"])
    expect(resolveLocale("en")).toBe("en")
    expect(resolveLocale("es")).toBe("es")
    expect(localeCookieName).toBe("NEXT_LOCALE")
  })
})
