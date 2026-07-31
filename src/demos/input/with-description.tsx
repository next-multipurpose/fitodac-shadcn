"use client"

import { useId } from "react"

import { Input } from "@/registry/primitives/input"
import { Field, FieldLabel, FieldDescription } from "@/registry/primitives/field"

export default function InputWithDescriptionDemo() {
	const id = useId()

	return (
		<Field>
			<FieldLabel htmlFor={id}>
				Username <span className="text-destructive">*</span>
			</FieldLabel>

			<Input id={id} type="text" placeholder="Enter your username" />

			<FieldDescription className="px-1 text-xs font-medium">
				Choose a unique username for your account.
			</FieldDescription>
		</Field>
	)
}
