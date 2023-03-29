<script lang="ts">
	import { onMount } from 'svelte';
	import Tierlist from '../components/Tierlist.svelte';
	import { TierlistName } from '../helpers/stores';

	onMount(() => {
		if ($TierlistName === '') {
			window.location.assign('/browse');
		}
	});
</script>

<head>
	<title>{$TierlistName}</title>
</head>
<Tierlist />
