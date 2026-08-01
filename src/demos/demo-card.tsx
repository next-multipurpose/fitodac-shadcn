"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/primitives/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/primitives/resizable"

import { useDemoView } from "./demo-view-provider"
import { generateIntegrationPrompt } from "./integration/generate-integration-prompt"
import type { DemoIntegrationBundle } from "./integration/types"

type CopyButtonProps = {
  label: string
  value: string
}

function CopyButton({ label, value }: CopyButtonProps) {
  const t = useTranslations("Demos")
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

type DemoCardProps = {
  bundle: DemoIntegrationBundle
  children: React.ReactNode
  demoId: string
  previewMinHeight?: React.CSSProperties["minHeight"]
  title: string
}

export function DemoCard({
  bundle,
  children,
  demoId,
  previewMinHeight = 400,
  title,
}: DemoCardProps) {
  const t = useTranslations("Demos")
  const { closeCode, openCode, openCodeDemoId } = useDemoView()
  const isCodeOpen = openCodeDemoId === demoId
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
      aria-labelledby={demoId}
      className="min-w-0 scroll-mt-20 overflow-hidden rounded-xl border border-border bg-card"
      ref={cardRef}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
        <h2 className="text-sm font-semibold" id={demoId}>
          {title}
        </h2>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <div
            aria-label={t("viewLabel", { title })}
            className="flex gap-1"
            role="group"
          >
            <Button
              aria-pressed={!isCodeOpen}
              onClick={() => closeCode(demoId)}
              size="sm"
              type="button"
              variant={!isCodeOpen ? "secondary" : "ghost"}
            >
              {t("preview")}
            </Button>
            <Button
              aria-pressed={isCodeOpen}
              onClick={() => openCode(demoId)}
              size="sm"
              type="button"
              variant={isCodeOpen ? "secondary" : "ghost"}
            >
              {t("code")}
            </Button>
          </div>
          <Button
            aria-label={t("copyIntegrationPrompt", { title })}
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
          className="min-h-0 w-full flex-1 pr-0"
          orientation="horizontal"
        >
          <ResizablePanel className="min-w-0" defaultSize="100" minSize="30">
            <div
              className="flex items-center justify-center p-6 sm:p-10"
              style={{ minHeight: previewMinHeight }}
            >
              {children}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="w-4 bg-transparent hover:bg-foreground/3 transition-colors [&>div]:w-1.5 [&>div]:h-10" />
          <ResizablePanel className="min-w-0" defaultSize="0" minSize="0" />
        </ResizablePanelGroup>
      ) : (
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-8 overflow-auto p-4 sm:p-6">
          <section aria-labelledby={`${demoId}-usage`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-medium" id={`${demoId}-usage`}>
                {t("exampleUsage")}
              </h3>
              <CopyButton
                label={t("copyExampleUsage", { title })}
                value={bundle.usageCode}
              />
            </div>
            <CodeBlock code={bundle.usageCode} />
          </section>

          <section aria-labelledby={`${demoId}-files`}>
            <h3 className="font-medium" id={`${demoId}-files`}>
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
                      label={t("copyFile", {
                        path: file.suggestedTargetPath,
                      })}
                      value={file.code}
                    />
                  </div>
                  <CodeBlock code={file.code} />
                </div>
              ))}
            </div>
          </section>

          <section
            aria-labelledby={`${demoId}-dependencies`}
            className="flex flex-col gap-3"
          >
            <h3 className="font-medium" id={`${demoId}-dependencies`}>
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
