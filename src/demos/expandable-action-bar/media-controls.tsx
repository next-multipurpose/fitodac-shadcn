"use client"

import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { useMemo, useState } from "react"
import {
	type ExpandableActionBarItem,
	ExpandableActionBar,
} from "@/registry/components/expandable-action-bar"

const MEDIA_CONTROLS: ExpandableActionBarItem[] = [
	{
		id: "play",
		label: "Play",
		icon: <Play className="h-4 w-4" />,
	},
	{
		id: "pause",
		label: "Pause",
		icon: <Pause className="h-4 w-4" />,
	},
	{
		id: "previous",
		label: "Previous",
		icon: <SkipBack className="h-4 w-4" />,
	},
	{
		id: "next",
		label: "Next",
		icon: <SkipForward className="h-4 w-4" />,
	},
	{
		id: "shuffle",
		label: "Shuffle",
		icon: <SkipBack className="h-4 w-4 rotate-180" />,
		shortcut: "S",
	},
	{
		id: "repeat",
		label: "Repeat",
		icon: <SkipForward className="h-4 w-4 rotate-180" />,
		badge: "1",
	},
	{
		id: "volume",
		label: "Volume",
		icon: <Volume2 className="h-4 w-4" />,
		shortcut: "M",
	},
]

export function ExpandableActionBarMediaControlsDemo() {
	const [playing, setPlaying] = useState(false)
	const [activeId, setActiveId] = useState("play")

	const items = useMemo(
		() =>
			MEDIA_CONTROLS.map((item) => {
				let isActive = item.id === activeId
				if (item.id === "pause") isActive = isActive && playing
				if (item.id === "play") isActive = isActive && !playing
				return {
					...item,
					active: isActive,
				}
			}),
		[activeId, playing]
	)

	const handleAction = (item: ExpandableActionBarItem) => {
		if (item.id === "play") setPlaying(true)
		if (item.id === "pause") setPlaying(false)
		setActiveId(item.id)
	}

	return (
		<div className="flex w-full items-center justify-center">
			<ExpandableActionBar
				items={items}
				onAction={handleAction}
				activeId={activeId}
			/>
		</div>
	)
}
