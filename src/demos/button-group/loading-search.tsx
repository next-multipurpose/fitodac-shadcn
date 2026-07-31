import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { InputGroup, InputGroupInput } from "@/registry/primitives/input-group"
import { Loader2 } from "lucide-react"

export default function ButtonGroupLoadingSearchDemo() {
  return (
    <ButtonGroup className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search articles..." />
      </InputGroup>
      <Button disabled>
        <Loader2 className="size-4 animate-spin" />
      </Button>
    </ButtonGroup>
  )
}
