import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/registry/primitives/breadcrumb"
import { Avatar, AvatarFallback } from "@/registry/primitives/avatar"
import { SidebarTrigger } from "@/registry/primitives/sidebar"
import { TriangleIcon } from "lucide-react"

export function AppHeader() {
	return (
		<header className="flex h-11 shrink-0 items-center gap-2 px-2">
			<SidebarTrigger className="md:hidden" />
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden sm:inline-flex">
						<BreadcrumbLink className="flex items-center gap-2" href="#">
							<Avatar className="size-5 bg-black text-white">
								<AvatarFallback className="bg-black text-white">
									<TriangleIcon className="size-2.5 fill-current" />
								</AvatarFallback>
							</Avatar>
							Workspace
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="hidden sm:list-item" />
					<BreadcrumbItem className="hidden sm:inline-flex">
						<BreadcrumbLink className="flex items-center gap-2" href="#">
							<Avatar className="size-5">
								<AvatarFallback className="bg-primary text-[9px] text-primary-foreground">
									@
								</AvatarFallback>
							</Avatar>
							@shadcn
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator className="hidden sm:list-item" />
					<BreadcrumbItem>
						<BreadcrumbPage>Projects</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}
