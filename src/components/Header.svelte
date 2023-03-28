<script lang="ts">
	import { TierlistName } from '../helpers/stores';
	export let path: string;

	let links: { href: string; text: string; title: string }[] = [];

	$: {
		links = [
			{ href: '/', text: '← Tierlist', title: $TierlistName },
			{ href: '/browse', text: 'Browse Tierlists', title: 'Browse Tierlists' },
			{ href: '/create', text: 'Create a Tierlist', title: 'Create' },
			{ href: '/remix', text: 'Remix this Tierlist', title: 'Remix' }
		];
	}
</script>

<div class="bg-[#1a1a17] gap-2 p-1 px-2 text-zinc-300 flex items-center text-sm">
	<p class="text-lg">
		{links.find((link) => link.href === path)?.title}
	</p>
	<div class="flex-1" />
	{#each links as link}
		{#if path !== link.href}
			<span class="flex gap-1">[<a class="hover:opacity-75" href={link.href}>{link.text}</a>]</span>
		{/if}
	{/each}
	<a target="_blank" href="https://github.com/merkie/tierlist" class="hover:opacity-75 flex gap-2">
		<p>Source</p>
		<i class="bi bi-github" />
	</a>
</div>
