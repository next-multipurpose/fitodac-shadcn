"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface MessageProps extends React.HTMLAttributes<HTMLDivElement> {
	align?: "start" | "end"
}

export function Message({
	align = "start",
	className,
	children,
	...props
}: MessageProps) {
	return (
		<div
			className={cn(
				"flex gap-3",
				align === "end" && "flex-row-reverse",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

export function MessageAvatar({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex-shrink-0", className)} {...props}>
			{children}
		</div>
	)
}

export function MessageContent({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex flex-col gap-1 text-sm", className)} {...props}>
			{children}
		</div>
	)
}

export function MessageFooter({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("text-xs text-muted-foreground", className)} {...props}>
			{children}
		</div>
	)
}
