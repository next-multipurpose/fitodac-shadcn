import { useId } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

export default function CheckboxRoundTodoDemo() {
	const id = useId()
	return (
		<Field orientation="horizontal" className="w-auto">
			<Checkbox className="rounded-full" defaultChecked id={id} />
			<FieldLabel
				className="peer-data-[state=checked]:line-through relative [--primary:var(--color-emerald-500)] peer-data-[state=checked]:text-muted-foreground after:absolute after:top-1/2 after:left-0 after:h-px after:w-full after:origin-bottom after:-translate-y-1/2 after:scale-x-0 after:bg-muted-foreground after:transition-transform after:ease-in-out peer-data-[state=checked]:after:origin-bottom peer-data-[state=checked]:after:scale-x-100"
				htmlFor={id}
			>
				Fancy todo item
			</FieldLabel>
		</Field>
	)
}
