"use client"

import * as React from "react"
import { ShieldIcon } from "lucide-react"

import type { BlockEntry } from "@/lib/blocks-catalog"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>

type BlocksDetailProps = {
	blocks: readonly BlockEntry[]
	components: Record<string, AnyComponent>
}

interface BlockErrorBoundaryProps {
	children: React.ReactNode
	fallback: React.ReactNode
}

interface BlockErrorBoundaryState {
	hasError: boolean
}

class BlockErrorBoundary extends React.Component<
	BlockErrorBoundaryProps,
	BlockErrorBoundaryState
> {
	constructor(props: BlockErrorBoundaryProps) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error: Error) {
		console.error("Block demo error:", error)
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback
		}
		return this.props.children
	}
}

export function BlocksDetail({ blocks, components }: BlocksDetailProps) {
	return (
		<div className="flex flex-col gap-12">
			{blocks.map((block) => {
				const Component = components[block.slug]
				if (!Component) return null
				return (
					<div
						key={block.slug}
						id={block.slug}
						className="rounded-xl border border-border bg-card"
					>
						<div className="p-5">
							<div className="flex items-center gap-3">
								<ShieldIcon
									className="size-5 text-muted-foreground"
									aria-hidden="true"
								/>
								<h3 className="font-medium">{block.name}</h3>
							</div>
							<p className="mt-1 text-sm text-muted-foreground">
								{block.description}
							</p>
						</div>
						<div className="border-t border-border px-4 py-8 sm:px-10 sm:py-12">
							<BlockErrorBoundary
								fallback={
									<div className="text-center text-sm text-muted-foreground">
										Demo preview requires prop values
									</div>
								}
							>
								<Component />
							</BlockErrorBoundary>
						</div>
					</div>
				)
			})}
		</div>
	)
}
