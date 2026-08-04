"use client"

import * as React from "react"

type DemoViewContextValue = {
	closeCode: (demoId: string) => void
	openCode: (demoId: string) => void
	openCodeDemoId: string | null
}

const DemoViewContext = React.createContext<DemoViewContextValue | null>(null)

export function DemoViewProvider({ children }: { children: React.ReactNode }) {
	const [openCodeDemoId, setOpenCodeDemoId] = React.useState<string | null>(
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
			},
			openCodeDemoId,
		}),
		[openCodeDemoId]
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
