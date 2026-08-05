import type { DemoEntry } from "@/demos/types"

import { authDemos } from "./auth/registry"
import { billingDemos } from "./billing/registry"
import { settingsDemos } from "./settings/registry"
import { tasksDemos } from "./tasks/registry"
import { teamDemos } from "./team/registry"

export const blockDemos: Record<string, DemoEntry> = {
	...authDemos,
	...billingDemos,
	...settingsDemos,
	...tasksDemos,
	...teamDemos,
}

export function getBlockDemo(slug: string): DemoEntry | undefined {
	return blockDemos[slug]
}
