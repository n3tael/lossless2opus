<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';

	const acceptFileTypes = ['audio/flac', 'audio/wav', 'audio/x-flac'];
	let { onImport }: { onImport: (file: File) => void } = $props();

	let isDropping = $state(false);
	let files: File[] = $state([]);
	let inputElement: HTMLInputElement;

	function addFiles(inputFiles: FileList | File[]) {
		files = [...files, ...Array.from(inputFiles)];
		for (const file of inputFiles) {
			onImport(file);
		}
	}

	function onFileChange(event: Event) {
		if (event.target instanceof HTMLInputElement && event.target.files) {
			addFiles(event.target.files);
		}
	}

	function onDrop(event: DragEvent) {
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

	function ondragleave(e: Event) {
		e.preventDefault();
		e.stopPropagation();

		isDropping = false;
	}

	function preventDefaults(e: Event) {
		e.preventDefault();
		e.stopPropagation();
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

<svelte:window ondrop={onDrop} {ondragover} {ondragleave} />

{#if isDropping}
	<div
		class="flex flex-col gap-4 items-center justify-center bg-background/50 backdrop-blur-xl absolute left-0 right-0 bottom-0 top-0 z-50"
		transition:fade={{ duration: 300 }}
	>
		<h1 class="text-3xl font-bold">Drop files here!</h1>
		<p class="text-muted">Supported extensions: .wav, .flac</p>
	</div>
{/if}

<button
	class="w-full flex gap-3 items-center p-3 border-2 border-dashed secondary shadow-none!"
	onclick={() => inputElement.click()}
	transition:slide
>
	<Plus />
	<h2 class="text-xl font-medium">Select files</h2>
	<p class="text-muted">.wav or .flac</p>
</button>
