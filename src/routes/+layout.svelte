<script lang="ts">
	export let data: { path: string };
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<main class="flex gap-1 flex-col min-h-screen">
	<Header path={data.path} />
	<slot />
</main>
