import type { ComponentType } from "react"

export type DemoEntry = {
  name: string
  title: string
  component: ComponentType
  componentSlug: string
  sourcePath: string
  dependencies?: string[]
  registryDependencies?: string[]
}
