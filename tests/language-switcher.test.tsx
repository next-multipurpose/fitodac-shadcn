import { NextIntlClientProvider } from "next-intl"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale } from "@/i18n/config"
import englishMessages from "../messages/en.json"
import spanishMessages from "../messages/es.json"

const refresh = vi.fn()

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh }),
}))

function renderSwitcher(locale: Locale) {
  const messages = locale === "en" ? englishMessages : spanishMessages

  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageSwitcher locale={locale} />
    </NextIntlClientProvider>
  )
}

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    document.cookie = "NEXT_LOCALE=; Max-Age=0; Path=/"
  })

  it("renders the current locale with an accessible language label", () => {
    renderSwitcher("en")

    expect(
      screen.getByRole("button", { name: "Select language" })
    ).toHaveTextContent("EN")
  })

  it("switches from English to Spanish through the locale cookie and refresh path", async () => {
    const user = userEvent.setup()
    const view = renderSwitcher("en")

    await user.click(screen.getByRole("button", { name: "Select language" }))
    await user.click(screen.getByRole("menuitemradio", { name: "Español" }))

    expect(document.cookie).toContain("NEXT_LOCALE=es")
    expect(refresh).toHaveBeenCalledOnce()

    view.unmount()
    renderSwitcher("es")
    expect(
      screen.getByRole("button", { name: "Seleccionar idioma" })
    ).toHaveTextContent("ES")
  })

  it("switches from Spanish to English", async () => {
    const user = userEvent.setup()
    renderSwitcher("es")

    await user.click(
      screen.getByRole("button", { name: "Seleccionar idioma" })
    )
    await user.click(screen.getByRole("menuitemradio", { name: "English" }))

    expect(document.cookie).toContain("NEXT_LOCALE=en")
    expect(refresh).toHaveBeenCalledOnce()
  })

  it("rejects unsupported locale values", async () => {
    const user = userEvent.setup()
    renderSwitcher("en")

    await user.click(screen.getByRole("button", { name: "Select language" }))

    expect(screen.getAllByRole("menuitemradio")).toHaveLength(2)
    expect(screen.queryByRole("menuitemradio", { name: "Français" })).toBeNull()
  })

  it("supports keyboard selection", async () => {
    const user = userEvent.setup()
    renderSwitcher("en")

    screen.getByRole("button", { name: "Select language" }).focus()
    await user.keyboard("{Enter}{ArrowDown}{Enter}")

    expect(document.cookie).toContain("NEXT_LOCALE=es")
    expect(refresh).toHaveBeenCalledOnce()
  })
})
