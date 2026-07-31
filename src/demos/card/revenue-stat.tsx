import { Badge } from "@/registry/primitives/badge"

import { Button } from "@/registry/primitives/button"
import { Card, CardContent } from "@/registry/primitives/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"
import { Separator } from "@/registry/primitives/separator"
import {
	ArrowDownIcon,
	ArrowUpIcon,
	MoreHorizontalIcon,
	PinIcon,
	SettingsIcon,
	Share2Icon,
	TrashIcon,
	TriangleAlertIcon,
} from "lucide-react"

export default function CardRevenueStatDemo() {
	const title = "Revenue"
	const value = "$12.4k"
	const delta = 12.5
	const positive = true
	const lastMonth = "$11.0k"

	return (
		<Card className="w-full max-w-xs">
			<CardContent className="flex flex-col gap-5">
				<div className="flex items-center justify-between gap-3">
					<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Button
								variant="ghost"
								size="icon"
								className="-me-1.5"
								aria-label="More options"
							>
								<MoreHorizontalIcon aria-hidden="true" />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<SettingsIcon aria-hidden="true" />
									Settings
								</DropdownMenuItem>
								<DropdownMenuItem>
									<TriangleAlertIcon aria-hidden="true" />
									Add Alert
								</DropdownMenuItem>
								<DropdownMenuItem>
									<PinIcon aria-hidden="true" />
									Pin to Dashboard
								</DropdownMenuItem>
								<DropdownMenuItem>
									<Share2Icon aria-hidden="true" />
									Share
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">
									<TrashIcon aria-hidden="true" />
									Remove
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				<div className="space-y-2.5">
					<div className="flex items-center gap-2.5">
						<span className="text-2xl font-medium tracking-tight text-foreground tabular-nums">
							{value}
						</span>
						<Badge variant={positive ? "success-light" : "destructive-light"}>
							{positive ? (
								<ArrowUpIcon aria-hidden="true" />
							) : (
								<ArrowDownIcon aria-hidden="true" />
							)}
							{delta}%
						</Badge>
					</div>
					<Separator />
					<div className="text-xs text-muted-foreground">
						Vs last month:{" "}
						<span className="font-medium text-foreground tabular-nums">
							{lastMonth}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
