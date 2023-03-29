<script lang="ts">
	import { onMount } from 'svelte';
	import { TierlistName, TierlistSlug } from '../helpers/stores';
	export let path: string;

	let links: { href: string; text: string; title?: string }[] = [
		{ href: '/', text: '← Tierlist' },
		{ href: '/browse', text: 'Browse Tierlists', title: 'Browse Tierlists' },
		{ href: '/create', text: 'Create a Tierlist', title: 'Create a Tierlist' },
		{ href: '/remix', text: 'Remix this Tierlist', title: 'Remix' }
	];

	let copied = false;

	const copyLink = async () => {
		navigator.clipboard.writeText(`https://tierlist-ten.vercel.app/tl/${$TierlistSlug}`);
		copied = true;
		await new Promise((resolve) => setTimeout(resolve, 2000));
		copied = false;
	};
</script>

<div class="bg-[#1a1a17] gap-2 p-1 px-2 text-zinc-300 flex items-center text-sm">
	<p class="text-lg">
		{#if path === '/' || path.startsWith('/tl')}
			{$TierlistName}
		{:else}
			{links.find((link) => link.href === path)?.title}
		{/if}
	</p>
	<div class="flex-1" />
	{#if ['/browse'].includes(path)}
		<span class="flex gap-1">[<a class="hover:opacity-75" href="/">{'← Tierlist'}</a>]</span>
	{/if}

	{#if ['/'].includes(path)}
		<span class="flex gap-1"
			>[<span on:click={copyLink} on:keypress={() => null} class="hover:opacity-75 cursor-pointer"
				>{copied ? 'Copied!' : 'Copy Link 🔗'}</span
			>]</span
		>
	{/if}

	{#if ['/', '/create', '/remix'].includes(path) || path.startsWith('/tl')}
		<span class="flex gap-1">[<a class="hover:opacity-75" href="/browse">Browse Tierlists</a>]</span
		>
	{/if}

	{#if ['/', '/browse'].includes(path)}
		<span class="flex gap-1"
			>[<a class="hover:opacity-75" href="/create">Create a Tierlist</a>]</span
		>
	{/if}

	{#if ['/'].includes(path) || path.startsWith('/tl')}
		<span class="flex gap-1"
			>[<a class="hover:opacity-75" href="/remix">Remix this Tierlist</a>]</span
		>
	{/if}
	<a target="_blank" href="https://github.com/merkie/tierlist" class="hover:opacity-75 flex gap-2">
		<p>Source</p>
		<i class="bi bi-github" />
	</a>
</div>
