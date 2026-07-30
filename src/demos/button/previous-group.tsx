import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/registry/primitives/button";
import { ButtonGroup } from "@/registry/primitives/button-group";

export default function Component() {
  return (
    <ButtonGroup aria-label="Pagination">
      <Button aria-label="Previous" variant="outline" size="icon">
        <ChevronLeftIcon />
      </Button>
      <Button aria-label="Previous" variant="outline">
        Previous
      </Button>
    </ButtonGroup>
  );
}
