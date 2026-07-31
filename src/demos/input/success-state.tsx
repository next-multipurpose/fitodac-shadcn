"use client"

import { useId } from "react"

import { Input } from "@/registry/primitives/input"
import { Field, FieldLabel, FieldDescription } from "@/registry/primitives/field"
import { CircleCheckIcon } from "lucide-react"

export default function InputSuccessStateDemo() {
	const id = useId()

	return (
		<Field>
			<FieldLabel htmlFor={id}>Username</FieldLabel>

			<Input
				id={id}
				type="text"
				placeholder="haydenbleasel"
				className="border-green-600 focus-visible:border-green-600 focus-visible:ring-green-600/50"
			/>

			<FieldDescription className="flex items-center gap-2 text-xs font-medium text-green-600 dark:text-green-400">
				<CircleCheckIcon className="size-4" />
				<span>Username is available</span>
			</FieldDescription>
		</Field>
	)
}
