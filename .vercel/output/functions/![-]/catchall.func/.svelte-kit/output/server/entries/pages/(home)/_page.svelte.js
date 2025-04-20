import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, b as add_attribute } from "../../../chunks/ssr.js";
import { r as readable } from "../../../chunks/index2.js";
import { M as Meta } from "../../../chunks/Meta.js";
const now = readable(/* @__PURE__ */ new Date(), (set) => {
  const interval = setInterval(() => {
    set(/* @__PURE__ */ new Date());
  }, 1e3);
  return () => clearInterval(interval);
});
const fastNow = readable(/* @__PURE__ */ new Date(), (set) => {
  return;
});
const Sun = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"></path></svg>`;
});
const Moon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clip-rule="evenodd"></path></svg>`;
});
const Clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isDay;
  let $now, $$unsubscribe_now;
  $$unsubscribe_now = subscribe(now, (value) => $now = value);
  const df = new Intl.DateTimeFormat(
    "en-US",
    {
      day: "numeric",
      year: "numeric",
      month: "long",
      timeZone: "America/Port_of_Spain"
    }
  );
  const tf = new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "America/Port_of_Spain",
      timeZoneName: "short"
    }
  );
  isDay = $now.getUTCHours() - 4 >= 6 && $now.getUTCHours() - 4 < 18;
  $$unsubscribe_now();
  return `<p class="mt-8 flex text-sm gap-2 items-center text-white">${isDay ? `${validate_component(Sun, "Sun").$$render($$result, {}, {}, {})}` : `${validate_component(Moon, "Moon").$$render($$result, {}, {}, {})}`} ${escape(df.format($now))}
	·
	${escape(tf.format($now))}</p>`;
});
var DEFAULT_REST_URL = "https://api.lanyard.rest/v1";
function useLanyard(config) {
  {
    return readable(void 0, (set) => lanyardRest(config, set));
  }
}
function lanyardRest(config, set) {
  if (typeof window === "undefined") {
    return;
  }
  const restUrl = config.restUrl ?? DEFAULT_REST_URL;
  const lanyardFetch = async () => await fetch(`${restUrl}/users/${config.id}`).then(
    (res) => res.json()
  );
  const updateStore = async () => {
    const res = await lanyardFetch();
    if (res.success) {
      set(res.data);
    } else {
      throw new Error(res.error.message);
    }
  };
  updateStore();
  const timer = setInterval(updateStore, config.pollInterval ?? 5e3);
  return () => clearInterval(timer);
}
const Discord = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1 14.66 14.66 0 0 0-4.58 0 10.14 10.14 0 0 0-.53-1.1 16 16 0 0 0-4.13 1.3 17.33 17.33 0 0 0-3 11.59 16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83 3.39 3.39 0 0 0 .42-.33 11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84 12.41 12.41 0 0 0 1.08 1.78 16.44 16.44 0 0 0 5.06-2.59 17.22 17.22 0 0 0-3-11.59 16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.93 1.93 0 0 1 1.8 2 1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2 1.93 1.93 0 0 1 1.8-2 1.92 1.92 0 0 1 1.8 2 1.92 1.92 0 0 1-1.8 2z"></path></svg>`;
});
const discordId = "1149438819834269856";
const DiscordInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let customStatus;
  let $lanyard, $$unsubscribe_lanyard;
  const lanyard = useLanyard({ id: discordId });
  $$unsubscribe_lanyard = subscribe(lanyard, (value) => $lanyard = value);
  const statusColors = {
    online: "bg-emerald-500",
    idle: "bg-amber-400",
    dnd: "bg-rose-400",
    offline: "bg-gray-600"
  };
  customStatus = $lanyard?.activities.find((a) => a.type === 4);
  $$unsubscribe_lanyard();
  return `<div class="mt-8 flex rounded-full items-center bg-gray-900"><div class="relative w-20 h-20 shrink-0 rounded-full">${$lanyard ? `<object data="${"https://cdn.discordapp.com/avatars/" + escape(discordId, true) + "/" + escape($lanyard.discord_user.avatar, true)}" type="image/png" class="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center" aria-label="Discord Avatar">${validate_component(Discord, "Discord").$$render($$result, {}, {}, {})}</object> <span class="${"z-10 absolute w-4 h-4 bottom-1 right-1 rounded-full ring-4 ring-gray-900 " + escape(statusColors[$lanyard.discord_status], true)}"></span>` : `<div class="w-20 h-20 rounded-full bg-gray-800 text-gray-400 grid place-items-center">${validate_component(Discord, "Discord").$$render($$result, {}, {}, {})}</div>`}</div> <div class="ml-4 py-2 pr-6"><p class="line-clamp-1 break-all text-gray-400">${$lanyard ? `<span class="font-semibold text-white">${escape($lanyard.discord_user.display_name)}</span> <span class="ml-1">${escape($lanyard.discord_user.username)}</span>` : ``}</p> ${customStatus ? `<p class="flex items-center text-sm">${customStatus.emoji ? `<img src="${"https://cdn.discordapp.com/emojis/" + escape(customStatus.emoji.id, true) + ".png"}" alt="" class="w-5 h-5 mr-1">` : ``} <span class="line-clamp-1 break-all">${escape(customStatus.state)}</span></p>` : ``}</div></div>`;
});
const SocialLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { name } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  return `<a${add_attribute("href", href, 0)}${add_attribute("aria-label", name, 0)} target="_blank" rel="noopener noreferrer" class="transition hover:text-gray-400">${slots.default ? slots.default({}) : ``}</a>`;
});
const MusicalNote = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5"><path fill-rule="evenodd" d="M17.721 1.599a.75.75 0 01.279.584v11.29a2.25 2.25 0 01-1.774 2.198l-2.041.442a2.216 2.216 0 01-.938-4.333l2.662-.576a.75.75 0 00.591-.734V6.112l-8 1.73v7.684a2.25 2.25 0 01-1.774 2.2l-2.042.44a2.216 2.216 0 11-.935-4.33l2.659-.574A.75.75 0 007 12.53V4.237a.75.75 0 01.591-.733l9.5-2.054a.75.75 0 01.63.149z" clip-rule="evenodd"></path></svg>`;
});
const css = {
  code: ".progress.svelte-1t9rckz{background:conic-gradient(\n			theme('colors.gray.700') calc(var(--progress) * 100%),\n			theme('colors.gray.800') 0\n		)}",
  map: `{"version":3,"file":"SpotifyInfo.svelte","sources":["SpotifyInfo.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { onMount } from 'svelte';\\nimport { fastNow } from '$lib/stores';\\nimport MusicalNote from '$lib/components/icons/MusicalNote.svelte';\\nimport Pause from '$lib/components/icons/Pause.svelte';\\nimport Play from '$lib/components/icons/Play.svelte';\\nlet data;\\nlet lastFetched = 0;\\nonMount(() => {\\n    fetchNowPlaying();\\n    const id = setInterval(() => fetchNowPlaying(), 5000);\\n    return () => clearInterval(id);\\n});\\nfunction fetchNowPlaying() {\\n    fetch('/api/now-playing')\\n        .then(res => res.json())\\n        .then(res => {\\n        data = res;\\n        lastFetched = Date.now();\\n    });\\n}\\nfunction clamp(t) {\\n    return Math.max(Math.min(t, 1), 0);\\n}\\n$: progress = data?.track\\n    ? clamp((data.progessMs + ($fastNow.getTime() - lastFetched)) /\\n        data.track.duration_ms)\\n    : 0;\\n<\/script>\\n\\n<div class=\\"mt-4 flex rounded-full items-center bg-gray-900\\">\\n\\t{#if data?.track?.album.images[0]?.url}\\n\\t\\t<object\\n\\t\\t\\tdata={data.track.album.images[0].url}\\n\\t\\t\\ttype=\\"image/png\\"\\n\\t\\t\\tclass=\\"w-20 h-20 rounded-xl shrink-0 bg-gray-800 text-gray-400 grid place-items-center\\"\\n\\t\\t\\taria-label=\\"Album Art\\"\\n\\t\\t>\\n\\t\\t\\t<svg\\n\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\tclass=\\"w-6 h-6\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\td=\\"M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z\\"\\n\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</svg>\\n\\t\\t</object>\\n\\t{:else}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"w-20 h-20 rounded-xl shrink-0 bg-gray-800 text-gray-400 grid place-items-center\\"\\n\\t\\t>\\n\\t\\t\\t<svg\\n\\t\\t\\t\\txmlns=\\"http://www.w3.org/2000/svg\\"\\n\\t\\t\\t\\tviewBox=\\"0 0 24 24\\"\\n\\t\\t\\t\\tfill=\\"currentColor\\"\\n\\t\\t\\t\\tclass=\\"w-6 h-6\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<path\\n\\t\\t\\t\\t\\tfill-rule=\\"evenodd\\"\\n\\t\\t\\t\\t\\td=\\"M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z\\"\\n\\t\\t\\t\\t\\tclip-rule=\\"evenodd\\"\\n\\t\\t\\t\\t/>\\n\\t\\t\\t</svg>\\n\\t\\t</div>\\n\\t{/if}\\n\\n\\t<div class=\\"pl-4 py-2 pr-4 relative\\">\\n\\t\\t<p class=\\"line-clamp-1 break-all text-gray-400\\">\\n\\t\\t\\t{#if data?.track}\\n\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\thref={data.track.external_urls.spotify}\\n\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\trel=\\"noopener noreferrer\\"\\n\\t\\t\\t\\t\\tclass=\\"mr-1 text-white font-semibold border-b border-transparent transition hv:border-current\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t{data.track.name}\\n\\t\\t\\t\\t</a>\\n\\n\\t\\t\\t\\t{#each data.track.artists as artist, i (artist.id)}\\n\\t\\t\\t\\t\\t{#if i !== 0}\\n\\t\\t\\t\\t\\t\\t,\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\t\\thref={artist.external_urls.spotify}\\n\\t\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\t\\trel=\\"noopener noreferrer\\"\\n\\t\\t\\t\\t\\t\\tclass=\\"border-b border-transparent transition hv:border-current\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t{artist.name}</a\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t{:else}\\n\\t\\t\\t\\tNot Listening to Anything\\n\\t\\t\\t{/if}\\n\\t\\t</p>\\n\\n\\t\\t<p class=\\"flex items-center gap-1 text-sm text-gray-400\\">\\n\\t\\t\\t<span class=\\"shrink-0\\">\\n\\t\\t\\t\\t<MusicalNote />\\n\\t\\t\\t</span>\\n\\n\\t\\t\\t<span class=\\"line-clamp-1 break-all\\">\\n\\t\\t\\t\\t{#if data?.isPlayingNow}\\n\\t\\t\\t\\t\\tListening Now\\n\\t\\t\\t\\t{:else if data?.track}\\n\\t\\t\\t\\t\\tLast Played on Spotify\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\tSpotify\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</span>\\n\\t\\t</p>\\n\\t</div>\\n\\n\\t{#if data?.isPlayingNow}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"ml-auto shrink-0 w-12 h-12 mr-4 rounded-full progress\\"\\n\\t\\t\\tstyle:--progress={progress}\\n\\t\\t>\\n\\t\\t\\t<div\\n\\t\\t\\t\\tclass=\\"w-10 h-10 rounded-full bg-gray-900 mt-1 ml-1 grid place-items-center text-gray-400\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t{#if data.isPaused}\\n\\t\\t\\t\\t\\t<Play />\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<Pause />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t{/if}\\n</div>\\n\\n<style lang=\\"postcss\\">\\n\\t.progress {\\n\\t\\tbackground: conic-gradient(\\n\\t\\t\\ttheme('colors.gray.700') calc(var(--progress) * 100%),\\n\\t\\t\\ttheme('colors.gray.800') 0\\n\\t\\t);\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAuIC,wBAAU,CACT,UAAU,CAAE;AACd,GAAG,MAAM,iBAAiB,CAAC,CAAC,KAAK,IAAI,UAAU,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;AACxD,GAAG,MAAM,iBAAiB,CAAC,CAAC;AAC5B,GACC"}`
};
const SpotifyInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_fastNow;
  $$unsubscribe_fastNow = subscribe(fastNow, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_fastNow();
  return `<div class="mt-4 flex rounded-full items-center bg-gray-900">${`<div class="w-20 h-20 rounded-xl shrink-0 bg-gray-800 text-gray-400 grid place-items-center" data-svelte-h="svelte-1u68h5d"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V9.017 5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" clip-rule="evenodd"></path></svg></div>`} <div class="pl-4 py-2 pr-4 relative"><p class="line-clamp-1 break-all text-gray-400">${`Not Listening to Anything`}</p> <p class="flex items-center gap-1 text-sm text-gray-400"><span class="shrink-0">${validate_component(MusicalNote, "MusicalNote").$$render($$result, {}, {}, {})}</span> <span class="line-clamp-1 break-all">${`${`Spotify`}`}</span></p></div> ${``} </div>`;
});
const GitHub = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"></path></svg>`;
});
const Envelope = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"></path><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"></path></svg>`;
});
const Spotify = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M12.01 2.019c-5.495 0-9.991 4.496-9.991 9.991 0 5.494 4.496 9.99 9.991 9.99 5.494 0 9.99-4.496 9.99-9.99 0-5.495-4.446-9.991-9.99-9.991zm4.595 14.436c-.199.299-.549.4-.85.201-2.349-1.45-5.296-1.75-8.793-.951-.348.102-.648-.148-.748-.449-.101-.35.149-.648.45-.749 3.795-.85 7.093-.499 9.69 1.1.35.149.4.548.251.848zm1.2-2.747c-.251.349-.7.499-1.051.249-2.697-1.646-6.792-2.148-9.939-1.148-.398.101-.85-.1-.949-.498-.101-.402.1-.852.499-.952 3.646-1.098 8.143-.548 11.239 1.351.3.149.45.648.201.998zm.099-2.799c-3.197-1.897-8.542-2.097-11.59-1.146a.938.938 0 0 1-1.148-.6.937.937 0 0 1 .599-1.151c3.547-1.049 9.392-.85 13.089 1.351.449.249.599.849.349 1.298-.25.35-.849.498-1.299.248z"></path></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Meta, "Meta").$$render(
    $$result,
    {
      title: "kona",
      description: "My portfolio and personal website."
    },
    {},
    {}
  )} <main class="wrapper fade"><h1 class="header" data-svelte-h="svelte-o6gq9j">kona</h1> <p class="mt-4 text-gray-400" data-svelte-h="svelte-e346u8">I&#39;m <b>kona.</b>, a person from
		<b>Trinidad &amp; Tobago (Trinidad)</b>.
		In my free time I play Genshin Impact or Roblox and watch anime(sometimes).</p> <div class="mt-4 flex gap-6">${validate_component(SocialLink, "SocialLink").$$render(
    $$result,
    {
      href: "https://discord.com/users/1149438819834269856",
      name: "Discord"
    },
    {},
    {
      default: () => {
        return `${validate_component(Discord, "Discord").$$render($$result, {}, {}, {})}`;
      }
    }
  )} ${validate_component(SocialLink, "SocialLink").$$render(
    $$result,
    {
      href: "https://github.com/vornexx",
      name: "GitHub"
    },
    {},
    {
      default: () => {
        return `${validate_component(GitHub, "GitHub").$$render($$result, {}, {}, {})}`;
      }
    }
  )} ${validate_component(SocialLink, "SocialLink").$$render(
    $$result,
    {
      href: "https://open.spotify.com/user/bj9xmj4pmlqa86zym011zb1eb",
      name: "Spotify"
    },
    {},
    {
      default: () => {
        return `${validate_component(Spotify, "Spotify").$$render($$result, {}, {}, {})}`;
      }
    }
  )} ${validate_component(SocialLink, "SocialLink").$$render(
    $$result,
    {
      href: "mailto:kona@disroot.org",
      name: "Email"
    },
    {},
    {
      default: () => {
        return `${validate_component(Envelope, "Envelope").$$render($$result, {}, {}, {})}`;
      }
    }
  )}</div> ${validate_component(Clock, "Clock").$$render($$result, {}, {}, {})} ${validate_component(DiscordInfo, "DiscordInfo").$$render($$result, {}, {}, {})} ${validate_component(SpotifyInfo, "SpotifyInfo").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};
