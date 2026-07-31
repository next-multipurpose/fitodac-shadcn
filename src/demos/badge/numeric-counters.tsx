import { Badge } from "@/registry/primitives/badge"

export default function BadgeNumericCountersDemo() {
	return (
		<div className="flex gap-3">
			<Badge className="size-5 px-1">6</Badge>
			<Badge className="size-5 px-1" radius="full">
				8
			</Badge>
		</div>
	)
}
