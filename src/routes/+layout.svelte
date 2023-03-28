<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<main class="flex gap-1 flex-col min-h-screen">
	<Header />
	<slot />
</main>
