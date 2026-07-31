import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/primitives/avatar"
import { Button } from "@/registry/primitives/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/registry/primitives/dropdown-menu"

const contacts = [
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png",
    fallback: "AD",
    name: "Angel Dorwart",
    mail: "sbaker@hotmail.com",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png",
    fallback: "SR",
    name: "Skylar Rosser",
    mail: "gbaker@yahoo.com",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png",
    fallback: "DB",
    name: "Dulce Botosh",
    mail: "tlee@gmail.com",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png",
    fallback: "AS",
    name: "Ahmad Stanton",
    mail: "kdavis@hotmail.com",
  },
  {
    src: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png",
    fallback: "RG",
    name: "Randy Gouse",
    mail: "ijackson@yahoo.com",
  },
]

export default function DropdownMenuContactActionsDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu item with action</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-91">
        <DropdownMenuLabel>Contact List</DropdownMenuLabel>
        <DropdownMenuGroup>
          {contacts.map((contact) => (
            <DropdownMenuItem key={contact.name} asChild>
              <button
                type="button"
                className="flex w-full items-center gap-2 text-left"
              >
                <Avatar>
                  <AvatarImage src={contact.src} alt={contact.name} />
                  <AvatarFallback className="text-xs">
                    {contact.fallback}
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-1 flex-col">
                  <span className="text-popover-foreground">
                    {contact.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {contact.mail}
                  </span>
                </span>
                <span className="rounded-md bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground">
                  Send
                </span>
              </button>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem>Add Contact</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
