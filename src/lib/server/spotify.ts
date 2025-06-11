import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

let cachedToken: AccessToken | null = null;
let tokenExpirationTime = 0;

export async function getSpotifyAccessToken({
	fetch
}: {
	fetch: (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>;
	platform?: Readonly<App.Platform> | undefined;
}) {
	if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
		throw error(500, 'Missing Spotify credentials');
	}

	// Check if we have a valid cached token
	if (cachedToken && Date.now() < tokenExpirationTime) {
		return cachedToken;
	}

	// If not, get a new token
	const response: AccessTokenResponse = await fetch(
		'https://accounts.spotify.com/api/token',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
				).toString('base64')}`
			},
			body: new URLSearchParams({
				grant_type: 'refresh_token',
				refresh_token: env.SPOTIFY_REFRESH_TOKEN
			})
		}
	).then(res => res.json());

	// Cache the token
	cachedToken = {
		...response,
		refresh_token: env.SPOTIFY_REFRESH_TOKEN
	};
	tokenExpirationTime = Date.now() + response.expires_in * 1000;

	return cachedToken;
}
