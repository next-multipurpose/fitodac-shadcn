"use client"

import { useId } from "react"

import { Field, FieldLabel } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { CreditCardIcon } from "lucide-react"
import { usePaymentInputs } from "react-payment-inputs"
import images, { type CardImages } from "react-payment-inputs/images"
import { Separator } from "@/registry/primitives/separator"

export default function InputGroupCreditCardDetailsDemo() {
  const id = useId()

  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs()

  return (
    <Field>
      <FieldLabel htmlFor={`number-${id}`}>Card Details</FieldLabel>

      <div className="flex flex-col gap-0">
        <InputGroup className="rounded-b-none shadow-none">
          <InputGroupInput
            className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
            {...getCardNumberProps()}
            id={`number-${id}`}
          />

          <InputGroupAddon align="inline-end">
            {meta.cardType ? (
              <svg
                className="overflow-hidden rounded-sm"
                {...getCardImageProps({
                  images: images as unknown as CardImages,
                })}
                width={20}
              />
            ) : (
              <CreditCardIcon aria-hidden="true" size={16} />
            )}
          </InputGroupAddon>
        </InputGroup>

        <InputGroup className="-mt-px rounded-t-none shadow-none">
          <InputGroupInput
            className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
            {...getExpiryDateProps()}
            id={`expiry-${id}`}
          />

          <Separator orientation="vertical" />

          <InputGroupInput
            className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
            {...getCVCProps()}
            id={`cvc-${id}`}
          />
        </InputGroup>
      </div>
    </Field>
  )
}
