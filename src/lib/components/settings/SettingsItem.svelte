<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		name,
		description
	}: {
		children: Snippet;
		name: string;
		description: string;
	} = $props();
</script>

<div class="flex flex-col gap-1">
	<div class="flex flex-col">
		<h3 class="text-semibold">{name}</h3>
		<p class="text-muted text-sm">{description}</p>
	</div>
	{@render children()}
</div>
