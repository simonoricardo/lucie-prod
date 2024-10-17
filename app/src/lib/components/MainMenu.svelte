<script lang="ts">
	import Logo from './Logo.svelte'
	import MenuLink from './MenuLink.svelte'
</script>

<section class="flex h-full flex-col items-center pb-8">
	<Logo classes={['m-8 mb-0']} size="text-7xl" />
	<ul class="my-auto flex flex-col gap-8 text-lg">
		<MenuLink to="/demarche">Démarche artistique</MenuLink>
		<MenuLink to="/oeuvres">Oeuvres</MenuLink>
		<MenuLink to="/contact">Contact</MenuLink>
		<MenuLink to="/calendrier">Calendrier</MenuLink>
	</ul>
</section>
