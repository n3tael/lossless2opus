<script lang="ts">
	import { Switch, useId, type WithoutChildrenOrChild } from 'bits-ui';

	let {
		id = useId(),
		checked = $bindable(false),
		ref = $bindable(null),
		...restProps
	}: WithoutChildrenOrChild<Switch.RootProps> = $props();
</script>

<Switch.Root
	bind:checked
	bind:ref
	{id}
	class="focus-visible:ring-foreground focus-visible:ring-offset-background data-[state=unchecked]:bg-ghost data-[state=unchecked]:shadow-mini-inset data-[state=checked]:bg-green-500 focus-visible:outline-hidden peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
	{...restProps}
>
	<Switch.Thumb
		class="bg-background dark:bg-foreground pointer-events-none block size-[30px] shrink-0 rounded-full transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
	/>
</Switch.Root>
