"use client"

import { Field, FieldLabel } from "@/registry/primitives/field"
import { Input } from "@/registry/primitives/input"

export default function InputMinimalDemo() {
	return (
		<Field className="w-full max-w-xs">
			<FieldLabel htmlFor="minimal-input">Invisible Input</FieldLabel>
			<Input
				id="minimal-input"
				placeholder="Type here..."
				className="border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
			/>
		</Field>
	)
}
