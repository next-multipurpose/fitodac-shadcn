import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { InputGroup, InputGroupInput } from "@/registry/primitives/input-group"

export default function ButtonGroupEmailAddDemo() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <InputGroup>
          <InputGroupInput placeholder="Email address" />
        </InputGroup>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">Add</Button>
      </ButtonGroup>
    </ButtonGroup>
  )
}
