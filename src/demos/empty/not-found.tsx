import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/registry/primitives/empty"
import { Button } from "@/registry/primitives/button"

export default function EmptyNotFoundDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle className="text-8xl font-semibold">404</EmptyTitle>
        <EmptyDescription>
          The page you're looking for might have been moved or doesn't exist.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button size="sm">Go back</Button>
        <Button size="sm" variant="outline">
          Contact support
        </Button>
      </EmptyContent>
    </Empty>
  )
}
