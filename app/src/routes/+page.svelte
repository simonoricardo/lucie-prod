<script lang="ts">
	import type { ImageAttributes } from './+page.server'
	import Carousel from 'svelte-carousel'
	import { browser } from '$app/environment'
	import { fade } from 'svelte/transition'

	import MainMenu from '$lib/components/MainMenu.svelte'
	import Transitionable from '$lib/components/Transitionable.svelte'
	import { navigating } from '$app/stores'
	import { imageUrl } from '$lib/helpers'

	interface Props {
		data: {
			images: ImageAttributes[]
		}
	}

	let { data }: Props = $props()

	let carousel = $state()
	let toLoad = $state(data.images.length)
	let autoplay = $state(false)

	$effect(() => {
		if (toLoad === 0) {
			autoplay = true
		}
	})
</script>

<svelte:head>
	{#each data.images as image (image.id)}
		<link
			rel="preload"
			href={imageUrl(image.formats.large.url)}
			as="image"
			onload={() => toLoad--}
		/>
	{/each}
</svelte:head>

{#if browser && autoplay && !$navigating}
	<div class="w-full overflow-hidden" transition:fade>
		<Carousel
			bind:this={carousel}
			{autoplay}
			autoplayDuration={0}
			duration={40000}
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
	</div>
{/if}
<div
	class={`absolute left-12 top-0 m-auto ${!$navigating && 'backdrop-blur-xl'} h-full w-[75%] md:m-0 md:w-128`}
>
	<Transitionable className="h-full">
		<MainMenu isMain></MainMenu>
	</Transitionable>
</div>
