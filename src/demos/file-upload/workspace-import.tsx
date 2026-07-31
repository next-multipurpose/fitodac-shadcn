"use client"

import { Button } from "@/registry/primitives/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/registry/primitives/card"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function FileUploadWorkspaceImportDemo() {
	return (
		<Card className="shadow-none">
			<CardHeader>
				<CardTitle>Set up your first workspace</CardTitle>
				<CardDescription>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={(event) => event.preventDefault()}>
					<div className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="workspace-name">
								Workspace <span className="text-destructive">*</span>
							</Label>
							<Input
								type="text"
								id="workspace-name"
								name="workspace-name"
								autoComplete="workspace-name"
								placeholder="Workspace name"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="file-1">
								Upload file <span className="text-destructive">*</span>
							</Label>
							<Input
								id="file-1"
								name="file-1"
								type="file"
								accept=".csv, .xlsx, .xls"
							/>
							<p className="text-sm text-pretty text-muted-foreground">
								You are only allowed to upload CSV, XLSX or XLS files.
							</p>
						</div>
					</div>
					<div className="mt-8 flex justify-end space-x-3">
						<Button type="button" variant="outline">
							Cancel
						</Button>
						<Button type="submit">Submit</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	)
}
