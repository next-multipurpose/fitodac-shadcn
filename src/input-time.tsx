"use client"

import * as React from "react"
import { ClockIcon } from "lucide-react"
import { cn } from "./utils"
import {
	type InputTimePickerFormat,
	type Period,
	type TimePickerType,
	createTimeDate,
	formatTimeValue,
	getArrowByType,
	getDateByType,
	getPeriodFromDate,
	parseTimeValue,
	setDateByType,
	togglePeriod,
} from "./lib/time-picker-utils"
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "./input-group"
import type { TimeValue } from "react-aria-components"

interface TimeSegmentInputProps extends Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	"value" | "onChange"
> {
	picker: TimePickerType
	date: Date
	onSegmentChange: (
		picker: TimePickerType,
		value: string,
		meta: { source: "arrow" | "digit"; step?: 1 | -1 }
	) => void
	onRightFocus?: () => void
	onLeftFocus?: () => void
}

function isTimeValue(value: string | TimeValue | undefined): value is TimeValue {
	return typeof value === "object" && value !== null && "hour" in value
}

function getInitialDate(
	value: string | TimeValue | undefined,
	format: InputTimePickerFormat = "24"
) {
	if (isTimeValue(value)) {
		const date = createTimeDate()
		date.setHours(value.hour, value.minute, value.second ?? 0, 0)
		return date
	}

	return parseTimeValue(value, format) ?? createTimeDate()
}

const TimeSegmentInput = React.forwardRef<
	HTMLInputElement,
	TimeSegmentInputProps
>(
	(
		{
			className,
			type = "tel",
			id,
			name,
			date,
			onSegmentChange,
			onKeyDown,
			picker,
			onLeftFocus,
			onRightFocus,
			...props
		},
		ref
	) => {
		const [flag, setFlag] = React.useState(false)
		const [prevIntKey, setPrevIntKey] = React.useState("0")

		React.useEffect(() => {
			if (!flag) return

			const timer = window.setTimeout(() => {
				setFlag(false)
			}, 2000)

			return () => window.clearTimeout(timer)
		}, [flag])

		const calculatedValue = React.useMemo(
			() => getDateByType(date, picker),
			[date, picker]
		)

		const calculateNewValue = (key: string) => {
			if (
				picker === "12hours" &&
				flag &&
				calculatedValue.slice(1, 2) === "1" &&
				prevIntKey === "0"
			) {
				return `0${key}`
			}

			return !flag ? `0${key}` : `${calculatedValue.slice(1, 2)}${key}`
		}

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Tab") return

			e.preventDefault()

			if (e.key === "ArrowRight") onRightFocus?.()
			if (e.key === "ArrowLeft") onLeftFocus?.()

			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				const step = e.key === "ArrowUp" ? 1 : -1
				const newValue = getArrowByType(calculatedValue, step, picker)

				if (flag) setFlag(false)
				onSegmentChange(picker, newValue, { source: "arrow", step })
			}

			if (e.key >= "0" && e.key <= "9") {
				if (picker === "12hours") setPrevIntKey(e.key)

				const newValue = calculateNewValue(e.key)
				if (flag) onRightFocus?.()

				setFlag((prev) => !prev)
				onSegmentChange(picker, newValue, { source: "digit" })
			}
		}

		return (
			<InputGroupInput
				ref={ref}
				id={id ?? picker}
				name={name ?? picker}
				className={cn(
					"h-full w-7 min-w-0 flex-none [appearance:textfield] px-0! text-center text-base tabular-nums caret-transparent last:mr-1 focus:bg-accent/50 focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
					className
				)}
				value={calculatedValue}
				onChange={(e) => {
					e.preventDefault()
				}}
				type={type}
				inputMode="decimal"
				onKeyDown={(e) => {
					onKeyDown?.(e)
					handleKeyDown(e)
				}}
				{...props}
			/>
		)
	}
)

TimeSegmentInput.displayName = "TimeSegmentInput"

interface TimePeriodSelectProps {
	id?: string
	period: Period
	onPeriodChange: (period: Period) => void
	disabled?: boolean
	onRightFocus?: () => void
	onLeftFocus?: () => void
}

const TimePeriodButton = React.forwardRef<
	HTMLButtonElement,
	TimePeriodSelectProps
>(
	(
		{ id, period, onPeriodChange, disabled, onLeftFocus, onRightFocus },
		ref
	) => {
		const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
			if (e.key === "Tab") return

			if (e.key === "ArrowRight") onRightFocus?.()
			if (e.key === "ArrowLeft") onLeftFocus?.()

			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				e.preventDefault()
				onPeriodChange(togglePeriod(period))
			}
		}

		const handleClick = () => {
			onPeriodChange(togglePeriod(period))
		}

		return (
			<button
				ref={ref}
				id={id}
				type="button"
				data-slot="input-group-control"
				disabled={disabled}
				aria-label="Toggle AM/PM"
				className={cn(
					"h-full min-w-9 flex-none border-none px-1 font-mono text-xs leading-9 transition-colors outline-none focus:bg-accent/50 focus:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
				)}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				{period}
			</button>
		)
	}
)

TimePeriodButton.displayName = "TimePeriodButton"

export interface InputTimePickerProps extends Omit<
	React.HTMLAttributes<HTMLDivElement>,
	"defaultValue" | "onChange"
> {
	name?: string
	format?: InputTimePickerFormat
	value?: string | TimeValue
	defaultValue?: string
	onValueChange?: (value: string) => void
	showSeconds?: boolean
	disabled?: boolean
	clockIcon?: boolean
}

const InputTime = React.forwardRef<HTMLInputElement, InputTimePickerProps>(
	(
		{
			className,
			name,
			format = "24",
			value,
			defaultValue,
			onValueChange,
			showSeconds = false,
			disabled = false,
			clockIcon = false,
			...props
		},
		ref
	) => {
		const isControlled = value !== undefined
		const [internalDate, setInternalDate] = React.useState(() =>
			getInitialDate(defaultValue, format)
		)

		const currentDate = React.useMemo(() => {
			if (!isControlled) return internalDate
			return getInitialDate(value, format)
		}, [format, internalDate, isControlled, value])

		const period = React.useMemo(
			() => getPeriodFromDate(currentDate),
			[currentDate]
		)

		const hourRef = React.useRef<HTMLInputElement>(null)
		const minuteRef = React.useRef<HTMLInputElement>(null)
		const secondRef = React.useRef<HTMLInputElement>(null)
		const periodRef = React.useRef<HTMLButtonElement>(null)
		const reactId = React.useId()
		const baseId = props.id ?? reactId
		const formattedValue = React.useMemo(
			() => formatTimeValue(currentDate, format, showSeconds),
			[currentDate, format, showSeconds]
		)

		const updateDate = (nextDate: Date) => {
			if (!isControlled) {
				setInternalDate(nextDate)
			}

			onValueChange?.(formatTimeValue(nextDate, format, showSeconds))
		}

		const handleSegmentChange = (
			picker: TimePickerType,
			segmentValue: string,
			meta: { source: "arrow" | "digit"; step?: 1 | -1 }
		) => {
			const nextDate = new Date(currentDate)

			if (picker === "12hours") {
				let nextPeriod = period
				const currentDisplayValue = getDateByType(currentDate, "12hours")
				const shouldTogglePeriod =
					meta.source === "arrow" &&
					((meta.step === 1 &&
						currentDisplayValue === "11" &&
						segmentValue === "12") ||
						(meta.step === -1 &&
							currentDisplayValue === "12" &&
							segmentValue === "11"))

				if (shouldTogglePeriod) {
					nextPeriod = togglePeriod(period)
				}

				updateDate(setDateByType(nextDate, segmentValue, picker, nextPeriod))
				return
			}

			updateDate(setDateByType(nextDate, segmentValue, picker, period))
		}

		const handlePeriodChange = (nextPeriod: Period) => {
			const nextDate = new Date(currentDate)
			const hours = getDateByType(currentDate, "12hours")
			updateDate(setDateByType(nextDate, hours, "12hours", nextPeriod))
		}

		return (
			<div className={cn("w-fit", className)} {...props}>
				<input
					type="hidden"
					name={name}
					value={formattedValue}
					disabled={disabled || !name}
					readOnly
				/>

				<InputGroup className="w-fit overflow-hidden">
					{clockIcon && (
						<InputGroupAddon align="inline-end">
							<InputGroupText>
								<ClockIcon className="size-4" />
							</InputGroupText>
						</InputGroupAddon>
					)}
					<TimeSegmentInput
						ref={(node) => {
							hourRef.current = node
							if (typeof ref === "function") {
								ref(node)
							} else if (ref) {
								ref.current = node
							}
						}}
						id={`${baseId}-hours`}
						picker={format === "12" ? "12hours" : "hours"}
						date={currentDate}
						onSegmentChange={handleSegmentChange}
						disabled={disabled}
						className="ml-1 w-7"
						aria-label="Hours"
						onRightFocus={() => minuteRef.current?.focus()}
					/>
					<span
						aria-hidden="true"
						className="flex h-full flex-none items-center px-0.5 text-sm font-medium text-muted-foreground"
					>
						:
					</span>
					<TimeSegmentInput
						ref={minuteRef}
						id={`${baseId}-minutes`}
						picker="minutes"
						date={currentDate}
						onSegmentChange={handleSegmentChange}
						disabled={disabled}
						aria-label="Minutes"
						onLeftFocus={() => hourRef.current?.focus()}
						onRightFocus={() =>
							showSeconds
								? secondRef.current?.focus()
								: periodRef.current?.focus()
						}
					/>
					{showSeconds && (
						<>
							<span
								aria-hidden="true"
								className="flex h-full flex-none items-center px-0.5 text-sm font-medium text-muted-foreground"
							>
								:
							</span>
							<TimeSegmentInput
								ref={secondRef}
								id={`${baseId}-seconds`}
								picker="seconds"
								date={currentDate}
								onSegmentChange={handleSegmentChange}
								disabled={disabled}
								aria-label="Seconds"
								onLeftFocus={() => minuteRef.current?.focus()}
								onRightFocus={() => periodRef.current?.focus()}
							/>
						</>
					)}
					{format === "12" && (
						<TimePeriodButton
							ref={periodRef}
							id={`${baseId}-period`}
							period={period}
							onPeriodChange={handlePeriodChange}
							disabled={disabled}
							onLeftFocus={() =>
								showSeconds
									? secondRef.current?.focus()
									: minuteRef.current?.focus()
							}
						/>
					)}
				</InputGroup>
			</div>
		)
	}
)

InputTime.displayName = "InputTimePicker"

export { InputTime }
