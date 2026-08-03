import type { ComponentType } from "react"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
  componentSlug: string
  sourcePath: string
  previewMinHeight?: number
  previewClassName?: string
  dependencies?: string[]
  registryDependencies?: string[]
}
