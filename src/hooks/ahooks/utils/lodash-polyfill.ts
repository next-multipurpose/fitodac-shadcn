function isNodeOrWeb() {
	const freeGlobal =
		(typeof global === "undefined" ? "undefined" : typeof global) === "object" &&
		global &&
		global.Object === Object &&
		global
	const freeSelf =
		typeof self === "object" && self && self.Object === Object && self
	return freeGlobal || freeSelf
}

if (!isNodeOrWeb()) {
	global.Date = Date
}

function debounce<T extends (...args: any[]) => void>(func: T, wait = 0) {
	let timeoutId: ReturnType<typeof setTimeout> | undefined

	return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}

export { debounce }
