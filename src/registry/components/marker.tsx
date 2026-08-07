"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type MarkerVariant = "separator"

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
	variant?: MarkerVariant
}

export function Marker({
	className,
	variant = "separator",
	children,
	...props
}: MarkerProps) {
	if (variant === "separator") {
		return (
			<div
				className={cn(
					"my-4 flex items-center justify-center gap-2 text-xs text-muted-foreground",
					className
				)}
				{...props}
			>
				<span className="h-px w-6 bg-border" />
				{children}
				<span className="h-px w-6 bg-border" />
			</div>
		)
	}
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	)
}

export function MarkerContent({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<span className={cn("font-medium", className)} {...props}>
			{children}
		</span>
	)
}
