import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { Spinner } from "@/registry/primitives/spinner"

export default function SpinnerInputAddonDemo() {
  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Send a message..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
