import Link from "next/link"

import { Button } from "@/registry/primitives/button"

export function LayoutCategoryNav({ active }: { active: "app-shells" | "login" }) {
	return (
		<nav aria-label="Layout categories" className="flex flex-wrap gap-2 pt-2">
			<Button asChild size="sm" variant={active === "app-shells" ? "default" : "outline"}>
				<Link href="/layouts">App shells</Link>
			</Button>
			<Button asChild size="sm" variant={active === "login" ? "default" : "outline"}>
				<Link href="/layouts/login">Login</Link>
			</Button>
		</nav>
	)
}
