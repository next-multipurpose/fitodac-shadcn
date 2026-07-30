"use client"

import * as React from "react"

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/primitives/button"

import type { DemoIntegrationBundle } from "./integration/types"

type CopyButtonProps = {
  label: string
  value: string
}

function CopyButton({ label, value }: CopyButtonProps) {
  const { copyError, copyToClipboard, isCopied } = useCopyToClipboard()

  return (
    <div className="flex items-center gap-2">
      <span aria-live="polite" className="text-xs text-muted-foreground">
        {isCopied ? "Copied" : copyError ? "Copy failed" : null}
      </span>
      <Button
        aria-label={label}
        onClick={() => void copyToClipboard(value)}
        size="sm"
        type="button"
        variant="outline"
      >
        {isCopied ? "Copied" : "Copy"}
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
  title: string
}

export function DemoCard({ bundle, children, demoId, title }: DemoCardProps) {
  const [view, setView] = React.useState<"preview" | "code">("preview")

  return (
    <section
      aria-labelledby={demoId}
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6 sm:py-4">
        <h2 className="text-lg font-medium" id={demoId}>
          {title}
        </h2>
        <div aria-label={`${title} view`} className="flex gap-1" role="group">
          <Button
            aria-pressed={view === "preview"}
            onClick={() => setView("preview")}
            size="sm"
            type="button"
            variant={view === "preview" ? "secondary" : "ghost"}
          >
            Preview
          </Button>
          <Button
            aria-pressed={view === "code"}
            onClick={() => setView("code")}
            size="sm"
            type="button"
            variant={view === "code" ? "secondary" : "ghost"}
          >
            Code
          </Button>
        </div>
      </div>

      {view === "preview" ? (
        <div className="flex min-h-48 items-center justify-center p-6 sm:p-10">
          {children}
        </div>
      ) : (
        <div className="flex min-w-0 flex-col gap-8 p-4 sm:p-6">
          <section aria-labelledby={`${demoId}-usage`}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-medium" id={`${demoId}-usage`}>
                Example usage
              </h3>
              <CopyButton
                label={`Copy ${title} example usage`}
                value={bundle.usageCode}
              />
            </div>
            <CodeBlock code={bundle.usageCode} />
          </section>

          <section aria-labelledby={`${demoId}-files`}>
            <h3 className="font-medium" id={`${demoId}-files`}>
              Required component files
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
                        Source: {file.sourcePath}
                      </p>
                    </div>
                    <CopyButton
                      label={`Copy ${file.suggestedTargetPath}`}
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
              Dependencies
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
              <p className="text-sm text-muted-foreground">None.</p>
            )}
            <h4 className="pt-2 text-sm font-medium">Registry dependencies</h4>
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
              <p className="text-sm text-muted-foreground">None.</p>
            )}
          </section>
        </div>
      )}
    </section>
  )
}
