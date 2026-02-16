<script lang="ts">
	import { Slider, type WithoutChildren } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = WithoutChildren<ComponentProps<typeof Slider.Root>>;

	let { value = $bindable(), ref = $bindable(null), ...restProps }: Props = $props();
</script>

<Slider.Root
	class={twMerge(
		'relative flex w-full touch-none select-none items-center mt-4 mb-8',
		restProps.step ? 'mt-4 mb-8' : 'my-4'
	)}
	bind:value
	bind:ref
	{...restProps as any}
>
	{#snippet children({ tickItems, thumbItems })}
		<span class="bg-muted relative h-2 w-full grow cursor-pointer overflow-hidden rounded-full">
			<Slider.Range class="bg-foreground absolute h-full" />
		</span>
		{#each thumbItems as { index } (index)}
			<Slider.Thumb
				{index}
				class="border-border-light bg-background dark:bg-foreground hover:border-dark-40 focus-visible:ring-foreground dark:shadow-card data-active:border-dark-40 z-5 focus-visible:outline-hidden data-active:scale-[0.98] block size-6 cursor-pointer rounded-full border shadow-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
			/>
		{/each}
		{#each tickItems as { value, index } (index)}
			<Slider.Tick {index} class="dark:bg-background/30 bg-background z-1 h-2 w-px" />
			<Slider.TickLabel
				position="bottom"
				class="text-muted data-bounded:text-foreground mt-4 text-sm font-medium leading-none"
				{index}
			>
				{value}
			</Slider.TickLabel>
		{/each}
	{/snippet}
</Slider.Root>
