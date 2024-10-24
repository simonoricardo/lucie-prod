<script lang="ts">
	import MainMenu from '$lib/components/MainMenu.svelte'
	import Transitionable from '$lib/components/Transitionable.svelte'
	import { fade, scale } from 'svelte/transition'
	import { imageUrl, cssStringify } from '$lib/helpers'

	let { data } = $props()

	let menuDimensions = $state({ width: 0, height: 0 })

	function getDimensions(dimensions: { width: number; height: number }) {
		menuDimensions = { ...dimensions }
	}

	function imageGridStyle(image: HTMLImageElement) {
		const { columnSpan, rowSpan } = getSpanEstimate(image)

		const style = {
			'grid-column-end': `span ${columnSpan}`,
			'grid-row-end': `span ${rowSpan}`
		}

		return cssStringify(style)
	}

	function getSpanEstimate(image: HTMLImageElement) {
		const { width, height } = image

		const aspectRatio = width / height

		if (aspectRatio > 1.5) {
			return { columnSpan: 2, rowSpan: 1 }
		} else if (aspectRatio < 0.67) {
			return { columnSpan: 1, rowSpan: 2 }
		}

		return { columnSpan: 1, rowSpan: 1 }
	}
</script>

<svelte:head>
	{#each data.imagesData as imageData (imageData.documentId)}
		<link rel="preload" href={imageUrl(imageData.image.formats.medium.url)} as="image" />
	{/each}
</svelte:head>

<div class="absolute left-0 top-0 m-auto h-full w-[75%] backdrop-blur-xl md:m-0 md:w-80">
	<Transitionable className="h-full" {getDimensions}>
		<MainMenu />
	</Transitionable>
</div>
<div
	class="ml-auto overflow-scroll"
	style="width: calc(100% - {menuDimensions.width}px"
	in:fade={{ delay: 1000 }}
	out:fade={{ duration: 10 }}
>
	<div
		class="grid h-full w-full grid-flow-dense grid-cols-[repeat(auto-fill,minmax(260px,1fr))] grid-rows-[repeat(auto-fit,260px)] gap-4 p-4"
	>
		{#each data.imagesData as imageData (imageData.id)}
			<a
				href="oeuvres/{imageData.documentId}"
				style={imageGridStyle(imageData.image.formats.medium)}
				class="group relative overflow-hidden transition-transform"
			>
				<img
					src={imageUrl(imageData.image.formats.medium.url)}
					class="h-full w-full rounded-xl object-cover transition-shadow group-hover:shadow-lg"
					alt="a painting"
				/>
				<p
					class="absolute bottom-0 w-full translate-y-160 rounded-lg bg-gray-900/35 p-4 pb-24 text-white backdrop-blur-md transition-transform group-hover:-translate-y-0"
				>
					Some more information
				</p>
			</a>
		{/each}
	</div>
</div>
