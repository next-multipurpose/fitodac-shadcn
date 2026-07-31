import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function CheckboxTermsDemo() {
	const id = useId()

	return (
		<Field orientation="horizontal" className="w-auto">
			<Checkbox id={id} />
			<FieldLabel htmlFor={id}>
				I agree to the{" "}
				<a
					className="underline"
					href="/terms"
				>
					terms of service
				</a>
			</FieldLabel>
		</Field>
	)
}
