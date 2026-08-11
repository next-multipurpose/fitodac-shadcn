"use client"

import {
	AnimatePresence,
	LayoutGroup,
	motion,
	useReducedMotion,
} from "motion/react"
import { Check, Copy, Plus, X } from "lucide-react"
import {
	useCallback,
	useId,
	useMemo,
	useRef,
	useState,
	type ReactNode,
} from "react"
import { SPRING_LAYOUT, SPRING_PRESS } from "@/lib/ease"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/registry/primitives/checkbox"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/registry/primitives/popover"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/primitives/select"
import { Switch } from "@/registry/primitives/switch"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/registry/primitives/tooltip"

// ─── Types ─────────────────────────────────────────────────────────────────

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

export type TimeRange = { id: string; start: string; end: string }
export type DayAvailability = { enabled: boolean; ranges: TimeRange[] }
export type WeekAvailability = Record<DayKey, DayAvailability>
export type TimeOption = { value: string; label: string }

export const WEEKDAYS: { key: DayKey; label: string }[] = [
	{ key: "mon", label: "Monday" },
	{ key: "tue", label: "Tuesday" },
	{ key: "wed", label: "Wednesday" },
	{ key: "thu", label: "Thursday" },
	{ key: "fri", label: "Friday" },
	{ key: "sat", label: "Saturday" },
	{ key: "sun", label: "Sunday" },
]

export const toMinutes = (v: string) => {
	const [h, m] = v.split(":").map(Number)
	return h * 60 + m
}

export const toValue = (mins: number) => {
	const clamped = Math.max(0, Math.min(24 * 60 - 1, mins))
	const h = Math.floor(clamped / 60)
	const m = clamped % 60
	return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`
}

const label12 = (v: string) => {
	const [h, m] = v.split(":").map(Number)
	const ap = h < 12 ? "AM" : "PM"
	const h12 = h % 12 === 0 ? 12 : h % 12
	return `${h12}:${String(m).padStart(2, "0")} ${ap}`
}

function buildOptions(step: number): TimeOption[] {
	const out: TimeOption[] = []
	for (let m = 0; m < 24 * 60; m += step) {
		const value = toValue(m)
		out.push({ value, label: label12(value) })
	}
	return out
}

export function defaultWeek(): WeekAvailability {
	const workday = (day: DayKey): DayAvailability => ({
		enabled: true,
		ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
	})
	const off = (day: DayKey): DayAvailability => ({
		enabled: false,
		ranges: [{ id: `${day}-0`, start: "09:00", end: "17:00" }],
	})
	return {
		mon: workday("mon"),
		tue: workday("tue"),
		wed: workday("wed"),
		thu: workday("thu"),
		fri: workday("fri"),
		sat: off("sat"),
		sun: off("sun"),
	}
}

// ─── IconButton ──────────────────────────────────────────────────────────────

interface IconButtonProps {
	onClick?: () => void
	label: string
	disabled?: boolean
	expanded?: boolean
	reduce: boolean
	children: ReactNode
	className?: string
	[key: string]: unknown
}

function IconButton({
	onClick,
	label,
	disabled,
	expanded,
	reduce,
	children,
	className,
	...rest
}: IconButtonProps) {
	return (
		<motion.button
			{...rest}
			type="button"
			aria-label={label}
			aria-expanded={expanded}
			onClick={onClick}
			disabled={disabled}
			whileTap={reduce || disabled ? undefined : { scale: 0.86 }}
			transition={SPRING_PRESS}
			className={cn(
				"inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40",
				className
			)}
		>
			{children}
		</motion.button>
	)
}

// ─── Tooltip ─�────────────────────────────────────────────────────────────────

type TooltipSide = "top" | "right" | "bottom" | "left"

interface TooltipProps {
	content: ReactNode
	children: React.ReactElement
	side?: TooltipSide
	className?: string
}

function A11yTooltip({
	content,
	children,
	side = "top",
	className,
}: TooltipProps) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				className={cn(
					"border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground",
					className
				)}
			>
				{content}
			</TooltipContent>
		</Tooltip>
	)
}

// ─── TimeSelect ─�─────────────────────────────────────────────────────────────

interface TimeSelectProps {
	value: string
	onChange: (v: string) => void
	options: TimeOption[]
}

function TimeSelect({ value, onChange, options }: TimeSelectProps) {
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

// ─── DayRow ──────────────────────────────────────────────────────────────────

interface DayRowProps {
	day: DayKey
	label: string
	state: DayAvailability
	options: TimeOption[]
	reduce: boolean
	depth: number
	onChange: (next: DayAvailability) => void
	onCopy: (targets: DayKey[]) => void
}

function DayRow({
	day,
	label,
	state,
	options,
	reduce,
	depth,
	onChange,
	onCopy,
}: DayRowProps) {
	const idRef = useRef(0)
	const nextId = () => `${day}-n${idRef.current++}`

	const setEnabled = (enabled: boolean) => {
		if (enabled && state.ranges.length === 0) {
			onChange({
				enabled,
				ranges: [{ id: nextId(), start: "09:00", end: "17:00" }],
			})
		} else {
			onChange({ ...state, enabled })
		}
	}

	const updateRange = (id: string, patch: Partial<TimeRange>) => {
		onChange({
			...state,
			ranges: state.ranges.map((r) => (r.id === id ? { ...r, ...patch } : r)),
		})
	}

	const addRange = () => {
		const last = state.ranges[state.ranges.length - 1]
		const start = last ? Math.min(toMinutes(last.end) + 60, 24 * 60 - 60) : 540
		onChange({
			enabled: true,
			ranges: [
				...state.ranges,
				{ id: nextId(), start: toValue(start), end: toValue(start + 60) },
			],
		})
	}

	const removeRange = (id: string) => {
		const ranges = state.ranges.filter((r) => r.id !== id)
		onChange({ enabled: ranges.length > 0, ranges })
	}

	const actions = (
		<>
			<A11yTooltip content="Add time">
				<IconButton
					label={`Add time range to ${label}`}
					reduce={reduce}
					onClick={addRange}
				>
					<Plus className="h-4 w-4" />
				</IconButton>
			</A11yTooltip>
			<CopyMenu fromLabel={label} reduce={reduce} onApply={onCopy} />
		</>
	)

	return (
		<motion.div
			layout={reduce ? false : "position"}
			transition={SPRING_LAYOUT}
			style={{ zIndex: depth }}
			className="relative flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:gap-4"
		>
			<div className="flex items-center justify-between sm:w-36 sm:shrink-0 sm:justify-start sm:pt-1">
				<div className="flex items-center gap-2.5">
					<Switch
						checked={state.enabled}
						onCheckedChange={setEnabled}
						aria-label={`Toggle ${label} availability`}
						className="scale-90"
					/>
					<span className="text-sm font-medium text-foreground">{label}</span>
				</div>
				<div className="flex items-center gap-1 sm:hidden">{actions}</div>
			</div>

			<div className="flex min-w-0 flex-1 flex-col gap-2">
				<AnimatePresence initial={false} mode="popLayout">
					{state.enabled ? (
						state.ranges.map((r, i) => (
							<motion.div
								key={r.id}
								layout={reduce ? false : "position"}
								style={{ zIndex: state.ranges.length - i }}
								initial={
									reduce
										? { opacity: 0 }
										: { opacity: 0, y: -6, filter: "blur(4px)" }
								}
								animate={
									reduce
										? { opacity: 1 }
										: { opacity: 1, y: 0, filter: "blur(0px)" }
								}
								exit={
									reduce
										? { opacity: 0 }
										: { opacity: 0, y: -4, filter: "blur(4px)" }
								}
								transition={SPRING_LAYOUT}
								className="relative flex items-center gap-2"
							>
								<div className="min-w-0 flex-1 sm:max-w-[132px]">
									<TimeSelect
										value={r.start}
										options={options}
										onChange={(v) => updateRange(r.id, { start: v })}
									/>
								</div>
								<span className="text-muted-foreground">–</span>
								<div className="min-w-0 flex-1 sm:max-w-[132px]">
									<TimeSelect
										value={r.end}
										options={options}
										onChange={(v) => updateRange(r.id, { end: v })}
									/>
								</div>
								<A11yTooltip content="Remove">
									<IconButton
										label="Remove time range"
										reduce={reduce}
										onClick={() => removeRange(r.id)}
									>
										<X className="h-4 w-4" />
									</IconButton>
								</A11yTooltip>
							</motion.div>
						))
					) : (
						<motion.span
							key="unavailable"
							layout={reduce ? false : "position"}
							initial={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
							animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
							exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
							transition={SPRING_LAYOUT}
							className="py-1 text-sm text-muted-foreground sm:py-2"
						>
							Unavailable
						</motion.span>
					)}
				</AnimatePresence>
			</div>

			<div className="hidden shrink-0 items-center gap-1 pt-0.5 sm:flex">
				{actions}
			</div>
		</motion.div>
	)
}

// ─── CopyMenu ─────────────────────────────────────────────────────────────────

interface CopyMenuProps {
	fromLabel: string
	reduce: boolean
	onApply: (targets: DayKey[]) => void
}

function CopyMenu({ fromLabel, reduce, onApply }: CopyMenuProps) {
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
			<A11yTooltip content="Copy times">
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
			</A11yTooltip>

			<PopoverContent align="end" className="w-52 p-2">
				<p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
					Copy times to
				</p>
				<div className="flex flex-col">
					{others.map((d) => (
						<label
							key={d.key}
							className="flex w-full flex-row-reverse items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
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

// ─── AvailabilityScheduler ─────────────────────────────────────────────────────

export interface AvailabilitySchedulerProps {
	value?: WeekAvailability
	defaultValue?: WeekAvailability
	onChange?: (value: WeekAvailability) => void
	step?: number
	className?: string
}

export default function AvailabilityScheduler({
	value,
	defaultValue,
	onChange,
	step = 30,
	className,
}: AvailabilitySchedulerProps) {
	const reduce = useReducedMotion() ?? false
	const groupId = useId()
	const options = useMemo(() => buildOptions(step), [step])
	const idRef = useRef(0)

	const [internal, setInternal] = useState<WeekAvailability>(
		() => defaultValue ?? defaultWeek()
	)
	const controlled = value !== undefined
	const week = controlled ? value : internal

	const commit = useCallback(
		(next: WeekAvailability) => {
			if (!controlled) setInternal(next)
			onChange?.(next)
		},
		[controlled, onChange]
	)

	const setDay = useCallback(
		(day: DayKey, next: DayAvailability) => {
			commit({ ...week, [day]: next })
		},
		[commit, week]
	)

	const copyDay = useCallback(
		(from: DayKey, targets: DayKey[]) => {
			const source = week[from]
			const next = { ...week }
			for (const t of targets) {
				next[t] = {
					enabled: source.enabled,
					ranges: source.ranges.map((r) => ({
						...r,
						id: `${t}-c${idRef.current++}`,
					})),
				}
			}
			commit(next)
		},
		[commit, week]
	)

	return (
		<LayoutGroup id={groupId}>
			<div className={cn("w-full max-w-xl divide-y divide-border", className)}>
				{WEEKDAYS.map(({ key, label }, i) => (
					<DayRow
						key={key}
						day={key}
						label={label}
						state={week[key]}
						options={options}
						reduce={reduce}
						depth={WEEKDAYS.length - i}
						onChange={(next) => setDay(key, next)}
						onCopy={(targets) => copyDay(key, targets)}
					/>
				))}
			</div>
		</LayoutGroup>
	)
}
