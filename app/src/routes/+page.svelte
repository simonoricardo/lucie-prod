<script lang="ts">
	import type { ImageAttributes } from './+page.server'
	import Carousel from 'svelte-carousel'
	import { browser } from '$app/environment'

	import MainMenu from '$lib/components/MainMenu.svelte'

	interface Props {
		data: {
			images: ImageAttributes[]
		}
	}

	let { data }: Props = $props()
	let carousel = $state()

	const imageUrl = (url: string) => {
		return new URL(url, import.meta.env.VITE_APP_URL).toString()
	}
</script>

<main class="flex h-full items-center">
	<div class="flex-start relative flex items-center overflow-hidden">
		{#if browser}
			<Carousel
				bind:this={carousel}
				autoplay
				autoplayDuration={0}
				autoplayDirection="next"
				duration={75000}
				infinite={true}
				timingFunction="linear"
				dots={false}
				arrows={false}
				swiping={false}
				particlesToShow={1.3}
			>
				{#each data.images as image (image.id)}
					<div class="width-160 mr-2 h-[90vh] rounded-3xl" data-id={image.id}>
						<img
							src={imageUrl(image.formats.large.url)}
							alt="Image #{image.id}"
							class="h-full w-full rounded-3xl bg-cover bg-center bg-no-repeat object-cover"
						/>
					</div>
				{/each}
			</Carousel>
		{/if}
		<div
			class="absolute bottom-0 left-0 right-0 top-0 m-auto h-full w-[75%] bg-white/80 backdrop-blur-lg md:left-12 md:m-0 md:w-128 lg:left-24"
		>
			<MainMenu />
		</div>
	</div>
</main>
