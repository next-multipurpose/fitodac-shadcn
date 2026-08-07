"use client"

import { Image, Music, PenLine, Search, Share2, Video } from "lucide-react"
import { useState } from "react"
import { BloomMenu } from "@/registry/components/bloom-menu"

const aiItems = [
	{ label: "Script", icon: PenLine },
	{ label: "Image", icon: Image },
	{ label: "Video", icon: Video },
	{ label: "Audio", icon: Music },
	{ label: "Analyze", icon: Search },
	{ label: "Export", icon: Share2 },
]

export function BloomMenuAiStudioDemo() {
	const [lastSelected, setLastSelected] = useState<string | null>(null)
	const [usage, setUsage] = useState({
		script: 3,
		image: 1,
		video: 0,
		audio: 2,
	})

	const handleSelect = (label: string) => {
		setLastSelected(label)
		const key = label.toLowerCase() as keyof typeof usage
		if (key in usage) {
			setUsage((u) => ({ ...u, [key]: u[key] + 1 }))
		}
	}

	return (
		<div className="flex min-h-[420px] w-full flex-col items-center justify-center gap-6 pt-8">
			<div className="flex w-full max-w-sm items-center justify-between">
				<div>
					<p className="text-sm font-semibold text-foreground">
						AI Content Studio
					</p>
					<p className="text-xs text-muted-foreground">
						{lastSelected
							? `Selected: ${lastSelected}`
							: "Pick a creation mode"}
					</p>
				</div>
				<div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
					<span>Script × {usage.script}</span>
					<span>Image × {usage.image}</span>
					<span>Audio × {usage.audio}</span>
				</div>
			</div>

			<div className="w-full max-w-sm rounded-2xl border border-border bg-muted/20 p-8">
				<BloomMenu
					items={aiItems}
					onSelect={handleSelect}
					className="w-full justify-center"
				/>
			</div>
		</div>
	)
}
