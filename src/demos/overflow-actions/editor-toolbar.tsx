"use client"

import { Bold, Italic, Link, List, Quote, Strikethrough } from "lucide-react"
import { OverflowActions } from "@/registry/components/overflow-actions"

const primaryActions = [
	{
		id: "bold",
		label: "Bold",
		icon: <Bold className="h-4 w-4" />,
		ariaLabel: "Bold (⌘B)",
	},
	{
		id: "italic",
		label: "Italic",
		icon: <Italic className="h-4 w-4" />,
		ariaLabel: "Italic (⌘I)",
	},
	{
		id: "strikethrough",
		label: "Strikethrough",
		icon: <Strikethrough className="h-4 w-4" />,
		ariaLabel: "Strikethrough (⌘⇧X)",
	},
]

const overflowActions = [
	{
		id: "link",
		label: "Link",
		icon: <Link className="h-4 w-4" />,
		ariaLabel: "Insert link",
	},
	{
		id: "quote",
		label: "Quote",
		icon: <Quote className="h-4 w-4" />,
		ariaLabel: "Insert blockquote",
	},
	{
		id: "list",
		label: "List",
		icon: <List className="h-4 w-4" />,
		ariaLabel: "Insert list",
	},
]

export function OverflowActionsEditorToolbarDemo() {
	return (
		<div className="flex w-full items-center justify-center">
			<OverflowActions
				primaryActions={primaryActions}
				overflowActions={overflowActions}
				openLabel="More formatting"
				closeLabel="Hide formatting"
			/>
		</div>
	)
}
