<script lang="ts">
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
	};
</script>

{#each data.tierlists as tierlist}
	<button on:click={async () => await loadTierlist(tierlist.id)}>{tierlist.name}</button>
{/each}
