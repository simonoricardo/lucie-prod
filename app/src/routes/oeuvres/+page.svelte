<script lang="ts">
	import MainMenu from '$lib/components/MainMenu.svelte'
	import Transitionable from '$lib/components/Transitionable.svelte'
	import { fade } from 'svelte/transition'
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

<div class="absolute left-0 top-0 m-auto h-full w-[75%] backdrop-blur-xl md:m-0 md:w-80">
	<Transitionable className="h-full" {getDimensions}>
		<MainMenu />
	</Transitionable>
</div>
<div
	class="ml-auto overflow-scroll"
	style="width: calc(100% - {menuDimensions.width}px"
	in:fade={{ delay: 500 }}
	out:fade
>
	<div
		class="grid h-full w-full grid-flow-dense grid-cols-[repeat(auto-fill,minmax(260px,1fr))] grid-rows-[repeat(auto-fit,260px)] gap-2 p-4"
	>
		{#each data.imagesData as imageData (imageData.id)}
			<img
				src={imageUrl(imageData.image.formats.medium.url)}
				style={imageGridStyle(imageData.image.formats.medium)}
				width={imageData.image.formats.medium.width}
				height={imageData.image.formats.medium.height}
				class="object-fit h-full w-full min-w-0 rounded-xl object-cover"
				alt="a painting"
			/>
		{/each}
	</div>
</div>
