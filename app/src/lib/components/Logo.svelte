<script lang="ts">
	interface Props {
		size?: string
		classes?: string[]
		subSize?: string
	}

	let { size, classes = [], subSize = 'text-lg' }: Props = $props()
</script>

<div class="p-4 text-center {[...classes]}">
	<h1 class="font-display {size ?? 'text-6xl'}">Lucie Langlois</h1>
	<p class="mt-2 {subSize} font-bold">ART FLUIDE</p>
</div>
