"use client"

import { Download, Save, Send, Share2, Trash, Upload } from "lucide-react"
import { OverflowActions } from "@/registry/components/overflow-actions"

const primaryActions = [
	{
		id: "save",
		label: "Save",
		icon: <Save className="h-4 w-4" />,
	},
	{
		id: "upload",
		label: "Upload",
		icon: <Upload className="h-4 w-4" />,
	},
]

const overflowActions = [
	{
		id: "share",
		label: "Share",
		icon: <Share2 className="h-4 w-4" />,
	},
	{
		id: "download",
		label: "Download",
		icon: <Download className="h-4 w-4" />,
	},
	{
		id: "send",
		label: "Send",
		icon: <Send className="h-4 w-4" />,
	},
	{
		id: "delete",
		label: "Delete",
		icon: <Trash className="h-4 w-4" />,
	},
]

export function OverflowActionsCardToolbarDemo() {
	return (
		<div className="flex w-full items-center justify-center">
			<OverflowActions
				primaryActions={primaryActions}
				overflowActions={overflowActions}
				openLabel="More actions"
				closeLabel="Hide actions"
			/>
		</div>
	)
}
