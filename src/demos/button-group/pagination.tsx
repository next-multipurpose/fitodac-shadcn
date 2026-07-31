import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

export default function ButtonGroupPaginationDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Previous page" disabled>
        <ChevronLeftIcon />
      </Button>
      <Button variant="outline">1</Button>
      <Button variant="outline">2</Button>
      <Button>3</Button>
      <Button variant="outline">4</Button>
      <Button variant="outline">...</Button>
      <Button variant="outline">20</Button>
      <Button variant="outline" size="icon" aria-label="Next page">
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  )
}
