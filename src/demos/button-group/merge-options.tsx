"use client"

import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/registry/primitives/button"
import { ButtonGroup } from "@/registry/primitives/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

const options = [
  {
    description:
      "All commits from this branch will be added to the base branch via a commit version.",
    label: "Merge pull request",
  },
  {
    description:
      "The 6 commits from this branch will be combined into one commit in the base branch.",
    label: "Squash and merge",
  },
  {
    description:
      "The 6 commits from this branch will be rebased and added to the base branch.",
    label: "Rebase and merge",
  },
]

export default function ButtonGroupMergeOptionsDemo() {
  const [selectedIndex, setSelectedIndex] = useState("0")

  return (
    <ButtonGroup>
      <Button className="shadow-none focus-visible:z-10">
        {options[Number(selectedIndex)].label}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Options"
            className="shadow-none focus-visible:z-10"
            size="icon"
          >
            <ChevronDownIcon aria-hidden="true" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="max-w-64 md:max-w-xs"
          side="bottom"
          sideOffset={4}
        >
          <DropdownMenuRadioGroup
            onValueChange={setSelectedIndex}
            value={selectedIndex}
          >
            {options.map((option, index) => (
              <DropdownMenuRadioItem
                className="items-start [&>span]:pt-1.5"
                key={option.label}
                value={String(index)}
              >
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{option.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {option.description}
                  </span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
