import { SmartphoneIcon, MonitorIcon, CloudIcon } from "lucide-react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field, FieldLabel } from "@/registry/primitives/field"

const platforms = [
	{ label: "Mobile App", icon: SmartphoneIcon },
	{ label: "Desktop App", icon: MonitorIcon },
	{ label: "Cloud Service", icon: CloudIcon },
]

export default function CheckboxPlatformListDemo() {
	return (
		<ul className="flex w-full max-w-xs flex-col divide-y rounded-md border">
			{platforms.map(({ label, icon: Icon }) => (
				<li key={label}>
					<Field>
						<FieldLabel
							htmlFor={label}
							className="flex items-center justify-between gap-2 px-5 py-3"
						>
							<span className="flex items-center gap-2 truncate">
								<Icon className="size-4" /> {label}
							</span>
							<Checkbox id={label} />
						</FieldLabel>
					</Field>
				</li>
			))}
		</ul>
	)
}
