import { useState } from "react"
import {
	DateSelector,
	type DateSelectorValue,
} from "@/registry/components/date-selector"
import { format } from "date-fns"
import { Card, CardContent } from "@/registry/primitives/card"

export default function CalendarDateSelectorDebugDemo() {
	const [value, setValue] = useState<DateSelectorValue | undefined>()

	return (
		<div className="flex w-full flex-col items-center gap-5">
			<Card className="p-0">
				<CardContent className="p-3">
					<DateSelector
						value={value}
						onChange={setValue}
						label="Due date"
						inputHint="Try: 2025, Q4, 05/10/2025"
					/>
				</CardContent>
			</Card>

			{value ? (
				<pre className="w-full overflow-auto rounded-md bg-muted p-4 font-mono text-xs md:w-[500px]">
					{JSON.stringify(
						value,
						(key, val) => {
							if (val instanceof Date) {
								return format(val, "MM/dd/yyyy")
							}
							return val
						},
						2
					)}
				</pre>
			) : (
				<div className="text-sm text-muted-foreground">
					No value selected. Select a date to see the debug information.
				</div>
			)}
		</div>
	)
}
