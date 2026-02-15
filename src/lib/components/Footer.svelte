<script lang="ts">
	import { Separator } from 'bits-ui';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Worker from '$lib/workers/version.js?worker';

	let opus_version = $state<string | null>(null);

	onMount(async () => {
		const worker = new Worker();

		worker.onmessage = (e) => {
			const { version }: { version: string } = e.data;

			opus_version = version;

			worker.terminate();
		};

		worker.postMessage(null);
	});
</script>

<footer>
	<Separator.Root />
	<a href="https://github.com/n3tael/lossless2opus">source code @ github</a>
	<p>{__APP_VERSION__.name} v{__APP_VERSION__.version}-{__APP_VERSION__.commit.slice(0, 6)}</p>
	{#if opus_version}
		<p in:fade>{opus_version}</p>
	{/if}
</footer>

<style lang="postcss">
	@reference '$styles';

	footer {
		@apply text-muted my-8 text-sm;
	}
</style>
