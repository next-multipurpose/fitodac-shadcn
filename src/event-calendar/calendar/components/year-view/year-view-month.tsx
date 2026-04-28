import { useMemo } from "react"
import {
	format,
	isSameDay,
	parseISO,
	getDaysInMonth,
	startOfMonth,
} from "date-fns"

import { useCalendar } from "../../contexts/calendar-context"
import { navigateTo } from "../../lib/navigation"

import { YearViewDayCell } from "./year-view-day-cell"

import type { IEvent } from "../../interfaces"
import type { TNavBar } from "../../types"

interface IProps {
	month: Date
	events: IEvent[]
	navBar?: TNavBar
}

export function YearViewMonth({ month, events, navBar = {} }: IProps) {
	const { setSelectedDate } = useCalendar()

	const monthName = format(month, "MMMM")

	const daysInMonth = useMemo(() => {
		const totalDays = getDaysInMonth(month)
		const firstDay = startOfMonth(month).getDay()

		const days = Array.from({ length: totalDays }, (_, i) => i + 1)
		const blanks = Array(firstDay).fill(null)

		return [...blanks, ...days]
	}, [month])

	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

	const handleClick = () => {
		setSelectedDate(new Date(month.getFullYear(), month.getMonth(), 1))
		navigateTo(navBar.month)
	}

	return (
		<div className="flex flex-col">
			<button
				type="button"
				onClick={handleClick}
				className="w-full rounded-t-lg border px-3 py-2 text-sm font-semibold hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
			>
				{monthName}
			</button>

			<div className="flex-1 space-y-2 rounded-b-lg border border-t-0 p-3">
				<div className="grid grid-cols-7 gap-x-0.5 text-center">
					{weekDays.map((day, index) => (
						<div
							key={index}
							className="text-xs font-medium text-muted-foreground"
						>
							{day}
						</div>
					))}
				</div>

				<div className="grid grid-cols-7 gap-x-0.5 gap-y-2">
					{daysInMonth.map((day, index) => {
						if (day === null)
							return <div key={`blank-${index}`} className="h-10" />

						const date = new Date(month.getFullYear(), month.getMonth(), day)
						const dayEvents = events.filter(
							(event) =>
								isSameDay(parseISO(event.startDate), date) ||
								isSameDay(parseISO(event.endDate), date)
						)

						return (
							<YearViewDayCell
								key={`day-${day}`}
								day={day}
								date={date}
								events={dayEvents}
								navBar={navBar}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
