<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Project from './Project.svelte';
</script>

<Meta title="Projects – Bell" description="My projects." />

<main class="wrapper fade">
	<h1 class="header">Projects</h1>

	<p class="mt-4 mb-8 text-gray-400">Some of my projects.</p>

	<Project
		name="Fuwari"
		href="https://ballv12.github.io"
		src="https://rb.gy/fs18g8"
	>
		Blog website.
	</Project>

	<Project
		name="Discord Bot"
		href="https://rb.gy/13fo46"
		src="https://rb.gy/eatwj2"
	>
		ERLC API
	</Project>

</main>
