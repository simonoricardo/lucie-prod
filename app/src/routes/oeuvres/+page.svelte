<script lang="ts">
	import MainMenu from '$lib/components/MainMenu.svelte'
	import Transitionable from '$lib/components/Transitionable.svelte'
</script>

<div class="absolute left-0 top-0 m-auto h-full w-[75%] backdrop-blur-xl md:m-0 md:w-80">
	<Transitionable className="h-full">
		<MainMenu />
	</Transitionable>
</div>
