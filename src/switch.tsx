"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const badgeVariants = cva(
	"group/switch peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
	{
		variants: {
			variant: {},
			size: {
				default: "h-[1.125rem] w-8",
				sm: "h-3.5 w-6 [&>span]:size-3",
			},
		},
		defaultVariants: {
			size: "default",
		},
	}
)

interface SwitchProps extends Omit<
	React.ComponentProps<typeof SwitchPrimitive.Root>,
	"size"
> {
	size?: "default" | "sm"
}

function Switch({ className, size = "default", ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(badgeVariants({ size, className }))}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 rtl:data-[state=checked]:-translate-x-[calc(100%-2px)] dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
				)}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
