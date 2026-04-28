export function navigateTo(path?: string) {
	if (path && typeof window !== "undefined") {
		window.location.href = path
	}
}
