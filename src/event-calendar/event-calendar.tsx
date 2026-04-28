"use client"

import { CalendarProvider } from "./calendar/contexts/calendar-context"
import { ClientContainer as CalendarClientContainer } from "./calendar/components/client-container"
import { CALENDAR_ITEMS_MOCK, USERS_MOCK } from "./calendar/mocks"

import type { CalendarLinkComponent } from "./calendar/contexts/calendar-context"
import type { IEvent, IUser } from "./calendar/interfaces"
import type { TCalendarView, TNavBar } from "./calendar/types"

export interface EventCalendarProps {
	view: TCalendarView
	users?: IUser[]
	events?: IEvent[]
	navBar?: TNavBar
	linkComponent?: CalendarLinkComponent
}

export function EventCalendar({
	view,
	users = USERS_MOCK,
	events = CALENDAR_ITEMS_MOCK,
	navBar = {},
	linkComponent,
}: EventCalendarProps) {
	return (
		<CalendarProvider
			users={users}
			events={events}
			linkComponent={linkComponent}
		>
			<CalendarClientContainer {...{ view, navBar }} />
		</CalendarProvider>
	)
}

export const ClientContainer = EventCalendar
