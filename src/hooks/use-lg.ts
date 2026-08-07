import { useEffect, useState } from "react"

export function useIsLg() {
	const [isLg, setIsLg] = useState(false)

	useEffect(() => {
		if (typeof window === "undefined") return
		const check = () =>
			setIsLg(window.matchMedia("(min-width: 1024px)").matches)
		check()
		window.addEventListener("resize", check)
		return () => window.removeEventListener("resize", check)
	}, [])

	return isLg
}
