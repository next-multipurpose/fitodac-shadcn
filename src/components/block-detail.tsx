"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import type { BlockEntry } from "@/lib/blocks-catalog"
import type { DemoEntry } from "@/demos/types"
import type { DemoIntegrationBundle } from "@/demos/integration/types"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/primitives/button"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/registry/primitives/resizable"

import { useDemoView } from "@/demos/demo-view-provider"
import { generateIntegrationPrompt } from "@/demos/integration/generate-integration-prompt"

type CopyButtonProps = {
	label: string
	value: string
}

function CopyButton({ label, value }: CopyButtonProps) {
	const t = useTranslations("Blocks")
	const { copyError, copyToClipboard, isCopied } = useCopyToClipboard()

	return (
		<div className="flex items-center gap-2">
			<span aria-live="polite" className="text-xs text-muted-foreground">
				{isCopied ? t("copied") : copyError ? t("copyFailed") : null}
			</span>
			<Button
				aria-label={label}
				onClick={() => void copyToClipboard(value)}
				size="sm"
				type="button"
				variant="outline"
			>
				{isCopied ? t("copied") : t("copy")}
			</Button>
		</div>
	)
}

function CodeBlock({ code }: { code: string }) {
	return (
		<pre className="max-w-full overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 text-xs leading-relaxed">
			<code>{code}</code>
		</pre>
	)
}

type BlockDetailProps = {
	block: BlockEntry
	demo: DemoEntry
	bundle: DemoIntegrationBundle
}

export function BlockDetail({ block, demo, bundle }: BlockDetailProps) {
	const t = useTranslations("Blocks")
	const { closeCode, openCode, openCodeDemoId } = useDemoView()
	const blockId = `block-${block.slug}`
	const isCodeOpen = openCodeDemoId === blockId
	const cardRef = React.useRef<HTMLElement>(null)

	const {
		copyError: promptCopyError,
		copyToClipboard: copyPrompt,
		isCopied: isPromptCopied,
	} = useCopyToClipboard()

	const prompt = React.useMemo(
		() => generateIntegrationPrompt(bundle),
		[bundle]
	)

	React.useEffect(() => {
		if (isCodeOpen) {
			cardRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start",
			})
		}
	}, [isCodeOpen])

	return (
		<section
			aria-labelledby={blockId}
			className="min-w-0 scroll-mt-20 rounded-xl border border-border bg-card"
			ref={cardRef}
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
				<div className="min-w-0">
					<h2 className="text-sm font-semibold" id={blockId}>
						{block.name}
					</h2>
					<p className="mt-0.5 max-w-sm text-xs text-muted-foreground">
						{block.description}
					</p>
				</div>
				<div className="flex flex-wrap items-center justify-end gap-2">
					<div
						aria-label={t("viewLabel", { title: block.name })}
						className="flex gap-1"
						role="group"
					>
						<Button
							aria-pressed={!isCodeOpen}
							onClick={() => closeCode(blockId)}
							size="sm"
							type="button"
							variant={!isCodeOpen ? "secondary" : "ghost"}
						>
							{t("preview")}
						</Button>
						<Button
							aria-pressed={isCodeOpen}
							onClick={() => openCode(blockId)}
							size="sm"
							type="button"
							variant={isCodeOpen ? "secondary" : "ghost"}
						>
							{t("code")}
						</Button>
					</div>
					<Button
						aria-label={t("copyBlockPrompt", { title: block.name })}
						onClick={() => void copyPrompt(prompt)}
						size="sm"
						type="button"
						variant="outline"
					>
						{isPromptCopied ? t("promptCopied") : t("copyPrompt")}
					</Button>
					<span aria-live="polite" className="sr-only">
						{isPromptCopied
							? t("promptCopied")
							: promptCopyError
								? t("promptCopyFailed")
								: null}
					</span>
				</div>
			</div>

			{!isCodeOpen ? (
				<ResizablePanelGroup
					className="min-h-0 w-full flex-1 overflow-visible!"
					orientation="horizontal"
				>
					<ResizablePanel className="min-w-0" defaultSize="100" minSize="30">
						<div className="flex items-center justify-center p-6 sm:p-10">
							<React.Suspense fallback={<div>Loading…</div>}>
								{React.createElement(demo.component)}
							</React.Suspense>
						</div>
					</ResizablePanel>
					<ResizableHandle
						withHandle
						className="w-4 translate-x-4 bg-transparent transition-colors [&>div]:h-10 [&>div]:w-1.5"
					/>
					<ResizablePanel className="min-w-0" defaultSize="0" minSize="0" />
				</ResizablePanelGroup>
			) : (
				<div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-8 overflow-auto p-4 sm:p-6">
					<section aria-labelledby={`${blockId}-usage`}>
						<div className="mb-3 flex flex-wrap items-center justify-between gap-3">
							<h3 className="font-medium" id={`${blockId}-usage`}>
								{t("exampleUsage")}
							</h3>
							<CopyButton
								label={t("copyExampleUsage", { title: block.name })}
								value={bundle.usageCode}
							/>
						</div>
						<CodeBlock code={bundle.usageCode} />
					</section>

					<section aria-labelledby={`${blockId}-files`}>
						<h3 className="font-medium" id={`${blockId}-files`}>
							{t("requiredFiles")}
						</h3>
						<div className="mt-3 flex flex-col gap-6">
							{bundle.files.map((file) => (
								<div className="min-w-0" key={file.sourcePath}>
									<div className="mb-2 flex flex-wrap items-center justify-between gap-3">
										<div className="min-w-0">
											<code className="text-sm break-all">
												{file.suggestedTargetPath}
											</code>
											<p className="text-xs break-all text-muted-foreground">
												{t("source")}: {file.sourcePath}
											</p>
										</div>
										<CopyButton
											label={t("copyFile", { path: file.suggestedTargetPath })}
											value={file.code}
										/>
									</div>
									<CodeBlock code={file.code} />
								</div>
							))}
						</div>
					</section>

					<section
						aria-labelledby={`${blockId}-dependencies`}
						className="flex flex-col gap-3"
					>
						<h3 className="font-medium" id={`${blockId}-dependencies`}>
							{t("dependencies")}
						</h3>
						{bundle.dependencies.length > 0 ? (
							<ul className="flex flex-wrap gap-2">
								{bundle.dependencies.map((dependency) => (
									<li
										className="rounded-md bg-muted px-2 py-1 font-mono text-xs"
										key={dependency}
									>
										{dependency}
									</li>
								))}
							</ul>
						) : (
							<p className="text-sm text-muted-foreground">{t("none")}</p>
						)}
						<h4 className="pt-2 text-sm font-medium">
							{t("registryDependencies")}
						</h4>
						{bundle.registryDependencies.length > 0 ? (
							<ul className="flex flex-wrap gap-2">
								{bundle.registryDependencies.map((dependency) => (
									<li
										className="rounded-md bg-muted px-2 py-1 font-mono text-xs"
										key={dependency}
									>
										{dependency}
									</li>
								))}
							</ul>
						) : (
							<p className="text-sm text-muted-foreground">{t("none")}</p>
						)}
					</section>
				</div>
			)}
		</section>
	)
}
