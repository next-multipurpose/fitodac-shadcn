"use client"

import { useId } from "react"

import { Input } from "@/registry/primitives/input"
import { Field, FieldLabel, FieldError } from "@/registry/primitives/field"

export default function InputErrorStateDemo() {
	const id = useId()

	return (
		<Field>
			<FieldLabel htmlFor={id}>Email</FieldLabel>

			<Input
				id={id}
				type="email"
				placeholder="name@example.com"
				aria-invalid="true"
			/>

			<FieldError className="px-1 text-xs font-medium">
				Please enter a valid email address.
			</FieldError>
		</Field>
	)
}
