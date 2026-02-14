<script lang="ts">
	import { Popover } from 'bits-ui';
</script>

<Popover.Root>
	<Popover.Trigger class="border border-border bg-secondary hover:bg-border px-2 rounded-full">
		?
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			sideOffset={8}
			class="animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--bits-popover-content-transform-origin) z-50"
		>
			<div
				class="rounded-lg border-border bg-secondary shadow-md outline-hidden z-0 flex flex-col justify-center border px-3 py-2 text-sm font-medium max-w-64"
			>
				<h4 class="font-bold">Bitrate</h4>
				<p>
					Bitrate refers to the number of kilobits of data per second. The higher the number, the larger the file and the better the quality. For music, 128 kbps is recommended to achive a balance between audio quality and file size, as the difference is not very noticeable after 128 kbps.
				</p>
				<p class="text-xs text-muted">Don't try the Bitcrush option. You have been warned.</p>
			</div>
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
