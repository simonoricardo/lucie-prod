import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}paintings/?populate=*`, {
		headers: new Headers({
			Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
		})
	})

	const { data } = await res.json()

	const paintingsIds = data.reduce((acc: Array<string>, current: Record<string, string>) => {
		const ids = [...acc, current.documentId]
		return ids
	}, [])

	return {
		url: url.pathname,
		paintingsIds: paintingsIds
	}
}
