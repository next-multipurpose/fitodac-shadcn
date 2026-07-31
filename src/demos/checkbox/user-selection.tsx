import { Avatar, AvatarFallback, AvatarImage } from "@/registry/primitives/avatar"
import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldGroup, FieldLabel, FieldTitle } from "@/registry/primitives/field"

export default function CheckboxUserSelectionDemo() {
	return (
		<FieldGroup className="w-full max-w-xs">
			<FieldLabel className="relative p-0">
				<Field orientation="horizontal">
					<FieldTitle className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
								alt="Emma Wilson"
							/>
							<AvatarFallback>EW</AvatarFallback>
						</Avatar>
						<div className="flex flex-col items-start">
							<span className="text-sm font-semibold">Emma Wilson</span>
							<span className="text-xs text-muted-foreground">@emmawilson</span>
						</div>
					</FieldTitle>
					<Checkbox defaultChecked />
				</Field>
			</FieldLabel>
		</FieldGroup>
	)
}
