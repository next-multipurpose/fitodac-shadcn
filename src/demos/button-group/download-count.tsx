import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import { DownloadCloud } from "lucide-react"

export default function ButtonGroupDownloadCountDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <DownloadCloud />
        Download for Free
      </Button>
      <Button variant="outline">31K</Button>
    </ButtonGroup>
  )
}
