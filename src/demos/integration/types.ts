export type IntegrationFile = {
  sourcePath: string
  suggestedTargetPath: string
  code: string
}

export type DemoIntegrationBundle = {
  component: string
  demo: string
  usageCode: string
  files: IntegrationFile[]
  dependencies: string[]
  registryDependencies: string[]
}
