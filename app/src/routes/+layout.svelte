<script lang="ts">
	import type { Snippet } from 'svelte'
	import '../app.css'

	interface Props {
		data: { url: string }
		children: Snippet
	}

	let { data, children }: Props = $props()

	let url = $derived(data.url)
</script>

<main class="flex h-full items-center">
	<div
		class="flex-start relative flex {url === '/'
			? 'h-[90vh] items-center'
			: 'h-full'} w-full overflow-hidden"
	>
		{#key url}
			{@render children()}
		{/key}
	</div>
</main>
