<script lang="ts">
	import { QueueItemStatus, type QueueItem } from '$lib/types';
	import { filesize } from 'filesize';
	import { Check, CircleX, Download, Music, X } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let {
		item,
		button_disabled,
		on_item_remove
	}: { item: QueueItem; button_disabled: boolean; on_item_remove: () => void } = $props();

	function download() {
		const a = document.createElement('a');
		a.style.display = 'none';
		a.download = item.output_file?.name ?? '';
		a.href = item.output_file?.url ?? '#';

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
</script>

<div class="file" transition:slide>
	<Music class="m-1 mr-2 shrink-0" size="16" />

	<div class="flex items-center overflow-hidden mr-auto">
		<span class="whitespace-nowrap overflow-hidden text-ellipsis mr-2">{item.input_file.name}</span>
		
		{#if item.status === QueueItemStatus.PROCESSING}
		<span class="text-muted text-sm" in:fade out:slide={{ axis: 'x' }}>
			{Math.round(item.progress.current)}%
		</span>
		{/if}

		{#if item.status === QueueItemStatus.DONE}
			<Check size="16" />
		{:else if item.status === QueueItemStatus.ERROR}
			<CircleX size="16" />
		{/if}
	</div>

	{#if item.status === QueueItemStatus.PROCESSING}
		<progress transition:fade value={item.progress.current} max="100"></progress>
	{/if}

	<span class="text-muted mx-2 shrink-0 text-xs">{filesize(item.input_file.size)}</span>

	{#if item.output_file}
		<button onclick={download} class="ghost">
			<Download size="16"/>
		</button>
	{/if}

	{#if !button_disabled}
		<button onclick={on_item_remove} transition:slide={{ axis: 'x' }} class="ghost shrink-0"><X size="16" /></button>
	{/if}
</div>

<style lang="postcss">
	@reference "$styles";

	.file {
		@apply border-border bg-secondary relative my-1 flex items-center overflow-clip rounded-xl border p-2 shadow-sm;

		:not(progress) {
			@apply z-5;
		}
	}

	progress,
	::-webkit-progress-bar {
		@apply absolute left-0 right-0 w-full h-full bg-transparent z-0;
		-webkit-appearance: none;
	}

	::-moz-progress-bar {
		@apply bg-foreground/10;
	}
	
	::-webkit-progress-value {
		@apply bg-foreground/10;
	}
</style>
