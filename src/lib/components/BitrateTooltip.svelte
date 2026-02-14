<script lang="ts">
	import { Tooltip } from 'bits-ui';
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={200}>
		<Tooltip.Trigger class="border border-border bg-secondary px-2 rounded-full cursor-help!">
			?
		</Tooltip.Trigger>
		<Tooltip.Content
			sideOffset={8}
			class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-tooltip-content-transform-origin) z-50"
		>
			<div
				class="rounded-lg border-border bg-secondary shadow-md outline-hidden z-0 flex flex-col justify-center border px-3 py-2 text-sm font-medium max-w-64"
			>
				<h4 class="font-bold">Bitrate</h4>
				<p>
					Bitrate stands for maximum kilobits (information) per second. For music, it's recommended
					to use 128 kbps for quality & size.
				</p>
				<p class="text-xs text-muted">Don't try the Bitcrush option. You have been warned.</p>
			</div>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
