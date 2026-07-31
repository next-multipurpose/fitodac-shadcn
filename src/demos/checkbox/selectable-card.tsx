import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function CheckboxSelectableCardDemo() {
	const id = useId()
	return (
		<Field>
			<div className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-primary/50">
				<Checkbox
					aria-describedby={`${id}-description`}
					className="order-1 after:absolute after:inset-0"
					id={id}
				/>
				<div className="grid grow gap-2">
					<FieldLabel htmlFor={id}>
						Label{" "}
						<span className="text-xs leading-[inherit] font-normal text-muted-foreground">
							(Sublabel)
						</span>
					</FieldLabel>
					<p className="text-xs text-muted-foreground" id={`${id}-description`}>
						A short description goes here.
					</p>
				</div>
			</div>
		</Field>
	)
}
