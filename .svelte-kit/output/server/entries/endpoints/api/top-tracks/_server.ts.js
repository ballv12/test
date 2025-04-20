import { d as private_env } from "../../../../chunks/shared-server.js";
import { g as getSpotifyAccessToken } from "../../../../chunks/spotify.js";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { e as error, j as json } from "../../../../chunks/index.js";
async function GET({ fetch, platform, setHeaders, url }) {
  const range = url.searchParams.get("time_range") ?? "";
  if (!["short_term", "medium_term", "long_term"].includes(range)) {
    throw error(400, "Invalid time_range");
  }
  const accessToken = await getSpotifyAccessToken({ fetch, platform });
  const api = SpotifyApi.withAccessToken(private_env.SPOTIFY_CLIENT_ID, accessToken, {
    fetch
  });
  const items = await api.currentUser.topItems(
    "tracks",
    range,
    50
  );
  setHeaders({
    "Cache-Control": "public, max-age=0, s-maxage=300"
  });
  return json(items.items);
}
export {
  GET
};
