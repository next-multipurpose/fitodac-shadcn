"use client"

import { useState } from "react"
import type { Country } from "react-phone-number-input"

import { InputPhone } from "@/registry/components/input-phone"
import {
	Field,
	FieldDescription,
	FieldLabel,
} from "@/registry/primitives/field"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/primitives/select"

const countries: Array<{
	code: Country
	name: string
	dialCode: string
	flag: string
}> = [
	{ code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
	{ code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
	{ code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
	{ code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
	{ code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
	{ code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
	{ code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
	{ code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
]

export default function InputPhoneInlineCountryDemo() {
	const [phone, setPhone] = useState("")
	const [countryCode, setCountryCode] = useState<Country>("US")

	const selectedCountry =
		countries.find((country) => country.code === countryCode) ?? countries[0]

	return (
		<Field className="w-full max-w-md">
			<FieldLabel htmlFor="inline-phone">Phone number</FieldLabel>
			<div className="flex gap-2">
				<Select
					value={countryCode}
					onValueChange={(value) => {
						setCountryCode(value as Country)
						setPhone("")
					}}
				>
					<SelectTrigger aria-label="Country calling code">
						<SelectValue>
							<span aria-hidden>{selectedCountry.flag}</span>
							<span>{selectedCountry.dialCode}</span>
						</SelectValue>
					</SelectTrigger>
					<SelectContent align="start">
						<SelectGroup>
							{countries.map((country) => (
								<SelectItem key={country.code} value={country.code}>
									<span aria-hidden>{country.flag}</span>
									<span className="flex-1">{country.name}</span>
									<span className="text-muted-foreground">
										{country.dialCode}
									</span>
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>

				<InputPhone
					id="inline-phone"
					name="phone"
					country={countryCode}
					international={false}
					value={phone}
					onChange={(value) => setPhone(value ?? "")}
					className="min-w-0 flex-1 [&>input]:rounded-l-md [&>select]:hidden"
					placeholder="(555) 123-4567"
				/>
			</div>
			<FieldDescription>
				Choose a calling code, then enter the local number.
			</FieldDescription>
		</Field>
	)
}
