"use client"

import { useEffect, useState } from "react"
import {
	BarChart3Icon,
	CreditCardIcon,
	LayoutGridIcon,
	SearchIcon,
	UsersIcon,
} from "lucide-react"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/registry/primitives/dialog"
import { Input } from "@/registry/primitives/input"
import {
	Item,
	ItemContent,
	ItemGroup,
	ItemMedia,
	ItemTitle,
} from "@/registry/primitives/item"
import { Kbd } from "@/registry/primitives/kbd"
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/registry/primitives/sidebar"

const results = [
	{ title: "Overview", icon: LayoutGridIcon },
	{ title: "Customers", icon: UsersIcon },
	{ title: "Subscriptions", icon: CreditCardIcon },
	{ title: "Revenue", icon: BarChart3Icon },
]

export function SearchDialog() {
	const [open, setOpen] = useState(false)
	const [query, setQuery] = useState("")

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
				event.preventDefault()
				setOpen((current) => !current)
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		return () => document.removeEventListener("keydown", handleKeyDown)
	}, [])

	const filteredResults = results.filter((result) =>
		result.title.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<SidebarMenu>
				<SidebarMenuItem>
					<DialogTrigger asChild>
						<SidebarMenuButton
							variant="outline"
							className="bg-background shadow-xs"
							tooltip="Search"
						>
							<SearchIcon />
							<span>Search...</span>
							<Kbd className="ml-auto group-data-[collapsible=icon]:hidden">
								⌘K
							</Kbd>
						</SidebarMenuButton>
					</DialogTrigger>
				</SidebarMenuItem>
			</SidebarMenu>

			<DialogContent
				className="gap-0 overflow-hidden p-0 sm:max-w-md"
				showCloseButton={false}
			>
				<DialogHeader className="sr-only">
					<DialogTitle>Search workspace</DialogTitle>
					<DialogDescription>
						Search navigation and workspace destinations.
					</DialogDescription>
				</DialogHeader>
				<div className="relative border-b">
					<SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						autoFocus
						aria-label="Search workspace"
						className="h-12 rounded-none border-0 pr-14 pl-10 shadow-none focus-visible:ring-0"
						placeholder="Search..."
						value={query}
						onChange={(event) => setQuery(event.target.value)}
					/>
					<Kbd className="absolute top-1/2 right-4 -translate-y-1/2">ESC</Kbd>
				</div>
				<ItemGroup className="gap-1 p-2">
					{filteredResults.map((result) => {
						const Icon = result.icon
						return (
							<Item
								asChild
								key={result.title}
								size="sm"
								className="cursor-pointer px-2 py-2"
							>
								<button type="button" onClick={() => setOpen(false)}>
									<ItemMedia>
										<Icon className="size-4 text-muted-foreground" />
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{result.title}</ItemTitle>
									</ItemContent>
								</button>
							</Item>
						)
					})}
				</ItemGroup>
			</DialogContent>
		</Dialog>
	)
}
