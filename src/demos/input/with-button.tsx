"use client"

import { useId } from "react"

import { Button } from "@/registry/primitives/button"
import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function InputWithButtonDemo() {
	const id = useId()

	return (
		<div className="w-full max-w-xs space-y-2">
			<Label htmlFor={id}>Input with button</Label>

			<div className="flex gap-2">
				<Input id={id} type="email" placeholder="Email address" />
				<Button type="button">Subscribe</Button>
			</div>
		</div>
	)
}
