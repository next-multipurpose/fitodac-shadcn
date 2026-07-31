"use client"

import { useState } from "react"

import { Checkbox } from "@/registry/primitives/checkbox"
import { Field } from "@/registry/primitives/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/primitives/input-group"
import { Label } from "@/registry/primitives/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/primitives/popover"
import { ListFilterIcon, SearchIcon, XIcon } from "lucide-react"
import { Button } from "@/registry/primitives/button"

const statuses = ["Pending", "Shipped", "Cancelled"] as const

type Status = (typeof statuses)[number]

function toggleStatus(values: Status[], value: Status) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value]
}

export default function InputGroupOrderSearchFilterDemo() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([])

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <InputGroupAddon align="inline-end" className="gap-1">
          {searchQuery.length > 0 ? (
            <InputGroupButton
              aria-label="Clear search"
              size="icon-xs"
              variant="ghost"
              onClick={() => setSearchQuery("")}
            >
              <XIcon aria-hidden="true" />
            </InputGroupButton>
          ) : null}

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="xs"
                className="gap-1.5"
                aria-label="Filter order status"
              >
                <ListFilterIcon className="size-3.5" aria-hidden="true" />
                Status
                {selectedStatuses.length > 0 ? (
                  <span className="text-muted-foreground tabular-nums">
                    {selectedStatuses.length}
                  </span>
                ) : null}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-40 p-3">
              <div className="flex flex-col gap-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`order-status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() =>
                        setSelectedStatuses((previous) =>
                          toggleStatus(previous, status)
                        )
                      }
                    />
                    <Label
                      htmlFor={`order-status-${status}`}
                      className="text-sm font-normal"
                    >
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
