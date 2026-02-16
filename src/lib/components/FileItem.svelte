<script lang="ts">
	import FLAC from '$lib/icons/FLAC.svelte';
	import { QueueItemStatus, type QueueItem } from '$lib/types';
	import { filesize } from 'filesize';
	import { AudioLines, Check, CircleX, Download, Music, X } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	let {
		item,
		button_disabled,
		on_item_remove
	}: { item: QueueItem; button_disabled: boolean; on_item_remove: () => void } = $props();

	function download() {
		const url = URL.createObjectURL(item.output_file!);

		const a = document.createElement('a');
		a.style.display = 'none';

		a.download = item.input_file.name.replace(/\.\w+$/, '.opus');
		a.href = url;

		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);

		URL.revokeObjectURL(url);
	}
</script>

<div class="file" transition:slide>
	{#if item.input_file.type === 'audio/x-flac' || item.input_file.type === 'audio/flac'}
		<FLAC class="icon" size={16} />
	{:else if item.input_file.type === 'audio/wav'}
		<AudioLines class="icon" size={16} />
	{/if}

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
		<button onclick={download} class="ghost" transition:fade>
			<Download size="16" />
		</button>
	{/if}

	{#if !button_disabled}
		<button onclick={on_item_remove} transition:slide={{ axis: 'x' }} class="ghost shrink-0"
			><X size="16" /></button
		>
	{/if}
</div>

<style lang="postcss">
	@reference "$styles";

	.file :global {
		@apply border-border bg-secondary relative my-1 flex items-center overflow-clip rounded-xl border p-2 shadow-sm;

		.icon {
			@apply text-muted m-1 mr-2 shrink-0;
		}

		:not(progress) {
			@apply z-5;
		}
	}

	progress,
	::-webkit-progress-bar {
		@apply absolute right-0 left-0 z-0 h-full w-full bg-transparent;
		-webkit-appearance: none;
	}

	::-moz-progress-bar {
		@apply bg-foreground/10;
	}

	::-webkit-progress-value {
		@apply bg-foreground/10;
	}
</style>
