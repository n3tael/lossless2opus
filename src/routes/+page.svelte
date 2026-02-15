<script lang="ts">
	import { LoaderCircle } from 'lucide-svelte';
	import { Tween } from 'svelte/motion';
	import { QueueItemStatus, WorkerDataType, type QueueItem, type WorkerData } from '$lib/types';
	import Worker from '$lib/workers/convert.js?worker';
	import FileSelect from '$lib/components/FileSelect.svelte';
	import FileItem from '$lib/components/FileItem.svelte';
	import BitrateSelect from '$lib/components/BitrateSelect.svelte';
	import BitratePopover from '$lib/components/BitratePopover.svelte';

	let queue: QueueItem[] = $state([]);
	let queue_processing = $derived(
		queue.filter((q) => q.status === QueueItemStatus.PROCESSING).length > 0
	);
	let selected_bitrate = $state('');

	async function startQueue() {
		if (selected_bitrate === '') selected_bitrate = '128';

		for (const task of queue) {
			if (task.status !== QueueItemStatus.WAITING) continue;
			task.status = QueueItemStatus.PROCESSING;

			const worker = new Worker();
			worker.onmessage = async (e) => {
				const { type, data }: WorkerData = e.data;

				switch (type) {
					case WorkerDataType.DONE:
						await task.progress.set(100, { duration: 100 });

						const blob = new Blob([data], { type: 'audio/opus' });
						task.output_file = {
							name: task.input_file.name.replace(/\.\w+$/, '.opus'),
							url: URL.createObjectURL(blob)
						};

						task.status = QueueItemStatus.DONE;

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

			const input_bytes = await task.input_file.bytes()

			worker.postMessage({
				input_bytes: input_bytes,
				bitrate: parseInt(selected_bitrate)
			}, [input_bytes.buffer]);
		}
	}

	function onImport(file: File) {
		queue.push({
			status: QueueItemStatus.WAITING,
			input_file: file,
			output_file: null,
			progress: new Tween(0, { delay: 0, duration: 1000 })
		});
	}

	function clearQueue() {
		queue = [];
	}

	function delete_from_queue(index: number) {
		if (queue[index].output_file) URL.revokeObjectURL(queue[index].output_file.url);

		queue.splice(index, 1);
	}
</script>

<div class="flex flex-col my-2">
	{#each queue as item, i (i)}
		<FileItem
			{item}
			button_disabled={queue_processing}
			on_item_remove={() => delete_from_queue(i)}
		/>
	{/each}
</div>

{#if !queue_processing}
	<FileSelect {onImport} />
{/if}

<div class="flex flex-col sm:flex-row justify-between gap-2 my-2">
	<div class="flex gap-2 items-center">
		<BitrateSelect bind:value={selected_bitrate} />
		<BitratePopover />
	</div>

	<div class="flex gap-2 ml-auto">
		<button onclick={clearQueue} disabled={queue.length === 0 || queue_processing} class="secondary"
			>Clear queue</button
		>
		<button
			onclick={startQueue}
			disabled={queue.length === 0 || queue_processing}
			class="primary flex gap-1 items-center"
		>
			{#if queue_processing}
				<LoaderCircle class="animate-spin" size="16" />
			{/if}
			<span>Convert</span>
		</button>
	</div>
</div>
