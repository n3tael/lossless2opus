<script lang="ts">
	import { FolderDown, LoaderCircle, Settings } from 'lucide-svelte';
	import { Tween } from 'svelte/motion';
	import { QueueItemStatus, WorkerDataType, type QueueItem, type WorkerData } from '$lib/types';
	import Worker from '$lib/workers/convert.js?worker';
	import * as zip from '@zip.js/zip.js';
	import FileSelect from '$lib/components/FileSelect.svelte';
	import FileItem from '$lib/components/FileItem.svelte';
	import BitrateSelect from '$lib/components/bitrate/BitrateSelect.svelte';
	import BitratePopover from '$lib/components/bitrate/BitratePopover.svelte';
	import { maxWorkers } from '$lib/stores/max-workers';
	import SettingsDialog from '$lib/components/settings/SettingsDialog.svelte';
	import { bitrate } from '$lib/stores/bitrate';
	import { slide } from 'svelte/transition';
	import { downloadObject } from '$lib/utils/file';

	let queue: QueueItem[] = $state([]);
	let queueSizes = $derived(
		queue.reduce(
			(acc, item) => {
				acc[item.status] = (acc[item.status] || 0) + 1;
				return acc;
			},
			{} as Record<QueueItemStatus, number>
		)
	);
	let zipProcessing = $state(false);

	async function startQueue() {
		if (!$bitrate) bitrate.set('128');

		for (const task of queue) {
			if (
				task.status !== QueueItemStatus.WAITING ||
				queueSizes[QueueItemStatus.PROCESSING] >= $maxWorkers
			)
				continue;

			task.status = QueueItemStatus.PROCESSING;

			const worker = new Worker();
			worker.onmessage = async (e) => {
				const { type, data }: WorkerData = e.data;

				switch (type) {
					case WorkerDataType.DONE:
						await task.progress.set(100, { duration: 100 });

						task.status = QueueItemStatus.DONE;
						task.output_file = new Blob([data], { type: 'audio/opus' });

						if (queueSizes[QueueItemStatus.WAITING] > 0) startQueue();

						worker.terminate();
						break;
					case WorkerDataType.ERROR:
						task.status = QueueItemStatus.ERROR;

						console.error(data);
						worker.terminate();
						break;
					case WorkerDataType.PROGRESS:
						task.progress.target = data;
						break;
				}
			};

			const input_bytes = await task.input_file.bytes();

			worker.postMessage(
				{
					input_bytes: input_bytes,
					bitrate: parseInt($bitrate ?? '')
				},
				[input_bytes.buffer]
			);
		}
	}

	async function downloadZip() {
		zipProcessing = true;

		const zipWriter = new zip.ZipWriter(new zip.BlobWriter('application/zip'), {
			bufferedWrite: true,
			compressionMethod: 0
		});

		const filenames = new Map<string, number>();
		for (const task of queue) {
			if (task.status !== QueueItemStatus.DONE) continue;

			const filename = task.input_file.name.replace(/\.\w+$/, '');

			const count = filenames.get(filename) ?? 0;
			filenames.set(filename, count + 1);

			const suffix = count === 0 ? '.opus' : ` (${count}).opus`;

			await zipWriter.add(filename + suffix, new zip.BlobReader(task.output_file!));
		}

		const blobURL = URL.createObjectURL(await zipWriter.close());
		downloadObject(`l2o-download-${Date.now()}.zip`, blobURL);

		zipProcessing = false;
	}

	function onImport(file: File) {
		queue.push({
			status: QueueItemStatus.WAITING,
			input_file: file,
			progress: new Tween(0, { delay: 0, duration: 1000 })
		});
	}

	function clearQueue() {
		queue = [];
	}

	function delete_from_queue(index: number) {
		queue.splice(index, 1);
	}
</script>

<div class="flex flex-col pb-1">
	{#each queue as item, i (i)}
		<FileItem
			{item}
			button_disabled={queueSizes[QueueItemStatus.PROCESSING] > 0}
			on_item_remove={() => delete_from_queue(i)}
		/>
	{/each}
</div>

{#if !queueSizes[QueueItemStatus.PROCESSING]}
	<div class="flex gap-2" transition:slide>
		<FileSelect {onImport} />
		{#if queueSizes[QueueItemStatus.DONE]}
			<button
				onclick={downloadZip}
				disabled={zipProcessing}
				class="primary flex gap-1 items-center shrink-0 px-4 whitespace-nowrap"
				out:slide={{ axis: 'x' }}
			>
				{#if zipProcessing}
					<LoaderCircle class="animate-spin" />
				{:else}
					<FolderDown />
				{/if}
			</button>
		{/if}
	</div>
{/if}

<div class="flex flex-col sm:flex-row justify-between gap-2 my-2">
	<div class="flex gap-2 items-center">
		<BitrateSelect />
		<BitratePopover />
	</div>

	<div class="flex gap-2 ml-auto">
		<SettingsDialog>
			{#snippet button(props)}
				<button class="icon secondary" {...props}>
					<Settings size={16} />
				</button>
			{/snippet}
		</SettingsDialog>

		<button
			onclick={clearQueue}
			disabled={queue.length === 0 || queueSizes[QueueItemStatus.PROCESSING] > 0}
			class="secondary">Clear queue</button
		>
		<button
			onclick={startQueue}
			disabled={queue.length === 0 || queueSizes[QueueItemStatus.PROCESSING] > 0}
			class="primary flex gap-1 items-center"
		>
			{#if queueSizes[QueueItemStatus.PROCESSING] > 0}
				<LoaderCircle class="animate-spin" size={16} />
			{/if}
			Convert
		</button>
	</div>
</div>
