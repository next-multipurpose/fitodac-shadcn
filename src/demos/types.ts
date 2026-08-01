import type { ComponentType, CSSProperties } from "react"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
  componentSlug: string
  sourcePath: string
  previewMinHeight?: CSSProperties["minHeight"]
  dependencies?: string[]
  registryDependencies?: string[]
}
