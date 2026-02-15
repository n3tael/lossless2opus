<script lang="ts">
	import { Select } from 'bits-ui';
	import { AudioWaveform, Check, ChevronsUpDown } from 'lucide-svelte';

	const options = [
		{ value: '160', label: '160 kbps (best quality, big size)' },
		{ value: '128', label: '128 kbps (good quality, medium size)' },
		{ value: '64', label: '64 kbps (medium quality, small size)' },
		{ value: '32', label: '32 kbps (low quality, smallest size)' },
		{ value: '8', label: 'Bitcrush' }
	];

	let { value = $bindable() }: { value: string } = $props();

	const selectedLabel = $derived(value ? options.find((o) => o.value === value)?.label : 'Bitrate');

	const isLastOption = $derived(
		options.findLastIndex((o) => o.value === value) === options.length - 1
	);
</script>

<Select.Root type="single" onValueChange={(v) => (value = v)} items={options}>
	<Select.Trigger
		class="h-10 rounded-lg border-border bg-secondary inline-flex w-full sm:w-80 touch-none select-none items-center border px-3 text-sm transition-colors"
		aria-label="Select bitrate"
	>
		<AudioWaveform class="text-muted mr-2" size="16" />
		{value && !isLastOption ? `${value} kbps` : selectedLabel}
		<ChevronsUpDown class="text-muted ml-auto" size="16" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			class="focus-override border-border bg-secondary shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-hidden z-50 max-h-(--bits-select-content-available-height) w-(--bits-select-anchor-width) min-w-(--bits-select-anchor-width) select-none rounded-lg border px-1 py-1 data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1"
			sideOffset={4}
		>
			<Select.ScrollUpButton class="flex w-full items-center justify-center">
				<ChevronsUpDown size="12" />
			</Select.ScrollUpButton>
			<Select.Viewport class="p-1">
				{#each options as option, i (i + option.value)}
					<Select.Item
						class="rounded-md data-highlighted:bg-ghost outline-hidden data-disabled:opacity-50 flex w-full select-none items-center px-2 py-1 text-sm"
						value={option.value}
						label={option.label}
					>
						{#snippet children({ selected })}
							{option.label}
							{#if selected}
								<div class="ml-auto">
									<Check aria-label="Selected" size="16" />
								</div>
							{/if}
						{/snippet}
					</Select.Item>
				{/each}
			</Select.Viewport>
			<Select.ScrollDownButton class="flex w-full items-center justify-center">
				<ChevronsUpDown size="12" />
			</Select.ScrollDownButton>
		</Select.Content>
	</Select.Portal>
</Select.Root>
