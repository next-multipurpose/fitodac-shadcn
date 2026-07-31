import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/registry/primitives/command"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/primitives/avatar"
import { UserIcon } from "lucide-react"

const users = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		avatar: "https://i.pravatar.cc/150?img=1",
		role: "Developer",
	},
	{
		id: 2,
		name: "Sarah Miller",
		email: "sarah@example.com",
		avatar: "https://i.pravatar.cc/150?img=2",
		role: "Designer",
	},
	{
		id: 3,
		name: "Mike Johnson",
		email: "mike@example.com",
		avatar: "https://i.pravatar.cc/150?img=3",
		role: "Manager",
	},
	{
		id: 4,
		name: "Emma Wilson",
		email: "emma@example.com",
		avatar: "https://i.pravatar.cc/150?img=4",
		role: "Developer",
	},
]

export default function CommandUserSearchDemo() {
	return (
		<div className="w-full rounded-lg border shadow-md">
			<Command>
				<CommandInput placeholder="Search users by name or email..." />
				<CommandList>
					<CommandEmpty>No users found.</CommandEmpty>
					<CommandGroup heading="Users">
						{users.map((user) => (
							<CommandItem key={user.id}>
								<Avatar className="size-6">
									<AvatarImage src={user.avatar} alt={user.name} />
									<AvatarFallback>
										{user.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span>{user.name}</span>
									<span className="text-xs text-muted-foreground">
										{user.email}
									</span>
								</div>
								<span className="ml-auto text-xs text-muted-foreground">
									{user.role}
								</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Actions">
						<CommandItem>
							<UserIcon />
							<span>Add New User</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</div>
	)
}
