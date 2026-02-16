<script lang="ts">
	import Select from '$lib/components/Select.svelte';
	import { bitrate } from '$lib/stores/bitrate';
	import { AudioWaveform } from 'lucide-svelte';

	const options = [
		{ value: '160', label: '160 kbps (best quality, big size)' },
		{ value: '128', label: '128 kbps (good quality, medium size)' },
		{ value: '64', label: '64 kbps (medium quality, small size)' },
		{ value: '32', label: '32 kbps (low quality, smallest size)' },
		{ value: '8', label: 'Bitcrush' }
	];
</script>

<Select
	type="single"
	items={options}
	bind:value={() => $bitrate ?? undefined, (v) => bitrate.set(v ?? null)}
	placeholder="Bitrate"
>
	{#snippet leadingIcon()}
		<AudioWaveform class="text-muted mr-2 shrink-0" size={16} />
	{/snippet}
</Select>
