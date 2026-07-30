import { ChevronRightIcon } from "lucide-react";

import { Button } from "@/registry/primitives/button";
import { ButtonGroup } from "@/registry/primitives/button-group";

export default function Component() {
  return (
    <ButtonGroup aria-label="Pagination">
      <Button aria-label="Next" variant="outline">
        Next
      </Button>
      <Button aria-label="Next" variant="outline" size="icon">
        <ChevronRightIcon />
      </Button>
    </ButtonGroup>
  );
}
