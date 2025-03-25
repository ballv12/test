<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import Project from './Project.svelte';
</script>

<Meta title="Projects – vornexx" description="My projects." />

<main class="wrapper fade">
	<h1 class="header">Projects</h1>

	<p class="mt-4 mb-8 text-gray-400">Some of my projects.</p>

	<Project
		name="Fuwari"
		href="https://ballv12.github.io"
		src="https://media.discordapp.net/attachments/1338709210619449474/1353652783265615922/Screenshot_2025-03-24_at_1.52.15_AM.png?ex=67e26ee5&is=67e11d65&hm=5a06ec98b7498ccaaccd09720b79466bdcaf1d826ee88df8cc4e29b0fa3f8176&=&format=webp&quality=lossless&width=2316&height=1448"
	>
		Blog website.
	</Project>

	<Project
		name="Discord Bot"
		href="https://discord.com/oauth2/authorize?client_id=1120198525364482109"
		src="https://media.discordapp.net/attachments/1338709210619449474/1353653710827556956/Screenshot_2025-03-24_at_1.56.12_AM.png?ex=67e26fc2&is=67e11e42&hm=4f07bd77c68354ba1e4f05a4aeb293230a2341b206c540c1004bafc81e79c412&=&format=webp&quality=lossless&width=1294&height=1656"
	>
		ERLC API
	</Project>

</main>
