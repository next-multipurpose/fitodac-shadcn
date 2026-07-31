"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"

export default function InputHorizontalLabelDemo() {
	const id = useId()

	return (
		<Field orientation="horizontal" className="w-full max-w-xs">
			<FieldLabel htmlFor={id} className="w-24">
				Name
			</FieldLabel>
			<Input id={id} placeholder="John Doe" />
		</Field>
	)
}
