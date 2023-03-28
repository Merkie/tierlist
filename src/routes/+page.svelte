<script lang="ts">
	import Tierlist from '../components/Tierlist.svelte';
	import { TierlistName } from '../helpers/stores';
</script>

<head>
	<title>{$TierlistName}</title>
</head>
<Tierlist />
