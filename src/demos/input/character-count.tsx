"use client"

import { useId, useState, type ChangeEvent } from "react"

import { Input } from "@/registry/primitives/input"
import { Field, FieldLabel, FieldDescription } from "@/registry/primitives/field"

const maxLength = 12
const initialValue = ""

export default function InputCharacterCountDemo() {
	const [value, setValue] = useState(initialValue)
	const [characterCount, setCharacterCount] = useState(initialValue.length)

	const id = useId()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length <= maxLength) {
			setValue(e.target.value)
			setCharacterCount(e.target.value.length)
		}
	}

	return (
		<Field>
			<FieldLabel htmlFor={id}>Input with characters left</FieldLabel>

			<Input
				id={id}
				type="text"
				placeholder="Username"
				value={value}
				maxLength={maxLength}
				onChange={handleChange}
			/>

			<FieldDescription className="px-1 text-xs font-medium text-muted-foreground">
				<span className="tabular-nums">{maxLength - characterCount}</span>{" "}
				characters left
			</FieldDescription>
		</Field>
	)
}
