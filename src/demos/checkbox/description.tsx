import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function CheckboxDescriptionDemo() {
	const id = useId()
	return (
		<Field>
			<div className="flex items-start gap-2">
				<Checkbox aria-describedby={`${id}-description`} id={id} />
				<div className="grid grow gap-2">
					<FieldLabel htmlFor={id}>
						Label{" "}
						<span className="text-xs leading-[inherit] font-normal text-muted-foreground">
							(Sublabel)
						</span>
					</FieldLabel>
					<p className="text-xs text-muted-foreground" id={`${id}-description`}>
						You can use this checkbox with a label and a description.
					</p>
				</div>
			</div>
		</Field>
	)
}
