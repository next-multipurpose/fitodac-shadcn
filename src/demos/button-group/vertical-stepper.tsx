import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { MinusIcon, PlusIcon } from "lucide-react"

export default function ButtonGroupVerticalStepperDemo() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon" aria-label="Increase">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Decrease">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
