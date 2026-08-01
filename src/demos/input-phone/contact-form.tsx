"use client"

import { useState } from "react"
import type { Country } from "react-phone-number-input"

import { Button } from "@/registry/primitives/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/registry/primitives/card"
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/primitives/select"
import { InputPhone } from "@/registry/components/input-phone"

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

export default function InputPhoneContactFormDemo() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		countryCode: "US" as Country,
	})

	const selectedCountry =
		countries.find((country) => country.code === formData.countryCode) ??
		countries[0]

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		alert(JSON.stringify(formData, null, 2))
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Let&apos;s stay in touch</CardTitle>
				<CardDescription>
					Share your contact details and we&apos;ll get back to you soon.
				</CardDescription>
			</CardHeader>
			<form onSubmit={handleSubmit}>
				<CardContent>
					<FieldGroup className="gap-5">
						<Field>
							<FieldLabel htmlFor="name">Full name</FieldLabel>
							<Input
								id="name"
								name="name"
								autoComplete="name"
								placeholder="John Doe"
								value={formData.name}
								onChange={(event) =>
									setFormData((current) => ({
										...current,
										name: event.target.value,
									}))
								}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="email">Email</FieldLabel>
							<Input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								placeholder="john@example.com"
								value={formData.email}
								onChange={(event) =>
									setFormData((current) => ({
										...current,
										email: event.target.value,
									}))
								}
							/>
						</Field>

						<Field>
							<FieldLabel htmlFor="phone">Phone number</FieldLabel>
							<div className="flex gap-2">
								<Select
									value={formData.countryCode}
									onValueChange={(value) =>
										setFormData((current) => ({
											...current,
											countryCode: value as Country,
											phone: "",
										}))
									}
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
									id="phone"
									name="phone"
									country={formData.countryCode}
									international={false}
									value={formData.phone}
									onChange={(phone) =>
										setFormData((current) => ({
											...current,
											phone: phone ?? "",
										}))
									}
									className="min-w-0 flex-1 [&>input]:rounded-l-md [&>select]:hidden"
									placeholder="(555) 123-4567"
								/>
							</div>
							<FieldDescription>
								We&apos;ll only use this number to contact you.
							</FieldDescription>
						</Field>
					</FieldGroup>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="w-full">
						Send contact details
					</Button>
				</CardFooter>
			</form>
		</Card>
	)
}
