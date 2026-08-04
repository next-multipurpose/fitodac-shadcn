"use client"

import * as React from "react"

type DemoViewContextValue = {
	closeCode: (demoId: string) => void
	openCode: (demoId: string) => void
	openCodeDemoId: string | null
	closePrompt: (demoId: string) => void
	openPrompt: (demoId: string) => void
	openPromptDemoId: string | null
}

const DemoViewContext = React.createContext<DemoViewContextValue | null>(null)

export function DemoViewProvider({ children }: { children: React.ReactNode }) {
	const [openCodeDemoId, setOpenCodeDemoId] = React.useState<string | null>(
		null
	)
	const [openPromptDemoId, setOpenPromptDemoId] = React.useState<string | null>(
		null
	)

	const value = React.useMemo<DemoViewContextValue>(
		() => ({
			closeCode: (demoId) =>
				setOpenCodeDemoId((currentId) =>
					currentId === demoId ? null : currentId
				),
			openCode: (demoId) => {
				setOpenCodeDemoId(demoId)
				setOpenPromptDemoId((currentId) =>
					currentId === demoId ? null : currentId
				)
			},
			openCodeDemoId,
			closePrompt: (demoId) =>
				setOpenPromptDemoId((currentId) =>
					currentId === demoId ? null : currentId
				),
			openPrompt: (demoId) => {
				setOpenPromptDemoId(demoId)
				setOpenCodeDemoId((currentId) =>
					currentId === demoId ? null : currentId
				)
			},
			openPromptDemoId,
		}),
		[openCodeDemoId, openPromptDemoId]
	)

	return (
		<DemoViewContext.Provider value={value}>
			{children}
		</DemoViewContext.Provider>
	)
}

export function useDemoView() {
	const context = React.useContext(DemoViewContext)

	if (!context) {
		throw new Error("useDemoView must be used within DemoViewProvider")
	}

	return context
}
