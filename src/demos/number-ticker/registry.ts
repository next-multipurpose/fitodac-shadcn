import type { DemoEntry } from "@/demos/types"

import { NumberTickerCryptoPriceDemo } from "./crypto-price"
import { NumberTickerDefaultDemo } from "./default"
import { NumberTickerProgressBarDemo } from "./progress-bar"

export const numberTickerDemos: DemoEntry[] = [
	{
		name: "default",
		title: "Default",
		component: NumberTickerDefaultDemo,
		componentSlug: "number-ticker",
		sourcePath: "src/demos/number-ticker/default.tsx",
		dependencies: ["motion@^12.38.0"],
	},
	{
		name: "crypto-price",
		title: "Crypto price",
		component: NumberTickerCryptoPriceDemo,
		componentSlug: "number-ticker",
		sourcePath: "src/demos/number-ticker/crypto-price.tsx",
		dependencies: ["lucide-react@^0.577.0", "motion@^12.38.0"],
	},
	{
		name: "progress-bar",
		title: "Progress bar",
		component: NumberTickerProgressBarDemo,
		componentSlug: "number-ticker",
		sourcePath: "src/demos/number-ticker/progress-bar.tsx",
		dependencies: ["motion@^12.38.0"],
	},
]
