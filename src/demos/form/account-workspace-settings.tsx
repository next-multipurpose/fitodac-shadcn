"use client"

import { Button } from "@/registry/primitives/button"
import { Checkbox } from "@/registry/primitives/checkbox"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/primitives/select"
import { Separator } from "@/registry/primitives/separator"
import { Textarea } from "@/registry/primitives/textarea"
import { RadioGroup, RadioGroupItem } from "@/registry/primitives/radio-group"
import { useState } from "react"

const workspaces = [
	{
		id: 1,
		title: "Starter",
		description: "Up to 10,000 requests per day.",
		users: "Free",
	},
	{
		id: 2,
		title: "Premium",
		description: "500,000 requests per day¹",
		users: "$900/month²",
	},
	{
		id: 3,
		title: "Enterprise",
		description: "Based on your specific needs",
		users: "Custom",
	},
]

export default function Example() {
	const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0])

	return (
		<div className="mx-auto flex max-w-3xl items-center justify-center p-10">
			<form>
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					<div>
						<h2 className="font-semibold text-foreground dark:text-foreground">
							Personal information
						</h2>
						<p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
						</p>
					</div>
					<div className="sm:max-w-3xl md:col-span-2">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="first-name"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									First name
								</Label>
								<Input
									type="text"
									id="first-name"
									name="first-name"
									autoComplete="given-name"
									placeholder="Emma"
									className="mt-2"
								/>
							</div>
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="last-name"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Last name
								</Label>
								<Input
									type="text"
									id="last-name"
									name="last-name"
									autoComplete="family-name"
									placeholder="Crown"
									className="mt-2"
								/>
							</div>
							<div className="col-span-full">
								<Label
									htmlFor="email"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Email
								</Label>
								<Input
									type="email"
									id="email"
									name="email"
									autoComplete="email"
									placeholder="emma@company.com"
									className="mt-2"
								/>
							</div>
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="birthyear"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Birth year
								</Label>
								<Input
									type="number"
									id="birthyear"
									name="year"
									placeholder="1990"
									className="mt-2"
								/>
							</div>
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="role"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Role
								</Label>
								<Input
									type="text"
									id="role"
									name="role"
									placeholder="Senior Manager"
									disabled
									className="mt-2"
								/>
								<p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
									Roles can only be changed by system admin.
								</p>
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-8" />
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					<div>
						<h2 className="font-semibold text-foreground dark:text-foreground">
							Workspace settings
						</h2>
						<p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
						</p>
					</div>
					<div className="sm:max-w-3xl md:col-span-2">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="workspace-name"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Workspace name
								</Label>
								<Input
									type="text"
									id="workspace-name"
									name="workspace-name"
									placeholder="Test workspace"
									className="mt-2"
								/>
							</div>
							<div className="col-span-full sm:col-span-3">
								<Label
									htmlFor="visibility"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Visibility
								</Label>
								<Select name="visibility" defaultValue="private">
									<SelectTrigger id="visibility" className="mt-2 w-full">
										<SelectValue placeholder="Select visibility" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="public">Public</SelectItem>
										<SelectItem value="private">Private</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="col-span-full">
								<Label
									htmlFor="workspace-description"
									className="text-sm font-medium text-foreground dark:text-foreground"
								>
									Workspace description
								</Label>
								<Textarea
									id="workspace-description"
									name="workspace-description"
									className="mt-2"
									rows={4}
								/>
								<p className="mt-2 text-xs text-muted-foreground dark:text-muted-foreground">
									Note: description provided will not be displayed externally.
								</p>
							</div>
						</div>
					</div>
				</div>
				<Separator className="my-8" />
				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					<div>
						<h2 className="font-semibold text-foreground dark:text-foreground">
							Notification settings
						</h2>
						<p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
						</p>
					</div>
					<div className="sm:max-w-3xl md:col-span-2">
						<fieldset>
							<legend className="text-sm font-medium text-foreground dark:text-foreground">
								Team
							</legend>
							<p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
								Configure the types of team alerts you want to receive.
							</p>
							<div className="mt-2">
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox
										id="team-requests"
										name="team-requests"
										defaultChecked
									/>
									<Label
										htmlFor="team-requests"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										Team join requests
									</Label>
								</div>
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox
										id="team-activity-digest"
										name="team-activity-digest"
									/>
									<Label
										htmlFor="team-activity-digest"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										Weekly team activity digest
									</Label>
								</div>
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox id="api-requests" name="api-requests" />
									<Label
										htmlFor="api-requests"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										API requests
									</Label>
								</div>
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox
										id="workspace-execution"
										name="workspace-execution"
										defaultChecked
									/>
									<Label
										htmlFor="workspace-execution"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										Workspace loading times
									</Label>
								</div>
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox
										id="query-caching"
										name="query-caching"
										defaultChecked
									/>
									<Label
										htmlFor="query-caching"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										Query caching
									</Label>
								</div>
								<div className="flex items-center gap-x-3 py-1">
									<Checkbox id="storage" name="storage" />
									<Label
										htmlFor="storage"
										className="text-sm font-medium text-foreground dark:text-foreground"
									>
										Storage
									</Label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
				<Separator className="my-8" />

				<div className="grid grid-cols-1 gap-10 md:grid-cols-3">
					<div>
						<h2 className="font-semibold text-foreground dark:text-foreground">
							Select a workspace package
						</h2>
						<p className="mt-1 text-sm leading-6 text-muted-foreground dark:text-muted-foreground">
							Lorem ipsum dolor sit amet.
						</p>
					</div>
					<div className="sm:max-w-3xl md:col-span-2">
						<fieldset>
							<RadioGroup
								className="grid grid-cols-1 gap-5 sm:grid-cols-3"
								defaultValue={selectedWorkspace.id.toString()}
								onValueChange={(value) =>
									setSelectedWorkspace(
										workspaces.find(
											(workspace) => workspace.id.toString() === value
										) || workspaces[0]
									)
								}
							>
								{workspaces.map((item) => (
									<div
										key={item.id.toString()}
										className="relative flex flex-col gap-2 rounded-md border border-input p-4 shadow-xs outline-none has-data-[state=checked]:border-ring"
									>
										<div className="flex justify-between">
											<RadioGroupItem
												id={item.id.toString()}
												value={item.id.toString()}
												className="order-1 after:absolute after:inset-0"
											/>

											<Label
												htmlFor={item.id.toString()}
												className="block text-sm font-medium text-foreground"
											>
												{item.title}
											</Label>
										</div>
										<div className="flex h-full flex-col justify-between">
											<p className="mt-1 text-sm text-muted-foreground">
												{item.description}
											</p>
											<span className="mt-4 block text-sm font-medium text-foreground">
												{item.users}
											</span>
										</div>
									</div>
								))}
							</RadioGroup>
						</fieldset>
					</div>
				</div>
				<Separator className="my-8" />
				<div className="flex items-center justify-end space-x-4">
					<Button type="button" variant="outline" className="whitespace-nowrap">
						Go back
					</Button>
					<Button type="submit" className="whitespace-nowrap">
						Save settings
					</Button>
				</div>
			</form>
		</div>
	)
}
