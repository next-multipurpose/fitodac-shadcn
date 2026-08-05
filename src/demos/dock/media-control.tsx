"use client"

import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { useState } from "react"
import { Dock, DockItem, DockSeparator } from "@/registry/components/dock"

export function DockMediaControlDemo() {
	const [playing, setPlaying] = useState(false)

	return (
		<div className="flex w-full items-center justify-center">
			<Dock size={48}>
				<DockItem aria-label="Previous" onClick={() => {}}>
					<SkipBack className="h-5 w-5" />
				</DockItem>
				<DockItem
					aria-label={playing ? "Pause" : "Play"}
					active={playing}
					onClick={() => setPlaying(!playing)}
				>
					{playing ? (
						<Pause className="h-5 w-5" />
					) : (
						<Play className="h-5 w-5" />
					)}
				</DockItem>
				<DockItem aria-label="Next" onClick={() => {}}>
					<SkipForward className="h-5 w-5" />
				</DockItem>
				<DockSeparator />
				<DockItem aria-label="Volume" onClick={() => {}}>
					<Volume2 className="h-5 w-5" />
				</DockItem>
			</Dock>
		</div>
	)
}
