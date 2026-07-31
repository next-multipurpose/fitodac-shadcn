"use client"

import { useMemo, useState } from "react"
import { FileIcon, Sparkles, TerminalIcon, UsersIcon } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/primitives/command"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/primitives/toggle-group"

type FilterType = "all" | "files" | "people" | "commands"

type SearchItem = {
  name: string
  category: Exclude<FilterType, "all">
  detail: string
}

const aiPrompts = [
  "Generate today sales summary",
  "Create action items based on today's forecast",
]

const recentSearches = [
  { name: "My Inbox", subtitle: "Mail", icon: "📥" },
  { name: "Add new task", subtitle: "Personal Draft", icon: "➕" },
  { name: "Data Analyst Team", subtitle: "Group Chat", icon: "👥" },
]

const searchableItems: SearchItem[] = [
  { name: "document.pdf", category: "files", detail: "PDF" },
  { name: "spreadsheet.xlsx", category: "files", detail: "Excel" },
  { name: "presentation.pptx", category: "files", detail: "PowerPoint" },
  { name: "image.jpg", category: "files", detail: "Image" },
  { name: "John Doe", category: "people", detail: "john@example.com" },
  { name: "Sarah Miller", category: "people", detail: "sarah@example.com" },
  { name: "Mike Johnson", category: "people", detail: "mike@example.com" },
  { name: "Emma Wilson", category: "people", detail: "emma@example.com" },
  { name: "New File", category: "commands", detail: "⌘N" },
  { name: "Save", category: "commands", detail: "⌘S" },
  { name: "Search", category: "commands", detail: "⌘K" },
  { name: "Settings", category: "commands", detail: "⌘," },
]

const categoryIcon = {
  files: FileIcon,
  people: UsersIcon,
  commands: TerminalIcon,
}

export default function CommandFilteredSearchDemo() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [search, setSearch] = useState("")

  const filteredItems = useMemo(() => {
    const term = search.trim().toLowerCase()

    return searchableItems.filter((item) => {
      const matchesFilter = filter === "all" || item.category === filter
      const matchesSearch =
        !term ||
        item.name.toLowerCase().includes(term) ||
        item.detail.toLowerCase().includes(term)

      return matchesFilter && matchesSearch
    })
  }, [filter, search])

  const showSuggestions = filter === "all" && !search

  return (
    <div className="w-full max-w-md rounded-lg border shadow-md">
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search or type a command..."
          value={search}
          onValueChange={setSearch}
        />
        <div className="border-b px-3 py-2">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(value) => value && setFilter(value as FilterType)}
            variant="outline"
            className="w-full justify-start"
          >
            <ToggleGroupItem value="all" aria-label="All">
              All
            </ToggleGroupItem>
            <ToggleGroupItem value="files" aria-label="Files">
              Files
            </ToggleGroupItem>
            <ToggleGroupItem value="people" aria-label="People">
              People
            </ToggleGroupItem>
            <ToggleGroupItem value="commands" aria-label="Commands">
              Commands
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {showSuggestions ? (
            <>
              <CommandGroup heading="AI Prompts">
                {aiPrompts.map((prompt) => (
                  <CommandItem key={prompt}>
                    <Sparkles />
                    <span>{prompt}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandGroup heading="Recent Searches">
                {recentSearches.map((item) => (
                  <CommandItem key={item.name}>
                    <span>{item.icon}</span>
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {item.subtitle}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          ) : (
            <CommandGroup
              heading={filter === "all" ? "Results" : `${filter[0].toUpperCase()}${filter.slice(1)}`}
            >
              {filteredItems.map((item) => {
                const Icon = categoryIcon[item.category]

                return (
                  <CommandItem key={`${item.category}-${item.name}`}>
                    <Icon />
                    <span>{item.name}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.detail}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          )}
        </CommandList>
      </Command>
    </div>
  )
}
