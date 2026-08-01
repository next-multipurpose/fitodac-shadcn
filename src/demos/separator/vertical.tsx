import { Separator } from "@/registry/primitives/separator"

export default function SeparatorVerticalDemo() {
  return (
    <div className="flex h-8 items-center gap-4 text-sm">
      <a className="font-medium hover:underline" href="#">
        Overview
      </a>
      <Separator orientation="vertical" />
      <a className="font-medium hover:underline" href="#">
        Analytics
      </a>
      <Separator orientation="vertical" />
      <a className="font-medium hover:underline" href="#">
        Reports
      </a>
    </div>
  )
}
