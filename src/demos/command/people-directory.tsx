"use client"

import { useMemo, useState } from "react"
import {
  CheckIcon,
  ExternalLinkIcon,
  MapPinIcon,
  MoreHorizontalIcon,
  SearchIcon,
  StarIcon,
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
  CommandItem,
  CommandList,
} from "@/registry/primitives/command"
import { Input } from "@/registry/primitives/input"
import { ScrollArea } from "@/registry/primitives/scroll-area"

const users = [
  {
    id: 1,
    name: "Frankie Sullivan",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Melbourne, Australia",
    verified: true,
    bio: "Frontend developer open to new opportunities and collaboration.",
  },
  {
    id: 2,
    name: "Amélie Laurent",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "London, United Kingdom",
    verified: true,
    bio: "Frontend developer focused on product quality and accessible interfaces.",
  },
  {
    id: 3,
    name: "Olive Nacelle",
    avatar: "https://i.pravatar.cc/150?img=33",
    location: "Paris, France",
    verified: false,
    bio: "Product designer passionate about creating thoughtful user experiences.",
  },
  {
    id: 4,
    name: "Oliver Chamberlain",
    avatar: "https://i.pravatar.cc/150?img=25",
    location: "New York, USA",
    verified: true,
    bio: "Full-stack developer working on modern web applications.",
  },
  {
    id: 5,
    name: "Andi Lane",
    avatar: "https://i.pravatar.cc/150?img=19",
    location: "San Francisco, USA",
    verified: false,
    bio: "UI/UX designer focused on intuitive and accessible product design.",
  },
  {
    id: 6,
    name: "Drew Cano",
    avatar: "https://i.pravatar.cc/150?img=51",
    location: "Berlin, Germany",
    verified: true,
    bio: "Backend engineer specializing in scalable systems and APIs.",
  },
  {
    id: 7,
    name: "Sophia Munn",
    avatar: "https://i.pravatar.cc/150?img=45",
    location: "Tokyo, Japan",
    verified: false,
    bio: "Creative director with expertise in branding and visual identity.",
  },
]

export default function CommandPeopleDirectoryDemo() {
  const [selectedUser, setSelectedUser] = useState(users[1])
  const [search, setSearch] = useState("")

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.location.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  )

  return (
    <div className="flex h-[600px] w-full max-w-5xl overflow-hidden rounded-lg border bg-background shadow-lg">
      <div className="flex w-full flex-col">
        <div className="border-b p-4">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or location"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9 pr-12"
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
              ⌘K
            </span>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex w-80 flex-col border-r">
            <ScrollArea className="flex-1">
              <Command shouldFilter={false} className="h-full rounded-none">
                <CommandList>
                  <CommandEmpty>No users found.</CommandEmpty>
                  <CommandGroup>
                    {filteredUsers.map((user) => (
                      <CommandItem
                        key={user.id}
                        value={user.name}
                        onSelect={() => setSelectedUser(user)}
                        className={
                          selectedUser.id === user.id ? "bg-muted" : undefined
                        }
                      >
                        <Avatar className="size-10">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((part) => part[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium">
                              {user.name}
                            </span>
                            {user.verified && (
                              <CheckIcon className="size-4 text-primary" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPinIcon className="size-3" />
                            <span>{user.location}</span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </ScrollArea>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <div className="mx-auto max-w-md">
                <div className="relative mb-4">
                  <div className="relative mx-auto size-24">
                    <Avatar className="size-24">
                      <AvatarImage
                        src={selectedUser.avatar}
                        alt={selectedUser.name}
                      />
                      <AvatarFallback>
                        {selectedUser.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedUser.verified && (
                      <div className="absolute right-0 bottom-0 rounded-full border-2 bg-background p-0.5">
                        <CheckIcon className="size-4 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="absolute top-0 right-0 flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Favorite profile"
                    >
                      <StarIcon />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="More profile actions"
                    >
                      <MoreHorizontalIcon />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {selectedUser.name}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {selectedUser.bio}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    <Button variant="outline" size="sm">
                      Portfolio
                      <ExternalLinkIcon />
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      Message
                    </Button>
                    <Button className="flex-1">Follow</Button>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
