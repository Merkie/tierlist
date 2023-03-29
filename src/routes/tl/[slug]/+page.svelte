<script lang="ts">
	import { onMount } from 'svelte';
	import Tierlist from '../../../components/Tierlist.svelte';
	import type { SortableItem, Tierlist as ITierlist } from '@prisma/client';
	import {
		TierlistItems,
		TierlistName,
		TierlistUserItems,
		TierlistCategories
	} from '../../../helpers/stores';

	export let data: { id: string };

	import loadTierlist from '../../../helpers/loadTierlist';

	onMount(async () => {
		await loadTierlist(data.id);
	});
</script>

<head>
	<title>{$TierlistName}</title>
</head>
