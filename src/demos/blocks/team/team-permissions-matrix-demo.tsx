"use client"

import type { ComponentProps } from "react"
import TeamPermissionsMatrix from "@/registry/blocks/team/team-permissions-matrix"

export function TeamPermissionsMatrixDemo() {
	const exampleProps = (() => {
		return {}
	})()

	return (
		<TeamPermissionsMatrix
			{...(exampleProps as unknown as ComponentProps<
				typeof TeamPermissionsMatrix
			>)}
		/>
	)
}
