import { Button } from "@/registry/primitives/button"

export function ButtonVariantsDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
