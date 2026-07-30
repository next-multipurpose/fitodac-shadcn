import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/registry/primitives/button";
import { ButtonGroup } from "@/registry/primitives/button-group";

export default function Component() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Media controls" className="h-fit">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  );
}
