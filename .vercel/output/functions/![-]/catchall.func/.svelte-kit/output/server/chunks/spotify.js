import { d as private_env } from "./shared-server.js";
const mockKV = /* @__PURE__ */ (() => {
  const kv = {};
  return () => ({
    async get(key) {
      return kv[key];
    },
    async put(key, value) {
      kv[key] = value;
    }
  });
})();
function makeKV(platform) {
  if (!platform?.env?.SPOTIFY_KV) {
    return mockKV();
  }
  return platform.env?.SPOTIFY_KV;
}
async function getSpotifyAccessToken({
  fetch,
  platform
}) {
  const kv = makeKV(platform);
  let accessTokenRaw = await kv.get("accessToken");
  let accessToken;
  const expirationTime = Number(await kv.get("expirationTime")) || 0;
  if (!accessTokenRaw || Date.now() > expirationTime) {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${btoa(
            `${private_env.SPOTIFY_CLIENT_ID}:${private_env.SPOTIFY_CLIENT_SECRET}`
          )}`
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: private_env.SPOTIFY_REFRESH_TOKEN
        })
      }
    ).then((res) => res.json());
    await kv.put("accessToken", JSON.stringify(response));
    await kv.put(
      "expirationTime",
      `${Date.now() + response.expires_in * 1e3}`
    );
    accessToken = {
      ...response,
      refresh_token: private_env.SPOTIFY_REFRESH_TOKEN
    };
  } else {
    accessToken = JSON.parse(accessTokenRaw);
    accessToken.expires_in = (expirationTime - Date.now()) / 1e3;
    accessToken.refresh_token = private_env.SPOTIFY_REFRESH_TOKEN;
  }
  return accessToken;
}
export {
  getSpotifyAccessToken as g
};
