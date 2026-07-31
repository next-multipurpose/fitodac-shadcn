import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MenuIcon,
} from "lucide-react"

export default function ButtonGroupAlignmentControlsDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Align left">
        <AlignLeftIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align center">
        <AlignCenterIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align right">
        <AlignRightIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Align justify">
        <MenuIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
