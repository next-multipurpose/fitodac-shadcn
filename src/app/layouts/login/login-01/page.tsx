import type { Metadata } from "next"
import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "../login-form"

export const metadata: Metadata = { title: "Login template 01" }

export default function LoginPage() {
	return (
		<main className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="#" className="flex items-center gap-2 font-medium">
						<span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<GalleryVerticalEnd className="size-4" />
						</span>
						Acme Inc.
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs"><LoginForm /></div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<img
					src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80"
					alt="Workspace"
					className="absolute inset-0 size-full object-cover dark:brightness-[0.35] dark:grayscale"
				/>
			</div>
		</main>
	)
}
