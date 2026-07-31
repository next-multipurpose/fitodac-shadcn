import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function CheckboxCustomColorDemo() {
	const id = useId()

	return (
		<Field orientation="horizontal" className="w-auto">
			<Checkbox
				id={id}
				defaultChecked
				className="data-[state=checked]:border-indigo-500 data-[state=checked]:bg-indigo-500 dark:data-[state=checked]:border-indigo-500 dark:data-[state=checked]:bg-indigo-500"
			/>
			<FieldLabel htmlFor={id}>Blue checkbox</FieldLabel>
		</Field>
	)
}
