<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		to: string
		isMain?: boolean
		current: boolean
		children: Snippet
	}

	let { to, isMain = false, current, children }: Props = $props()
</script>

<li>
	<a
		href={to}
		class="blob-btn rounded-2xl font-serif {isMain ? 'text-xl' : 'text-md'} {current
			? 'bg-slate-600 text-slate-300'
			: 'bg-transparent text-slate-800'}"
	>
		{@render children()}
		<span class="blob-btn__inner">
			<span class="blob-btn__blobs">
				<span class="blob-btn__blob"></span>
				<span class="blob-btn__blob"></span>
				<span class="blob-btn__blob"></span>
				<span class="blob-btn__blob"></span>
			</span>
		</span>
	</a>
</li>

<style>
	:root {
		--button-border-radius: 1rem;
	}

	.blob-btn {
		z-index: 1;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 2rem;
		text-align: center;
		text-transform: uppercase;
		transition: color 0.5s;
	}

	.blob-btn:before {
		content: '';
		z-index: 1;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		/* border: 1px solid #94a3b8; */
		border-radius: var(--button-border-radius);
	}

	.blob-btn:after {
		content: '';
		z-index: -2;
		position: absolute;
		left: 3px;
		top: 3px;
		width: 100%;
		height: 100%;
		transition: all 0.3s 0.2s;
		border-radius: var(--button-border-radius);
	}

	.blob-btn:hover {
		color: #cbd5e1;
		border-radius: var(--button-border-radius);
	}

	.blob-btn:hover:after {
		transition: all 0.3s;
		left: 0;
		top: 0;
		border-radius: var(--button-border-radius);
	}

	.blob-btn__inner {
		z-index: -1;
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--button-border-radius);
		/* background-color: white; */
	}

	.blob-btn__blobs {
		position: relative;
		display: block;
		height: 100%;
	}

	.blob-btn__blob {
		position: absolute;
		top: 2px;
		width: 25%;
		height: 100%;
		background-color: #475569;
		border-radius: 100%;
		transform: translate3d(0, 150%, 0) scale(1.7);
		transition: transform 0.45s;
	}

	/* @supports (filter: url('#goo')) { */
	/* 	transform: translate3d(0, 150%, 0) scale(1.4); */
	/* } */

	.blob-btn__blob:nth-child(1) {
		left: 0%;
		transition-delay: 0s;
	}

	.blob-btn__blob:nth-child(2) {
		left: 30%;
		transition-delay: 0.08s;
	}

	.blob-btn__blob:nth-child(3) {
		left: 60%;
		transition-delay: 0.16s;
	}

	.blob-btn__blob:nth-child(4) {
		left: 90%;
		transition-delay: 0.24s;
	}

	.blob-btn:hover .blob-btn__blob {
		transform: translateZ(0) scale(1.7);
	}

	/* @supports (filter: url('#goo')) { */
	/* 	transform: translateZ(0) scale(1.4); */
	/* } */
</style>
