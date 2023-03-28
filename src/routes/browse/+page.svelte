<script lang="ts">
	import { disableScrollHandling } from '$app/navigation';
	import type { Tierlist, SortableItem } from '@prisma/client';
	import { TierlistCategories, TierlistName, TierlistItems } from '../../helpers/stores';
	export let data: { tierlists: Tierlist[] };

	const loadTierlist = async (id: string) => {
		const response = await fetch(`/api/tierlist/read/${id}`);
		const data = await response.json();
		if (data.error) {
			alert(data.error);
			return;
		}

		const tierlist: Tierlist & { items: SortableItem[] } = data.tierlist;

		$TierlistName = tierlist.name;
		$TierlistCategories = tierlist.categories;
		$TierlistItems = tierlist.items.map((item) => {
			return {
				name: item.name,
				imageurl: item.imageurl
			};
		});

		window.location.assign('/');
	};
</script>

<div class="flex-1 grid grid-cols-4 gap-1 p-1 pt-0">
	{#each data.tierlists as tierlist}
		<div class="bg-[#1a1a17] h-fit p-2 flex flex-col gap-2 border border-zinc-800 rounded-md">
			<div class="bg-black relative h-[200px]">
				<img
					class="absolute h-[100%] object-fit left-1/2 -translate-x-1/2"
					src={tierlist.imageurl}
					alt={tierlist.name}
				/>
			</div>
			<h1 class="text-lg font-medium text-zinc-200">{tierlist.name}</h1>
			<p class="text-zinc-400">{tierlist.description}</p>
			<div class="flex">
				<div class="flex-1" />
				<button
					on:click={async () => await loadTierlist(tierlist.id)}
					class="bg-blue-500 px-4 p-2 rounded-md">Launch</button
				>
			</div>
		</div>
	{/each}
</div>
