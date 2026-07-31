import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function ButtonGroupIconNavigationDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Previous">
        <ChevronLeftIcon />
      </Button>
      <Button variant="outline" size="icon" aria-label="Next">
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  )
}
