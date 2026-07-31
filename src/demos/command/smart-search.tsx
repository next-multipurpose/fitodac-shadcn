"use client"

import { useMemo, useState } from "react"
import {
  CheckCircleIcon,
  FilterIcon,
  Sparkles,
  UserIcon,
  UserMinusIcon,
  XIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/primitives/avatar"
import { Button } from "@/registry/primitives/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/registry/primitives/command"

const actions = [
  {
    name: "Assign to Simon Prusin",
    avatar: "https://i.pravatar.cc/150?img=1",
    shortcut: null,
    icon: null,
  },
  {
    name: "Assign to...",
    avatar: null,
    shortcut: "A",
    icon: UserIcon,
  },
  {
    name: "Un-assign",
    avatar: null,
    shortcut: "U",
    icon: UserMinusIcon,
  },
]

const keywordResults = [
  {
    name: "Simon Prusin",
    subtitle: "simonprusin@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    kind: "person",
  },
  {
    name: "Sign up flow",
    subtitle: "Notion Page",
    avatar: null,
    kind: "notion",
  },
  {
    name: "Sign up flow Design",
    subtitle: "MSP-10",
    avatar: null,
    kind: "task",
  },
  {
    name: "Sign up Error",
    subtitle: "MSD_10",
    avatar: null,
    kind: "task",
  },
] as const

export default function CommandSmartSearchDemo() {
  const [search, setSearch] = useState("")

  const filteredActions = useMemo(
    () =>
      actions.filter((action) =>
        action.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  const filteredKeywords = useMemo(
    () =>
      keywordResults.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  return (
    <div className="w-full max-w-md rounded-lg border shadow-md">
      <Command shouldFilter={false}>
        <div className="flex items-center gap-2 border-b px-3">
          <div className="flex-1">
            <CommandInput
              placeholder="Search or type a command..."
              value={search}
              onValueChange={setSearch}
              className="border-0 shadow-none focus-visible:ring-0"
            />
          </div>
          <FilterIcon className="size-4 text-muted-foreground" />
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Clear search"
            disabled={!search}
            onClick={() => setSearch("")}
          >
            <XIcon />
          </Button>
        </div>

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {!search && (
            <CommandGroup>
              <CommandItem>
                <Sparkles />
                <span>Smart search</span>
                <CommandShortcut>⌘M</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          )}

          {filteredActions.length > 0 && (
            <CommandGroup heading="Actions">
              {filteredActions.map((action) => {
                const Icon = action.icon

                return (
                  <CommandItem key={action.name}>
                    {action.avatar ? (
                      <Avatar className="size-5">
                        <AvatarImage src={action.avatar} alt={action.name} />
                        <AvatarFallback>SP</AvatarFallback>
                      </Avatar>
                    ) : Icon ? (
                      <Icon />
                    ) : null}
                    <span>{action.name}</span>
                    {action.shortcut && (
                      <CommandShortcut>{action.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )}

          {filteredKeywords.length > 0 && (
            <CommandGroup heading="Keyword">
              {filteredKeywords.map((item) => (
                <CommandItem key={item.name}>
                  {item.avatar ? (
                    <Avatar className="size-5">
                      <AvatarImage src={item.avatar} alt={item.name} />
                      <AvatarFallback>SP</AvatarFallback>
                    </Avatar>
                  ) : item.kind === "notion" ? (
                    <div className="flex size-5 items-center justify-center rounded bg-foreground text-xs font-bold text-background">
                      N
                    </div>
                  ) : (
                    <CheckCircleIcon className="text-success" />
                  )}
                  <div className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>

        <div className="border-t px-3 py-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>↑↓ Navigate</span>
            <span>Enter Confirm</span>
            <span>Esc Close</span>
          </div>
        </div>
      </Command>
    </div>
  )
}
