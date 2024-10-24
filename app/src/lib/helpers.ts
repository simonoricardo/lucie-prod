export function cssStringify(obj: Record<string, string | number>) {
	return Object.keys(obj)
		.map((k) => `${k}: ${obj[k]}`)
		.join(';')
}

export function imageUrl(url: string) {
	return new URL(url, import.meta.env.VITE_APP_URL).toString()
}
