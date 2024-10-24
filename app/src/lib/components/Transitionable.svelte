<script lang="ts" context="module">
	import { fade } from 'svelte/transition'
	import { crossfade } from '../transitions/crossfade'
	import type { Snippet } from 'svelte'

	let [send, receive] = crossfade({
		fallback: (node, params, flyingTo) =>
			fade(node, {
				...params,
				duration: 300,
				delay: flyingTo ? 200 : 0
			}),
		delay: 0,
		duration: (d) => Math.max(700, Math.sqrt(d) * 30)
	})
</script>

<script lang="ts">
	interface Props {
		src?: string
		className?: string
		alt?: string
		transitionId?: string
		children: Snippet
		getDimensions?: Function
	}

	let { src, className, alt = '', transitionId, children, getDimensions }: Props = $props()
	let width = $state()
	let height = $state()

	$effect(() => {
		getDimensions?.({ width, height })
	})
</script>

<div class={`relative ${className}`} bind:clientWidth={width} bind:clientHeight={height}>
	<div
		class="absolute h-full w-full overflow-hidden"
		out:send={{ key: transitionId }}
		in:receive={{ key: transitionId }}
	>
		{@render children()}
	</div>
</div>
