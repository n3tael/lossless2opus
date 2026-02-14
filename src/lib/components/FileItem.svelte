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
</script>

<div class="file" transition:slide>
	<Music class="m-1 mr-2" />

	<div class="flex gap-2 items-center mr-auto">
		<span>{item.input_file.name}</span>
		{#if item.status === QueueItemStatus.DONE}
			<Check size="16" />
		{:else if item.status === QueueItemStatus.ERROR}
			<CircleX size="16" />
		{/if}

		{#if item.output_file}
			<a href={item.output_file.url} download={item.output_file.name}>
				<button class="ghost">
					<Download size="16" />
				</button>
			</a>
		{/if}
	</div>

	{#if item.status === QueueItemStatus.PROCESSING}
		<progress
			transition:fade
			class="absolute left-0 right-0 top-0 bottom-0 bg-transparent z-0"
			value={item.progress.current}
			max="100"
		></progress>
		<span transition:fade class="text-neutral-500 text-center absolute left-0 right-0"
			>{Math.round(item.progress.current)}%</span
		>
	{/if}

	<span class="text-neutral-500 mr-2">{filesize(item.input_file.size)}</span>

	{#if !button_disabled}
		<button onclick={on_item_remove} transition:slide={{ axis: 'x' }} class="ghost"><X /></button>
	{/if}
</div>

<style lang="postcss">
	@reference "$styles";

	.file {
		@apply border-border bg-secondary relative my-1 flex items-center gap-0 overflow-clip rounded-xl border-1 p-2 shadow-sm;

		:not(progress) {
			@apply z-5;
		}

		progress {
			@apply z-0 bg-transparent;
		}
	}

	::-moz-progress-bar {
		@apply bg-foreground/10;
	}
</style>
