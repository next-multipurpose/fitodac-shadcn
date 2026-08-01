import { SidebarInset, SidebarProvider } from "@/registry/primitives/sidebar"

import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"

export default function LayoutOneDemo() {
	return (
		<SidebarProvider>
			<div className="relative flex h-dvh w-full">
				<AppSidebar />
				<SidebarInset>
					<AppHeader />
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
						<div className="grid min-h-[100vh] flex-1 place-items-center rounded-xl bg-muted/50 md:min-h-min">
							<span className="text-sm text-muted-foreground">
								Content goes here
							</span>
						</div>
					</div>
				</SidebarInset>
			</div>
		</SidebarProvider>
	)
}
