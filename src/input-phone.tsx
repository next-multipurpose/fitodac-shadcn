import * as React from "react"
import PhoneInput from "react-phone-number-input"

import { cn } from "./utils"

type PhoneInputValue = React.ComponentProps<typeof PhoneInput>["value"]
type PhoneInputOnChange = React.ComponentProps<typeof PhoneInput>["onChange"]

type InputPhoneProps = Omit<
	React.ComponentProps<typeof PhoneInput>,
	| "onChange"
	| "value"
	| "inputComponent"
	| "countrySelectComponent"
	| "className"
> & {
	value?: string
	onChange: (value: string | undefined) => void
	className?: string
}

type CountrySelectOption = {
	value?: string
	label: string
}

type CountrySelectProps = {
	name?: string
	value?: string
	onChange: (value: string | undefined) => void
	onFocus?: () => void
	onBlur?: () => void
	options: CountrySelectOption[]
	disabled?: boolean
	readOnly?: boolean
	tabIndex?: number
	className?: string
}

const CountrySelect = React.forwardRef<HTMLSelectElement, CountrySelectProps>(
	(
		{
			name,
			value,
			onChange,
			onFocus,
			onBlur,
			options,
			disabled,
			readOnly,
			tabIndex,
			className,
		},
		ref
	) => {
		return (
			<select
				ref={ref}
				name={name}
				tabIndex={tabIndex}
				value={value ?? ""}
				onChange={(event) => onChange(event.target.value || undefined)}
				disabled={disabled || readOnly}
				onFocus={onFocus}
				onBlur={onBlur}
				className={cn(
					"h-9 shrink-0 rounded-l-md border border-r-0 border-input bg-transparent px-2 text-sm shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
					"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
					"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
					className
				)}
			>
				{options.map((option) => (
					<option key={option.value ?? "INTL"} value={option.value ?? ""}>
						{option.label}
					</option>
				))}
			</select>
		)
	}
)

CountrySelect.displayName = "CountrySelect"

const PhoneInputField = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
	return (
		<input
			ref={ref}
			data-slot="input-phone"
			className={cn(
				"h-9 w-full min-w-0 rounded-md rounded-l-none border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
				"focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
				"aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
				className
			)}
			{...props}
		/>
	)
})

PhoneInputField.displayName = "PhoneInputField"

function InputPhone({
	className,
	international = true,
	defaultCountry = "RU",
	value,
	onChange,
	...props
}: InputPhoneProps) {
	return (
		<PhoneInput
			{...props}
			international={international}
			defaultCountry={defaultCountry}
			value={value as unknown as PhoneInputValue}
			onChange={onChange as unknown as PhoneInputOnChange}
			className={cn("flex", className)}
			countrySelectComponent={CountrySelect as unknown as React.ElementType}
			inputComponent={PhoneInputField}
		/>
	)
}

export { InputPhone }
