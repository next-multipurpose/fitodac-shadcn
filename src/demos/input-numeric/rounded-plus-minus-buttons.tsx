"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { Button, Group, Input, NumberField } from "react-aria-components"

import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/primitives/field"

export default function InputNumericRoundedPlusMinusButtonsDemo() {
  return (
    <Field>
      <FieldLabel>Input with plus/minus buttons (rounded)</FieldLabel>

      <NumberField defaultValue={1024} minValue={0} className="space-y-2">
        <Group className="relative inline-flex h-9 w-full min-w-0 max-w-[12.5rem] items-center overflow-hidden rounded-md border border-input bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:border-ring data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50">
          <Button
            slot="decrement"
            className="ml-2 flex aspect-square h-5 items-center justify-center rounded-sm border border-input bg-background text-sm text-muted-foreground transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MinusIcon className="size-3" />
            <span className="sr-only">Decrement</span>
          </Button>

          <Input className="w-full grow px-3 py-2 text-center tabular-nums outline-none selection:bg-primary selection:text-primary-foreground" />

          <Button
            slot="increment"
            className="mr-2 flex aspect-square h-5 items-center justify-center rounded-sm border border-input bg-background text-sm text-muted-foreground transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon className="size-3" />
            <span className="sr-only">Increment</span>
          </Button>
        </Group>
      </NumberField>

      <FieldDescription className="px-1 text-xs text-muted-foreground">
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://react-spectrum.adobe.com/react-aria/NumberField.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          React Aria
        </a>
      </FieldDescription>
    </Field>
  )
}
