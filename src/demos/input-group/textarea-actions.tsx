import { Field } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/registry/primitives/input-group"

export default function InputGroupTextareaActionsDemo() {
  return (
    <Field>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Share your thoughts..."
          className="min-h-24"
        />
        <InputGroupAddon align="block-end">
          <InputGroupButton variant="secondary" size="sm">
            Cancel
          </InputGroupButton>
          <InputGroupButton variant="default" size="sm" className="ml-auto">
            Post Comment
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
