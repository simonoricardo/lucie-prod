import type { PageServerLoad } from './$types'

interface ImageData {
	id: number
	ext: string
	url: string
	hash: string
	mime: string
	name: string
	path: string | null
	size: number
	width: number
	height: number
	sizeInBytes: number
}

interface ImageResponse {
	data: {
		images: [
			{
				id: number
				attributes: ImageAttributes
			}
		]
	}
}

export interface ImageAttributes {
	id: number
	name: string
	alternativeText: string | null
	caption: string | null
	width: number
	height: number
	formats: {
		large: ImageData
		small: ImageData
		medium: ImageData
		thumbnail: ImageData
	}
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl: string | null
	provider: string | null
	provider_metadata: string | null
	createdAt: string
	updatedAt: string
}

export const load: PageServerLoad = async ({}) => {
	const res = await fetch(
		`${import.meta.env.VITE_API_BASE_URL}home-pages/sy5lxxc41nsju2of5oc9mxz3?populate=*`,
		{
			headers: new Headers({
				Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN
			})
		}
	)

	const response = await res.json()

	const {
		data: { images }
	} = response as ImageResponse

	const transformedImages = images
		.map((value) => ({ value, sort: Math.random() }))
		.sort((a, b) => a.sort - b.sort)
		.map(({ value }) => value)

	return {
		images: transformedImages
	}
}
