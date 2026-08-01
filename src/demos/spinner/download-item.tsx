import { Button } from "@/registry/primitives/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/primitives/item"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerDownloadItemDemo() {
  return (
    <Item variant="outline" className="w-full max-w-sm">
      <ItemMedia variant="icon" className="rounded-full">
        <Spinner />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Downloading (35%)</ItemTitle>
        <ItemDescription className="text-xs">129 MB / 1000 MB</ItemDescription>
      </ItemContent>
      <ItemActions className="hidden sm:flex">
        <Button size="xs" variant="destructive">
          Cancel
        </Button>
      </ItemActions>
    </Item>
  )
}
