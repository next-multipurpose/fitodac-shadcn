"use client"

import { useId } from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "@/registry/primitives/button"
import { Field, FieldError } from "@/registry/primitives/field"
import { Textarea } from "@/registry/primitives/textarea"
import { Label } from "@/registry/primitives/label"

type FormValues = {
  message: string
}

export default function TextareaFormValidationDemo() {
  const id = useId()

  const form = useForm<FormValues>({
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = (_data: FormValues) => undefined

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
      <Controller
        control={form.control}
        name="message"
        rules={{
          minLength: {
            value: 10,
            message: "Message must be at least 10 characters",
          },
        }}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <Label htmlFor={id}>Message</Label>
            <Textarea
              {...field}
              id={id}
              placeholder="Leave a comment"
              aria-invalid={fieldState.invalid}
              className="min-h-30"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Button type="submit" className="w-full">
        Send
      </Button>
    </form>
  )
}
