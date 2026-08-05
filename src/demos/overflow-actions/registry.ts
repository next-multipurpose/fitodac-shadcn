import type { DemoEntry } from "@/demos/types"

import { OverflowActionsCardToolbarDemo } from "./card-toolbar"
import { OverflowActionsDefaultDemo } from "./default"
import { OverflowActionsEditorToolbarDemo } from "./editor-toolbar"

export const overflowActionsDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: OverflowActionsDefaultDemo,
		componentSlug: "overflow-actions",
		sourcePath: "src/demos/overflow-actions/default.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "editor-toolbar",
		title: "Editor toolbar",
		component: OverflowActionsEditorToolbarDemo,
		componentSlug: "overflow-actions",
		sourcePath: "src/demos/overflow-actions/editor-toolbar.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
	{
		name: "card-toolbar",
		title: "Card toolbar",
		component: OverflowActionsCardToolbarDemo,
		componentSlug: "overflow-actions",
		sourcePath: "src/demos/overflow-actions/card-toolbar.tsx",
		dependencies: ["lucide-react@^0.577.0"],
	},
]
