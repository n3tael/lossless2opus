<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import * as zip from '@zip.js/zip.js';

	const acceptFileTypes = [
		'audio/flac',
		'audio/wav',
		'audio/x-flac',
		'application/zip',
		'application/x-zip-compressed'
	];
	let { onImport }: { onImport: (file: File) => void } = $props();

	let isDropping = $state(false);
	let files: File[] = $state([]);
	let inputElement: HTMLInputElement;

	async function addFiles(inputFiles: FileList | File[]) {
		files = [...files, ...Array.from(inputFiles)];
		for (const file of inputFiles) {
			if (['application/zip', 'application/x-zip-compressed'].includes(file.type)) {
				const entries = new zip.ZipReader(new zip.BlobReader(file)).getEntriesGenerator();

				for await (const entry of entries) {
					if (entry.directory) continue;
					const mime_type = zip.getMimeType(entry.filename);

					if (!acceptFileTypes.includes(mime_type)) continue;

					onImport(
						new File([await entry.getData(new zip.BlobWriter())], entry.filename, {
							type: mime_type
						})
					);
				}

				continue;
			}

			onImport(file);
		}
	}

	function onFileChange(event: Event) {
		if (event.target instanceof HTMLInputElement && event.target.files) {
			addFiles(event.target.files);
		}
	}

	function ondrop(event: DragEvent) {
		event.preventDefault();

		isDropping = false;

		if (event.dataTransfer && event.dataTransfer.files) {
			let dataTransferFiles = Array.from(event.dataTransfer.files).filter((f) =>
				acceptFileTypes.includes(f.type)
			);

			addFiles(dataTransferFiles);
		}
	}

	function ondragover(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		isDropping = true;
	}

	function ondragexit(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		isDropping = false;
	}
</script>

<input
	type="file"
	multiple
	accept={acceptFileTypes.join(',')}
	class="hidden"
	bind:this={inputElement}
	onchange={onFileChange}
/>

<svelte:window {ondrop} {ondragover} {ondragexit} />

{#if isDropping}
	<div
		class="flex flex-col gap-4 items-center justify-center bg-background/50 backdrop-blur-xl absolute left-0 right-0 bottom-0 top-0 z-50"
		transition:fade={{ duration: 300 }}
	>
		<h1 class="text-3xl font-bold">Drop files here!</h1>
		<p class="text-muted">Supported extensions: .wav, .flac, .zip</p>
	</div>
{/if}

<button
	class="w-full flex gap-3 items-center p-3 border-2 border-dashed secondary shadow-none!"
	onclick={() => inputElement.click()}
>
	<Plus />
	<h2 class="text-xl font-semibold">Select files</h2>
	<p class="text-muted">.wav, .flac or .zip</p>
</button>
