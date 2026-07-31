"use client"

import { useId } from "react"

import { Input } from "@/registry/primitives/input"
import { Label } from "@/registry/primitives/label"

export default function InputRoundedDemo() {
	const id = useId()

	return (
		<div className="w-full max-w-xs space-y-2">
			<Label htmlFor={id}>Rounded input</Label>
			<Input
				id={id}
				type="email"
				placeholder="Email address"
				className="rounded-full"
			/>
		</div>
	)
}
