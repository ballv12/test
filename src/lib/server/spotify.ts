import type { AccessToken } from '@spotify/web-api-ts-sdk';
import { env } from '$env/dynamic/private';

type AccessTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope: string;
};

// this is available in cloudflare
declare const btoa: (input: string) => string;

class SpotifyAuthError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'SpotifyAuthError';
	}
}

const mockKV = (() => {
	const kv: Record<string, string | undefined> = {};

	return () => ({
		async get(key: string) {
			return kv[key];
		},
		async put(key: string, value: string) {
			kv[key] = value;
		}
	});
})();

function makeKV(platform: Readonly<App.Platform> | undefined) {
	if (!platform?.env?.SPOTIFY_KV) {
		return mockKV();
	}

	return platform.env?.SPOTIFY_KV;
}

async function refreshSpotifyToken(fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>): Promise<AccessTokenResponse> {
	if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) {
		throw new SpotifyAuthError('Missing Spotify credentials in environment variables');
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: env.SPOTIFY_REFRESH_TOKEN
		})
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ error: 'Unknown error' }));
		throw new SpotifyAuthError(`Failed to refresh token: ${error.error}`);
	}

	return response.json();
}

export async function getSpotifyAccessToken({
	fetch,
	platform
}: {
	fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
	platform: Readonly<App.Platform> | undefined;
}): Promise<AccessToken> {
	const kv = makeKV(platform);
	
	try {
		let accessTokenRaw = await kv.get('accessToken');
		let accessToken: AccessToken;
		
		const expirationTime = Number(await kv.get('expirationTime')) || 0;
		const currentTime = Date.now();
		
		// Refresh token if it's expired or will expire in the next 5 minutes
		if (!accessTokenRaw || currentTime > (expirationTime - 300000)) {
			const response = await refreshSpotifyToken(fetch);
			
			await kv.put('accessToken', JSON.stringify(response));
			await kv.put('expirationTime', `${currentTime + response.expires_in * 1000}`);
			
			accessToken = {
				...response,
				refresh_token: env.SPOTIFY_REFRESH_TOKEN
			};
		} else {
			accessToken = JSON.parse(accessTokenRaw);
			accessToken.expires_in = (expirationTime - currentTime) / 1000;
			accessToken.refresh_token = env.SPOTIFY_REFRESH_TOKEN;
		}
		
		return accessToken;
	} catch (error) {
		if (error instanceof SpotifyAuthError) {
			throw error;
		}
		throw new SpotifyAuthError(`Failed to get access token: ${error.message}`);
	}
}
