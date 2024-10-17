<script lang="ts">
	interface Props {
		size?: string
		classes?: string[]
	}

	let { size, classes = [] }: Props = $props()
</script>

<div class={`p-4 text-center ${[...classes]}`}>
	<h1 class={`font-display ${size ?? 'text-6xl'}`}>Lucie Langlois</h1>
	<p class="mt-2 text-lg font-bold">ART FLUIDE</p>
</div>
