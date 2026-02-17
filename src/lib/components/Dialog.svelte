<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, Separator, type WithoutChild } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';

	type Props = Dialog.RootProps & {
		trigger: Snippet<[Record<string, unknown>]>;
		title: Snippet;
		description: Snippet;
		contentClass?: string;
		contentProps?: WithoutChild<Dialog.ContentProps>;
	};

	let {
		open = $bindable(false),
		children,
		trigger,
		contentClass,
		contentProps,
		title,
		description,
		...restProps
	}: Props = $props();
</script>

<Dialog.Root bind:open {...restProps}>
	<Dialog.Trigger>
		{#snippet child({ props })}
			{@render trigger(props)}
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-background/50 backdrop-blur-xl"
		/>
		<Dialog.Content
			class={twMerge(
				'rounded-xl bg-secondary shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 outline-hidden fixed left-[50%] top-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] border border-border p-5 sm:max-w-[490px] md:w-full',
				contentClass
			)}
			{...contentProps}
		>
			<Dialog.Title class="text-lg font-semibold tracking-tight">
				{@render title()}
				<Dialog.Description class="text-muted text-sm">
					{@render description()}
				</Dialog.Description>
			</Dialog.Title>
			<Separator.Root class="bg-border block h-px my-0 h-mx-5" />
			{@render children?.()}
			<Dialog.Close
				class="focus-visible:ring-foreground focus-visible:ring-offset-background focus-visible:outline-hidden absolute right-5 top-5 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] hover:bg-ghost p-2"
			>
				<div>
					<X size="16" />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
