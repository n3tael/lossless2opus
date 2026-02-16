<script lang="ts">
	import type { Snippet } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	let {
		children,
		name,
		description,
		oneLine = true
	}: {
		children: Snippet;
		name: string;
		description: string;
		oneLine?: boolean;
	} = $props();
</script>

<div class={twMerge('flex', oneLine ? 'items-center justify-between' : 'flex-col gap-1')}>
	<div class="flex flex-col">
		<h3 class="text-semibold">{name}</h3>
		<p class="text-muted text-sm">{description}</p>
	</div>
	{@render children()}
</div>
