"use client"

import { ChevronDown } from "lucide-react"
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

interface ScrollerContextValue {
	autoScroll: boolean
}

const ScrollerContext = createContext<ScrollerContextValue | undefined>(
	undefined
)

function useScroller() {
	const ctx = useContext(ScrollerContext)
	if (!ctx) {
		throw new Error(
			"MessageScroller components must be used within <MessageScrollerProvider>"
		)
	}
	return ctx
}

export interface MessageScrollerProviderProps {
	autoScroll?: boolean
	children: ReactNode
}

export function MessageScrollerProvider({
	autoScroll = false,
	children,
}: MessageScrollerProviderProps) {
	return (
		<ScrollerContext.Provider value={{ autoScroll }}>
			{children}
		</ScrollerContext.Provider>
	)
}

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MessageScroller({
	className,
	children,
	...props
}: MessageScrollerProps) {
	return (
		<div
			className={cn("relative flex flex-col overflow-hidden", className)}
			{...props}
		>
			{children}
		</div>
	)
}

export interface MessageScrollerViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MessageScrollerViewport({
	className,
	children,
	...props
}: MessageScrollerViewportProps) {
	return (
		<div className={cn("flex-1 overflow-y-auto", className)} {...props}>
			{children}
		</div>
	)
}

export interface MessageScrollerContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MessageScrollerContent({
	className,
	children,
	...props
}: MessageScrollerContentProps) {
	return (
		<div className={cn("flex flex-col gap-6 px-2 py-8", className)} {...props}>
			{children}
		</div>
	)
}

export interface MessageScrollerItemProps extends React.HTMLAttributes<HTMLDivElement> {
	messageId: string
	scrollAnchor?: boolean
}

export function MessageScrollerItem({
	messageId,
	scrollAnchor,
	className,
	children,
	...props
}: MessageScrollerItemProps) {
	return (
		<div data-message-id={messageId} className={cn(className)} {...props}>
			{children}
		</div>
	)
}

export function MessageScrollerButton({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("p-2", className)} {...props}>
			<button
				type="button"
				className={cn(
					"mx-auto flex h-7 w-7 items-center justify-center rounded-full border bg-background/80 text-muted-foreground shadow-sm transition-opacity hover:bg-background hover:text-foreground",
					"backdrop-blur-sm"
				)}
				aria-label="Scroll to bottom"
			>
				<ChevronDown className="h-4 w-4" />
			</button>
		</div>
	)
}
