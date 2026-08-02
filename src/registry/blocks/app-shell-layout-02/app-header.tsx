"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import { Avatar } from "@/registry/primitives/avatar"
import { Button } from "@/registry/primitives/button"
import { SidebarTrigger } from "@/registry/primitives/sidebar"
import { getEffectiveTheme, toggleTheme, type Theme } from "@/lib/theme"

function ColorModeToggle() {
	const [theme, setTheme] = React.useState<Theme>("light")

	React.useEffect(() => {
		setTheme(getEffectiveTheme())
	}, [])

	function handleToggle() {
		setTheme(toggleTheme(theme))
	}

	return (
		<Button
			type="button"
			variant="ghost"
			size="icon-sm"
			aria-label="Toggle color mode"
			onClick={handleToggle}
		>
			{theme === "dark" ? (
				<SunIcon className="size-4" />
			) : (
				<MoonIcon className="size-4" />
			)}
		</Button>
	)
}

export function AppHeader() {
	return (
		<header className="flex h-12 shrink-0 items-center gap-2 pt-2 px-2 lg:justify-between">
			<SidebarTrigger className="-ml-1 md:hidden" />

			<nav aria-label="breadcrumb">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink className="flex items-center gap-2" href="#">
								<Avatar className="size-5">
									<img
										alt=""
										src="https://i.pravatar.cc/48"
										className="aspect-square size-full object-cover"
									/>
								</Avatar>
								Workspace
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink className="flex items-center gap-2" href="#">
								<Avatar className="size-5">
									<img
										alt=""
										src="https://i.pravatar.cc/48"
										className="aspect-square size-full object-cover"
									/>
								</Avatar>
								@shadcn
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Projects</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</nav>
			<ColorModeToggle />
		</header>
	)
}
