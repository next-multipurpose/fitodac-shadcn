import type { DependencyList } from "react"

export const depsEqual = (
	aDeps: DependencyList = [],
	bDeps: DependencyList = []
) =>
	aDeps.length === bDeps.length &&
	aDeps.every((dependency, index) => Object.is(dependency, bDeps[index]))
