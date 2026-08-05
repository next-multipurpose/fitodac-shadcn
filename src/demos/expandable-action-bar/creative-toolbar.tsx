"use client"

import {
	Brush,
	Edit3,
	Eraser,
	Palette,
	Shapes,
	TextSelect,
	Upload,
} from "lucide-react"
import { useMemo, useState } from "react"
import {
	type ExpandableActionBarItem,
	ExpandableActionBar,
} from "@/registry/components/expandable-action-bar"

const TOOLS: ExpandableActionBarItem[] = [
	{
		id: "select",
		label: "Select",
		icon: <TextSelect className="h-4 w-4" />,
		shortcut: "V",
	},
	{
		id: "brush",
		label: "Brush",
		icon: <Brush className="h-4 w-4" />,
		shortcut: "B",
	},
	{
		id: "pen",
		label: "Pen",
		icon: <Edit3 className="h-4 w-4" />,
		shortcut: "P",
	},
	{
		id: "shapes",
		label: "Shapes",
		icon: <Shapes className="h-4 w-4" />,
		shortcut: "S",
	},
	{
		id: "text",
		label: "Text",
		icon: <Shapes className="h-4 w-4" />,
		shortcut: "T",
	},
	{
		id: "eraser",
		label: "Eraser",
		icon: <Eraser className="h-4 w-4" />,
		shortcut: "E",
	},
	{
		id: "palette",
		label: "Palette",
		icon: <Palette className="h-4 w-4" />,
		shortcut: "W",
	},
	{
		id: "export",
		label: "Export",
		icon: <Upload className="h-4 w-4" />,
		shortcut: "X",
	},
]

export function ExpandableActionBarCreativeToolbarDemo() {
	const [activeId, setActiveId] = useState("select")

	const items = useMemo(
		() =>
			TOOLS.map((item) => ({
				...item,
				active: item.id === activeId,
			})),
		[activeId]
	)

	return (
		<div className="flex w-full items-center justify-center">
			<ExpandableActionBar
				items={items}
				defaultExpanded={true}
				expandOnHover={false}
				onAction={(item) => setActiveId(item.id)}
				activeId={activeId}
			/>
		</div>
	)
}
