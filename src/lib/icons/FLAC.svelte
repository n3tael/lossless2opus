<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		size = 24,
		class: className,
		...props
	}: { size: number } & HTMLAttributes<SVGElement> = $props();
</script>

<svg
	height={size}
	width={size}
	class={className}
	viewBox="0 0 60 130"
	fill="currentColor"
	xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink"
	{...props}
>
	<clipPath id="a">
		<path d="m2 1h13v32h13v-16h13v48h13v64h-52z" />
	</clipPath>
	<g clip-path="url(#a)">
		<g id="f">
			<path
				d="m2.75 34.6438v11.6562h8.24375v-11.6562zm0 16v11.6562h8.24375v-11.6562zm0 16v11.6562h8.24375v-11.6562z"
			/>
			<path
				d="m2.75 82.6438v11.6562h8.24375v-11.6562zm0 16v11.6562h8.24375v-11.6562zm0 16v11.6562h8.24375v-11.6562z"
			/>
			<path d="m2.75 2.8625v11.6562h8.24375v-11.6562zm0 15.7812v11.6562h8.24375v-11.6562z" />
		</g>
		<use height="130" transform="translate(13)" width="265" xlink:href="#f" />
		<use height="130" transform="translate(26)" width="265" xlink:href="#f" />
		<use height="130" transform="translate(39)" width="265" xlink:href="#f" />
	</g>
</svg>
