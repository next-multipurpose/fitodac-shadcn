"use client"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/primitives/select"
import type { TimeOption } from "./types"

/**
 * Time field: the project shadcn Select, with the option list capped so the
 * panel measures a small height and scrolls instead of unfolding all
 * options at once.
 */
export function TimeSelect({
	value,
	onChange,
	options,
}: {
	value: string
	onChange: (v: string) => void
	options: TimeOption[]
}) {
	return (
		<div className="w-full">
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="tabular-nums">
					<SelectValue className="whitespace-nowrap" />
				</SelectTrigger>
				<SelectContent>
					<div className="max-h-56 overflow-y-auto overscroll-contain">
						{options.map((o) => (
							<SelectItem
								key={o.value}
								value={o.value}
								className="tabular-nums"
							>
								{o.label}
							</SelectItem>
						))}
					</div>
				</SelectContent>
			</Select>
		</div>
	)
}
