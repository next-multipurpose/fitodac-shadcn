import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"

export default function ButtonGroupPeriodSelectorDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Days</Button>
      <Button variant="outline">Months</Button>
      <Button variant="outline">Years</Button>
    </ButtonGroup>
  )
}
