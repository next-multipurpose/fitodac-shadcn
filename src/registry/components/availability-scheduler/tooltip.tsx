"use client"

import {
	Tooltip as TooltipRoot,
	TooltipTrigger,
	TooltipContent,
} from "@/registry/primitives/tooltip"
import type { ReactElement, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Side = "top" | "right" | "bottom" | "left"

export interface TooltipProps {
	content: ReactNode
	children: ReactElement
	side?: Side
	className?: string
}

/**
 * Lightweight tooltip wrapper that accepts the beui-style API (content + a
 * single child element) and delegates to the project's shadcn Tooltip.
 */
export function Tooltip({
	content,
	children,
	side = "top",
	className,
}: TooltipProps) {
	return (
		<TooltipRoot>
			<TooltipTrigger asChild>{children}</TooltipTrigger>
			<TooltipContent
				side={side}
				className={cn(
					"border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground",
					className
				)}
			>
				{content}
			</TooltipContent>
		</TooltipRoot>
	)
}
