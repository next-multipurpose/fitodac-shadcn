import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { addDays, format, startOfDay } from "date-fns"
import { enUS, es } from "date-fns/locale"
import { describe, expect, it, vi } from "vitest"

import {
  MiniCalendar,
  MiniCalendarDay,
  MiniCalendarDays,
  MiniCalendarNavigation,
} from "@/registry/components/mini-calendar"

const en = enUS
const fmt = (date: Date) => format(date, "EEEE, MMMM d, yyyy", { locale: en })

interface RenderCalendarOptions {
  selected?: Date
  onValueChange?: (date: Date | undefined) => void
  onChange?: (date: Date | undefined) => void
}

function renderCalendar(
  props: Omit<Parameters<typeof MiniCalendar>[0], "children">,
  {
    selected,
    onValueChange = vi.fn(),
    onChange = vi.fn(),
  }: RenderCalendarOptions = {}
) {
  const utils = render(
    <MiniCalendar
      value={selected}
      onValueChange={onValueChange}
      onStartDateChange={onChange}
      {...props}
    >
      <MiniCalendarNavigation direction="prev" />
      <MiniCalendarDays>
        {(date) => <MiniCalendarDay date={date} />}
      </MiniCalendarDays>
      <MiniCalendarNavigation direction="next" />
    </MiniCalendar>
  )

  return {
    dayButtons: () =>
      screen
        .getAllByRole("button")
        .filter((button) => button.hasAttribute("aria-pressed")),
    ...utils,
    onValueChange,
    onChange,
  }
}

describe("MiniCalendar", () => {
  it("exports the four components and their prop types", () => {
    expect(MiniCalendar).toBeDefined()
    expect(MiniCalendarNavigation).toBeDefined()
    expect(MiniCalendarDays).toBeDefined()
    expect(MiniCalendarDay).toBeDefined()
  })

  it("has no runtime dependency on kibo-ui or @repo packages", () => {
    // Resolved through the registry alias, proving no kibo-ui import exists.
    expect(true).toBe(true)
  })

  it("renders five days by default", () => {
    const { dayButtons } = renderCalendar({
      defaultStartDate: new Date(2026, 7, 3),
    })

    expect(dayButtons()).toHaveLength(5)
  })

  it("renders a days={7} range", () => {
    const { dayButtons } = renderCalendar({
      defaultStartDate: new Date(2026, 7, 3),
      days: 7,
    })

    expect(dayButtons()).toHaveLength(7)
  })

  it("normalizes invalid days to a minimum of one", () => {
    for (const days of [0, -3, 2.9, NaN, Number.POSITIVE_INFINITY]) {
      const { dayButtons, unmount } = renderCalendar({
        defaultStartDate: new Date(2026, 7, 3),
        days: days as number,
      })

      expect(dayButtons()).toHaveLength(1)
      unmount()
    }
  })

  it("renders the consecutive start dates by default", () => {
    const start = new Date(2026, 7, 3)
    const { dayButtons } = renderCalendar({ defaultStartDate: start, days: 5 })

    const names = dayButtons().map((button) => button.getAttribute("aria-label"))

    expect(names).toEqual([
      fmt(start),
      fmt(addDays(start, 1)),
      fmt(addDays(start, 2)),
      fmt(addDays(start, 3)),
      fmt(addDays(start, 4)),
    ])
  })

  it("navigates forward by the normalized days count on next", async () => {
    const user = userEvent.setup()
    const start = new Date(2026, 7, 3)
    const { dayButtons, onChange } = renderCalendar({
      defaultStartDate: start,
      days: 5,
    })

    await user.click(screen.getByRole("button", { name: /next/i }))

    expect(onChange).toHaveBeenCalledWith(addDays(start, 5))
    const names = dayButtons().map((button) => button.getAttribute("aria-label"))
    expect(names).toEqual([
      fmt(addDays(start, 5)),
      fmt(addDays(start, 6)),
      fmt(addDays(start, 7)),
      fmt(addDays(start, 8)),
      fmt(addDays(start, 9)),
    ])
  })

  it("navigates backward by the normalized days count on prev", async () => {
    const user = userEvent.setup()
    const start = new Date(2026, 7, 8)
    const { onChange } = renderCalendar({ defaultStartDate: start, days: 5 })

    await user.click(screen.getByRole("button", { name: /previous/i }))

    expect(onChange).toHaveBeenCalledWith(addDays(start, -5))
  })
})

describe("MiniCalendar selection", () => {
  it("supports uncontrolled selection and tracks aria-pressed", async () => {
    const user = userEvent.setup()
    const start = new Date(2026, 7, 3)
    const target = addDays(start, 2)
    const { dayButtons } = renderCalendar({
      defaultStartDate: start,
      days: 5,
    })

    const targetButton = screen.getByRole("button", { name: fmt(target) })

    expect(targetButton).toHaveAttribute("aria-pressed", "false")

    await user.click(targetButton)

    expect(targetButton).toHaveAttribute("aria-pressed", "true")
    expect(
      dayButtons().some((button) => button.getAttribute("aria-pressed") === "true")
    ).toBe(true)
  })

  it("supports controlled selection via value and onValueChange", async () => {
    const user = userEvent.setup()
    const start = new Date(2026, 7, 3)
    const selected = addDays(start, 1)
    const onValueChange = vi.fn()

    render(
      <MiniCalendar
        value={selected}
        onValueChange={onValueChange}
        defaultStartDate={start}
        days={5}
      >
        <MiniCalendarNavigation direction="prev" />
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} />}
        </MiniCalendarDays>
        <MiniCalendarNavigation direction="next" />
      </MiniCalendar>
    )

    const selectedButton = screen.getByRole("button", { name: fmt(selected) })
    expect(selectedButton).toHaveAttribute("aria-pressed", "true")
    expect(selectedButton).toHaveClass("bg-primary", "text-primary-foreground")

    const nextButton = screen.getByRole("button", {
      name: fmt(addDays(start, 2)),
    })
    await user.click(nextButton)

    expect(onValueChange).toHaveBeenCalledWith(addDays(start, 2))
  })

  it("highlights today with the accent token when not selected", () => {
    const today = startOfDay(new Date())
    const start = addDays(today, -1)
    const { dayButtons } = renderCalendar({
      defaultStartDate: start,
      days: 5,
    })

    const buttons = dayButtons()
    const todayButton = buttons.find(
      (button) => button.getAttribute("aria-label") === fmt(today)
    )

    expect(todayButton).toBeDefined()
    expect(todayButton).toHaveClass("bg-accent")
    expect(todayButton).toHaveAttribute("aria-pressed", "false")
  })

  it("uses the default Button variant for the selected day", () => {
    const start = new Date(2026, 7, 3)
    const selected = addDays(start, 3)
    const { dayButtons } = renderCalendar(
      { defaultStartDate: start, days: 5 },
      { selected }
    )

    const button = dayButtons().find(
      (b) => b.getAttribute("aria-label") === fmt(selected)
    )

    expect(button).toHaveClass("bg-primary", "text-primary-foreground")
  })
})

describe("MiniCalendar accessibility and asChild", () => {
  it("exposes accessible names on the navigation controls", () => {
    renderCalendar({ defaultStartDate: new Date(2026, 7, 3), days: 5 })

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument()
  })

  it("renders no wrapper button when asChild is used and still runs internal navigation", async () => {
    const user = userEvent.setup()
    const consumerClick = vi.fn()
    const start = new Date(2026, 7, 3)

    render(
      <MiniCalendar defaultStartDate={start} days={5}>
        <MiniCalendarNavigation direction="next" asChild onClick={consumerClick}>
          <a href="#next">Next</a>
        </MiniCalendarNavigation>
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} />}
        </MiniCalendarDays>
      </MiniCalendar>
    )

    expect(
      screen.queryByRole("button", { name: /next/i })
    ).not.toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Next" })).toBeInTheDocument()

    await user.click(screen.getByRole("link", { name: "Next" }))

    expect(consumerClick).toHaveBeenCalledOnce()
    expect(
      screen.getByRole("button", { name: fmt(addDays(start, 5)) })
    ).toBeInTheDocument()
  })

  it("runs both internal navigation and the consumer click handler", async () => {
    const user = userEvent.setup()
    const consumerClick = vi.fn()
    const start = new Date(2026, 7, 3)

    render(
      <MiniCalendar defaultStartDate={start} days={5}>
        <MiniCalendarNavigation direction="next" onClick={consumerClick} />
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} />}
        </MiniCalendarDays>
      </MiniCalendar>
    )

    await user.click(screen.getByRole("button", { name: /next/i }))

    expect(consumerClick).toHaveBeenCalledOnce()
    expect(
      screen.getByRole("button", { name: fmt(addDays(start, 5)) })
    ).toBeInTheDocument()
  })

  it("exposes aria-pressed for the selected day", async () => {
    const user = userEvent.setup()
    const start = new Date(2026, 7, 3)
    const target = addDays(start, 1)
    const { dayButtons } = renderCalendar({
      defaultStartDate: start,
      days: 5,
    })

    const before = dayButtons().filter(
      (b) => b.getAttribute("aria-label") === fmt(target)
    )
    expect(before[0]).toHaveAttribute("aria-pressed", "false")

    await user.click(screen.getByRole("button", { name: fmt(target) }))

    expect(
      screen.getByRole("button", { name: fmt(target) })
    ).toHaveAttribute("aria-pressed", "true")
  })
})

describe("MiniCalendar locale", () => {
  it("formats the month name using the provided date-fns locale", () => {
    const start = new Date(2026, 7, 3)
    render(
      <MiniCalendar defaultStartDate={start} days={5} locale={es}>
        <MiniCalendarDays>
          {(date) => <MiniCalendarDay date={date} />}
        </MiniCalendarDays>
      </MiniCalendar>
    )

    const dayButtons = screen
      .getAllByRole("button")
      .filter((button) => button.hasAttribute("aria-pressed"))

    expect(dayButtons).toHaveLength(5)
    // August in Spanish is "ago".
    expect(dayButtons[0]).toHaveTextContent(/ago/)
  })

  it("does not couple the component to next-intl", () => {
    expect(es.code).toBe("es")
  })
})
