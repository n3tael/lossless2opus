<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog as BDialog } from 'bits-ui';
	import Dialog from '../Dialog.svelte';
	import Slider from '../Slider.svelte';
	import SettingsItem from './SettingsItem.svelte';
	import { maxWorkers } from '$lib/stores/max-workers';
	import Switch from '../Switch.svelte';
	import { showPercentage } from '$lib/stores/show-percentage';

	type Props = BDialog.RootProps & {
		button: Snippet;
	};

	let { open = $bindable(false), button, ...restProps }: Props = $props();
</script>

<Dialog bind:open {...restProps} {button} contentClass="flex flex-col gap-4">
	{#snippet title()}
		Settings
	{/snippet}

	{#snippet description()}
		Manage your preferences.
	{/snippet}

	<SettingsItem
		name="Threads"
		description="Specifies the maximum number of parallel tasks based on your CPU cores"
		oneLine={false}
	>
		<Slider
			bind:value={$maxWorkers}
			type="single"
			min={1}
			max={navigator.hardwareConcurrency}
			step={1}
		/>
	</SettingsItem>
	<SettingsItem
		name="Show savings as a percentage"
		description="Show 12 MB (-70%) instead of 40 MB → 12 MB"
	>
		<Switch bind:checked={$showPercentage} />
	</SettingsItem>
</Dialog>
