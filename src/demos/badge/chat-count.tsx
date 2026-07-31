import { Badge } from "@/registry/primitives/badge"

export default function BadgeChatCountDemo() {
	return (
		<Badge className="items-baseline gap-1.5">
			Chat
			<span className="text-[0.625rem] font-medium text-primary-foreground">
				73
			</span>
		</Badge>
	)
}
