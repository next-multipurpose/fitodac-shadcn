import { Item, ItemContent, ItemMedia, ItemTitle } from "@/registry/primitives/item"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerPaymentItemDemo() {
  return (
    <Item variant="muted" className="w-full max-w-sm">
      <ItemMedia>
        <Spinner />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
      </ItemContent>
      <ItemContent className="flex-none justify-end">
        <span className="text-sm tabular-nums">$100.00</span>
      </ItemContent>
    </Item>
  )
}
