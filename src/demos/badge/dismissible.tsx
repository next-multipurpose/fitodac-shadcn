"use client"

import { XIcon } from "lucide-react"
import { useState } from "react"

import { Badge } from "@/registry/primitives/badge"

export default function BadgeDismissibleDemo() {
	const [isActive, setIsActive] = useState(true)

	if (!isActive) return null

	return (
		<Badge className="gap-0">
			Close
			<button
				className="-my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 text-primary-foreground transition-[color,box-shadow] outline-none hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
				onClick={() => setIsActive(false)}
				type="button"
			>
				<XIcon aria-hidden="true" size={12} />
			</button>
		</Badge>
	)
}
