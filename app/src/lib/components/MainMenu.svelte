<script lang="ts">
	import Logo from './Logo.svelte'
	import MenuLink from './MenuLink.svelte'
	import { page } from '$app/stores'

	let { isMain = false } = $props()
	let activePage = $derived($page.url.pathname)
</script>

<section class="flex h-full w-full flex-col items-center bg-gray-200/50 pb-8">
	<a href="/">
		<Logo
			classes={['m-8 mb-0']}
			size={isMain ? 'text-7xl' : 'text-4xl'}
			subSize={isMain ? 'text-lg' : 'text-md'}
		/>
	</a>
	<ul class="my-auto flex flex-col gap-8 text-lg">
		<MenuLink to="/demarche" {isMain} current={activePage === '/demarche'}
			>Démarche artistique</MenuLink
		>
		<MenuLink to="/oeuvres" {isMain} current={activePage === '/oeuvres'}>Oeuvres</MenuLink>
		<MenuLink to="/contact" {isMain} current={activePage === '/contact'}>Contact</MenuLink>
		<MenuLink to="/calendrier" {isMain} current={activePage === '/calendrier'}>Calendrier</MenuLink>
	</ul>
</section>
