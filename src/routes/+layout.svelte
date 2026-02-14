<script lang="ts">
	import '$styles';
	import { ModeWatcher } from 'mode-watcher';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<ModeWatcher />
<Header />
{@render children()}
<Footer />
