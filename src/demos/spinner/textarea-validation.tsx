import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/registry/primitives/input-group"
import { Spinner } from "@/registry/primitives/spinner"
import { ArrowUpIcon } from "lucide-react"

export default function SpinnerTextareaValidationDemo() {
  return (
    <div className="w-full max-w-xs">
      <InputGroup>
        <InputGroupTextarea placeholder="Send a message..." disabled />
        <InputGroupAddon align="block-end">
          <Spinner /> Validating...
          <InputGroupButton
            size="icon-sm"
            className="ml-auto rounded-full"
            variant="default"
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
