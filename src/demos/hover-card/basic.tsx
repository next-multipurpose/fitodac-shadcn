import { Button } from "@/registry/primitives/button"
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/primitives/hover-card"

export default function HoverCardBasicDemo() {
	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<Button variant="link">@nextjs</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-80">
				<div className="flex justify-between space-x-4">
					<div className="space-y-1">
						<h4 className="text-sm font-semibold">@nextjs</h4>
						<p className="text-sm">
							The React Framework – created and maintained by @vercel.
						</p>
					</div>
				</div>
			</HoverCardContent>
		</HoverCard>
	)
}
