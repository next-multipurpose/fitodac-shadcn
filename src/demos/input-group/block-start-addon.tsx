import { Field } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/primitives/input-group"
import { InfoIcon } from "lucide-react"

export default function InputGroupBlockStartAddonDemo() {
  return (
    <Field className="w-full max-w-xs">
      <InputGroup className="h-auto">
        <InputGroupInput placeholder="First name" />

        <InputGroupAddon align="block-start">
          <InputGroupText className="text-xs font-medium text-foreground">
            User Profile
          </InputGroupText>
          <InfoIcon className="ml-auto" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
