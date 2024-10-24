import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
	const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}paintings/${params.id}?populate=*`, {
		headers: new Headers({
			Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
		})
	})
	const { data } = await res.json()

	return {
		imageData: data
	}
}
