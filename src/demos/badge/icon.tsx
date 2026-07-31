import { ZapIcon } from "lucide-react"

import { Badge } from "@/registry/primitives/badge"

export default function BadgeIconDemo() {
	return (
		<Badge>
			<ZapIcon aria-hidden="true" className="-ms-0.5" size={12} />
			Badge
		</Badge>
	)
}
