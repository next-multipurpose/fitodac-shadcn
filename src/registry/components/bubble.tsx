"use client"

import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const bubbleVariants = cva(
	"relative inline-flex flex-col gap-1.5 px-4 py-2.5 text-sm leading-relaxed break-words",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				muted: "bg-muted text-muted-foreground",
			},
			align: {
				start: "self-start rounded-se-3xl rounded-ee-3xl rounded-tl-lg",
				end: "self-end rounded-ss-3xl rounded-ee-3xl rounded-tr-lg",
			},
		},
		defaultVariants: {
			variant: "default",
			align: "start",
		},
	}
)

export interface BubbleProps
	extends
		VariantProps<typeof bubbleVariants>,
		React.HTMLAttributes<HTMLDivElement> {}

export function Bubble({
	className,
	variant,
	align,
	children,
	...props
}: BubbleProps) {
	return (
		<div
			className={cn(bubbleVariants({ variant, align }), className)}
			{...props}
		>
			{children}
		</div>
	)
}

export function BubbleGroup({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("inline-flex flex-col gap-1.5", className)} {...props}>
			{children}
		</div>
	)
}

export function BubbleContent({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn(className)} {...props}>
			{children}
		</div>
	)
}

export interface BubbleReactionsProps extends React.HTMLAttributes<HTMLDivElement> {
	align?: "start" | "end"
}

export function BubbleReactions({
	className,
	align = "start",
	children,
	...props
}: BubbleReactionsProps) {
	return (
		<div
			className={cn(
				"absolute bottom-full mb-1 flex items-center gap-1",
				align === "start" ? "left-2" : "right-2",
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}
