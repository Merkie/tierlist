<script lang="ts">
	import type { Tierlist, SortableItem } from '@prisma/client';
	import loadTierlist from '../../helpers/loadTierlist';
	import {
		TierlistCategories,
		TierlistName,
		TierlistItems,
		TierlistUserItems,
		TierlistColors
	} from '../../helpers/stores';
	export let data: { tierlists: Tierlist[] };
</script>

<head>
	<title>Browse Tierlists</title>
</head>
<div class="grid grid-cols-4 gap-2 p-2 pt-1">
	{#each data.tierlists as tierlist}
		<div class="bg-[#1a1a17] flex-col flex p-2 border border-zinc-800 rounded-md">
			<div class="bg-black h-[300px] relative">
				<img
					class="absolute h-full object-fit left-1/2 -translate-x-1/2"
					src={tierlist.imageurl}
					alt={tierlist.name}
				/>
			</div>
			<h1 class="text-lg font-medium text-zinc-200 mt-2">{tierlist.name}</h1>
			<p class="text-zinc-400">{tierlist.description}</p>
			<div class="flex-1" />
			<div class="flex justify-end mt-2">
				<button
					on:click={async () => await loadTierlist(tierlist.id)}
					class="bg-blue-500 px-4 py-2 rounded-md text-white">Launch</button
				>
			</div>
		</div>
	{/each}
</div>
