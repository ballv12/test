<script lang="ts">
	import Clock from './Clock.svelte';
	import DiscordInfo from './DiscordInfo.svelte';
	import SocialLink from './SocialLink.svelte';
	import SpotifyInfo from './SpotifyInfo.svelte';

	import Discord from '$lib/components/icons/Discord.svelte';
	import GitHub from '$lib/components/icons/GitHub.svelte';
	import Envelope from '$lib/components/icons/Envelope.svelte';
	import Spotify from '$lib/components/icons/Spotify.svelte';
	import Meta from '$lib/components/Meta.svelte';
</script>

<Meta title="Ball" description="Website." />

<main class="wrapper fade">
	<h1 class="header">Bell</h1>

	<p class="mt-4 text-gray-400">
		Backflip enthusiast, and software developer.
	</p>

	<div class="mt-4 flex gap-6">
		<SocialLink href="https://discord.com/users/607846264293556237" name="Discord">
			<Discord />
		</SocialLink>

		
		<SocialLink href="https://github.com/ballv12" name="GitHub">
			<GitHub />
		</SocialLink>

	
		<SocialLink
			href="https://rb.gy/c6qgod"
			name="Spotify"
		>
			<Spotify />
		</SocialLink>

		<SocialLink href="ballv@gmail.org" name="Email">
			<Envelope />
		</SocialLink>
	</div>

	<Clock />

	<DiscordInfo />
	<SpotifyInfo />
</main>
