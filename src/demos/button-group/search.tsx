import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { Input } from "@/registry/primitives/input"
import { SearchIcon } from "lucide-react"

export default function ButtonGroupSearchDemo() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
