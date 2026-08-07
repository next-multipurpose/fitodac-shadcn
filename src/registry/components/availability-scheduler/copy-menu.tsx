"use client"

import { AnimatePresence, motion } from "motion/react"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/registry/primitives/popover"
import { Checkbox } from "@/registry/primitives/checkbox"
import { SPRING_PRESS } from "@/lib/ease"
import { cn } from "@/lib/utils"
import { Tooltip } from "./tooltip"
import { IconButton } from "./icon-button"
import { type DayKey, WEEKDAYS } from "./types"

// Copy this day's hours to other days: a popover with a day picker.
export function CopyMenu({
	fromLabel,
	reduce,
	onApply,
}: {
	fromLabel: string
	reduce: boolean
	onApply: (targets: DayKey[]) => void
}) {
	const [open, setOpen] = useState(false)
	const [copied, setCopied] = useState(false)
	const [picked, setPicked] = useState<Set<DayKey>>(new Set())
	const others = WEEKDAYS.filter((d) => d.label !== fromLabel)

	const toggle = (k: DayKey) =>
		setPicked((prev) => {
			const next = new Set(prev)
			if (next.has(k)) next.delete(k)
			else next.add(k)
			return next
		})

	const apply = (targets: DayKey[]) => {
		if (!targets.length) return
		onApply(targets)
		setOpen(false)
		setPicked(new Set())
		setCopied(true)
		window.setTimeout(() => setCopied(false), 1200)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<Tooltip content="Copy times">
				<PopoverTrigger asChild>
					<IconButton
						label={`Copy ${fromLabel} hours to other days`}
						reduce={reduce}
						expanded={open}
					>
						<AnimatePresence mode="popLayout" initial={false}>
							{copied ? (
								<motion.span
									key="done"
									initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
									transition={SPRING_PRESS}
									className="text-foreground"
								>
									<Check className="h-4 w-4" />
								</motion.span>
							) : (
								<motion.span
									key="copy"
									initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
									transition={SPRING_PRESS}
								>
									<Copy className="h-4 w-4" />
								</motion.span>
							)}
						</AnimatePresence>
					</IconButton>
				</PopoverTrigger>
			</Tooltip>

			<PopoverContent align="end" className="w-52 p-2">
				<p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
					Copy times to
				</p>
				<div className="flex flex-col">
					{others.map((d) => (
						<label
							key={d.key}
							className={cn(
								"flex w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
							)}
						>
							<Checkbox
								checked={picked.has(d.key)}
								onCheckedChange={() => toggle(d.key)}
								className="size-4 rounded-[5px] border data-[state=unchecked]:border-border-strong"
							/>
							<span className="text-foreground">{d.label}</span>
						</label>
					))}
				</div>
				<div className="mt-1 flex items-center gap-2 border-t border-border px-1 pt-2">
					<button
						type="button"
						onClick={() => apply(others.map((d) => d.key))}
						className="flex-1 rounded-lg px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:bg-muted"
					>
						Every day
					</button>
					<button
						type="button"
						onClick={() => apply([...picked])}
						disabled={picked.size === 0}
						className="flex-1 rounded-lg bg-primary px-2 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
					>
						Apply
					</button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
