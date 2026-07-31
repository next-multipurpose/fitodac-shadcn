import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel, FieldGroup } from "@/registry/primitives/field"

export default function CheckboxVerticalGroupDemo() {
	const id = useId()
	return (
		<FieldGroup className="gap-3">
			<Field orientation="horizontal" className="w-auto">
				<Checkbox id={`${id}-a`} />
				<FieldLabel htmlFor={`${id}-a`}>React</FieldLabel>
			</Field>
			<Field orientation="horizontal" className="w-auto">
				<Checkbox id={`${id}-b`} />
				<FieldLabel htmlFor={`${id}-b`}>Next.js</FieldLabel>
			</Field>
			<Field orientation="horizontal" className="w-auto">
				<Checkbox id={`${id}-c`} />
				<FieldLabel htmlFor={`${id}-c`}>Astro</FieldLabel>
			</Field>
		</FieldGroup>
	)
}
