<script lang="ts">
	import { fade } from 'svelte/transition'
	import { imageUrl } from '$lib/helpers'

	let { data } = $props()

	let documentId = $state(data.imageData.documentId)

	let currentIndex = $derived(
		data.paintingsIds.findIndex((element: string) => element === documentId)
	)

	let nextPaintingId = $derived.by(() => {
		if (currentIndex === data.paintingsIds.length - 1) {
			return null
		}
		return data.paintingsIds[currentIndex + 1]
	})

	let previousPaintingId = $derived.by(() => {
		if (currentIndex === 0) {
			return null
		}
		return data.paintingsIds[currentIndex - 1]
	})
</script>

<a href="/oeuvres" class="absolute left-16 top-16" in:fade={{ delay: 700 }}>Retour aux oeuvres</a>

{#if previousPaintingId}
	<a href={data.paintingsIds[currentIndex - 1]} class="absolute bottom-16 left-16"> Précédent </a>
{/if}

{#if nextPaintingId}
	<a href={data.paintingsIds[currentIndex + 1]} class="absolute bottom-16 right-16"> Prochain </a>
{/if}

<div class="flex h-full w-full items-center justify-between px-12 py-12" in:fade={{ delay: 700 }}>
	<div class="my-auto flex h-[50vh] w-full items-center gap-4">
		<img
			src={imageUrl(data.imageData.image.url)}
			alt="a painting"
			class="h-full w-full flex-1 rounded-xl object-contain"
		/>
		<p class="flex-1" out:fade={{ duration: 50 }}>
			Dolore nostrud culpa dolor est id veniam irure non deserunt aliqua est Lorem cupidatat
			exercitation. Nulla proident velit enim laborum. Tempor in exercitation veniam esse labore
			quis excepteur commodo laborum ad. Esse est id ipsum ad est occaecat. Irure pariatur proident
			fugiat minim voluptate deserunt aliquip tempor magna nulla consequat. Qui aute officia in
			veniam ex elit sunt veniam ad. Sint culpa aliquip nulla esse in enim voluptate dolore dolore
			id quis non ut amet ullamco. Amet ex nisi mollit minim minim ullamco ullamco minim ullamco.
			Proident aute deserunt minim laborum in labore enim. Laborum magna aliqua est incididunt.
			Mollit incididunt commodo sit sit et cillum. Consequat aliquip exercitation occaecat pariatur
			proident quis ad proident sit fugiat Lorem culpa esse ut. Laboris excepteur qui consequat
			voluptate proident cillum veniam sunt aute sunt. Magna cillum labore labore qui veniam.
			Consectetur cillum sunt excepteur cupidatat tempor id cupidatat ex in duis. Ipsum excepteur
			mollit commodo commodo Lorem cupidatat ad mollit qui ex excepteur. Excepteur eiusmod ut non.
			Duis elit qui consectetur enim et magna et exercitation culpa cillum velit. Labore id dolore
			duis qui.
		</p>
	</div>
</div>
