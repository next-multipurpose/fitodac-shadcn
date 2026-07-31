import { Badge } from "@/registry/primitives/badge"

import { Button } from "@/registry/primitives/button"
import { Card, CardContent } from "@/registry/primitives/card"
import { ArrowRightIcon, BellIcon } from "lucide-react"

export default function CardTrendingCtaDemo() {
	return (
		<Card className="w-full max-w-xs p-0">
			<CardContent className="flex flex-col gap-5 p-0">
				<div className="relative h-48 w-full overflow-hidden rounded-t-2xl mask-b-to-90%">
					<img
						src="https://picsum.photos/1000/800"
						alt="16:9"
						className="size-full object-cover"
					/>
				</div>

				<div className="flex flex-col items-center gap-4 p-6 pt-0">
					<Badge variant="outline">
						<BellIcon aria-hidden="true" />
						Trending
					</Badge>

					<p className="text-center text-sm text-foreground">
						Making your design process faster and easier. Design tools for your
						team.
					</p>

					<Button className="w-fit">
						Get Started
						<ArrowRightIcon aria-hidden="true" />
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
