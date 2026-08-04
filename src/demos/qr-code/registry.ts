import type { DemoEntry } from "@/demos/types"

import QrCodeStylingDemo from "./styling"
import QrCodeRobustnessDemo from "./robustness"
import QrCodeServerComponentDemo from "./server-component"

export const qrCodeDemos: DemoEntry[] = [
	{
		name: "styling",
		title: "QR Code with styling",
		component: QrCodeStylingDemo,
		componentSlug: "qr-code",
		sourcePath: "src/demos/qr-code/styling.tsx"
	},
	{
		name: "robustness",
		title: "QR Code robustness levels",
		component: QrCodeRobustnessDemo,
		componentSlug: "qr-code",
		sourcePath: "src/demos/qr-code/robustness.tsx"
	},
	{
		name: "server-component",
		title: "QR Code server component",
		component: QrCodeServerComponentDemo,
		componentSlug: "qr-code",
		sourcePath: "src/demos/qr-code/server-component.tsx"
	},
]
