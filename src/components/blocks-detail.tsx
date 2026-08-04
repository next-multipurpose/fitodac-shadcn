"use client"

import * as React from "react"

import type { BlockEntry } from "@/lib/blocks-catalog"
import type { DemoEntry } from "@/demos/types"
import type { DemoIntegrationBundle } from "@/demos/integration/types"

import { DemoViewProvider } from "@/demos/demo-view-provider"
import { BlockDetail } from "@/components/block-detail"

type BlocksDetailProps = {
	blocks: readonly BlockEntry[]
	blockDemos: Record<string, DemoEntry>
	bundles: Record<string, DemoIntegrationBundle>
}

export function BlocksDetail({
	blocks,
	blockDemos,
	bundles,
}: BlocksDetailProps) {
	return (
		<DemoViewProvider>
			<div className="flex flex-col gap-12">
				{blocks.map((block) => {
					const demo = blockDemos[block.slug]
					const bundle = bundles[block.slug]

					if (!demo || !bundle) return null

					return (
						<BlockDetail
							key={block.slug}
							block={block}
							demo={demo}
							bundle={bundle}
						/>
					)
				})}
			</div>
		</DemoViewProvider>
	)
}
