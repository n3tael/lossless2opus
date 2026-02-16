<script lang="ts">
	import { Select, type WithoutChildren } from 'bits-ui';
	import { Check, ChevronsUpDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type Props = WithoutChildren<Select.RootProps> & {
		leadingIcon?: Snippet;
		placeholder?: string;
		items: { value: string; label: string; disabled?: boolean }[];
		contentProps?: WithoutChildren<Select.ContentProps>;
	};

	let {
		value = $bindable(),
		leadingIcon,
		items,
		contentProps,
		placeholder,
		...restProps
	}: Props = $props();

	const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Select.Root bind:value={value as never} {...restProps}>
	<Select.Trigger
		class="h-10 rounded-lg border-border bg-secondary inline-flex w-full sm:w-80 touch-none select-none items-center border px-3 text-sm transition-colors overflow-hidden"
		aria-label="Select bitrate"
	>
		{@render leadingIcon?.()}
		<p class="overflow-hidden whitespace-nowrap text-ellipsis">
			{selectedLabel ? selectedLabel : placeholder}
		</p>
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
				{#each items as item, i (i + item.value)}
					<Select.Item
						class="rounded-md data-highlighted:bg-ghost outline-hidden data-disabled:opacity-50 flex w-full select-none items-center px-2 py-1 text-sm"
						value={item.value}
						label={item.label}
					>
						{#snippet children({ selected })}
							{item.label}
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
