"use client"

import { MinusIcon, PlusIcon } from "lucide-react"
import { Button, Group, Input, NumberField } from "react-aria-components"

import { Field, FieldDescription, FieldLabel } from "@/registry/primitives/field"

interface InputNumericProps {
  defaultValue?: number
  minValue?: number
  maxValue?: number
  label?: string
  description?: string
  className?: string
}

export function InputNumeric({
  defaultValue = 0,
  minValue = 0,
  maxValue,
  label,
  description,
  className,
}: InputNumericProps) {
  return (
    <Field className={className}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <NumberField defaultValue={defaultValue} minValue={minValue} maxValue={maxValue} className="space-y-2">
        <Group className="relative inline-flex h-9 w-full min-w-0 items-center overflow-hidden rounded-md border border-input bg-transparent text-base whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none data-focus-within:border-ring data-focus-within:ring-[3px] data-focus-within:ring-ring/50 data-focus-within:has-aria-invalid:border-destructive data-focus-within:has-aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:data-focus-within:has-aria-invalid:ring-destructive/40 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50">
          <Button
            slot="decrement"
            className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-l-md border border-none bg-background text-sm text-muted-foreground transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MinusIcon />
            <span className="sr-only">Decrement</span>
          </Button>

          <Input className="w-full grow px-3 py-2 text-center tabular-nums outline-none selection:bg-primary selection:text-primary-foreground" />

          <Button
            slot="increment"
            className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-r-md border border-none bg-background text-sm text-muted-foreground transition-[color,box-shadow] hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <PlusIcon />
            <span className="sr-only">Increment</span>
          </Button>
        </Group>
      </NumberField>

      {description && (
        <FieldDescription className="px-1 text-xs text-muted-foreground">
          {description}
        </FieldDescription>
      )}
    </Field>
  )
}