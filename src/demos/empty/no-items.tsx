import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/primitives/empty"

export default function EmptyNoItemsDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SearchIcon />
        </EmptyMedia>
        <EmptyTitle>No items found</EmptyTitle>
      </EmptyHeader>
    </Empty>
  )
}
