<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let href: string;

	$: active = href === $page.url.pathname.replace(base, '');
	$: fullHref = `${base}${href}`;
</script>

<li>
	<a href={fullHref} class="transition {active ? 'text-white' : ''}">
		<slot />
	</a>
</li>
