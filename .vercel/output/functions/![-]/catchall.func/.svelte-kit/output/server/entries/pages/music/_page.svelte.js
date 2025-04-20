import { c as create_ssr_component, v as validate_component, f as each, b as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { M as Meta } from "../../../chunks/Meta.js";
const css = {
  code: "label.svelte-1lm6zrf:has(:focus-visible){outline:2px solid white;outline-offset:4px}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { browser } from '$app/environment';\\nimport Meta from '$lib/components/Meta.svelte';\\nconst options = [\\n    { name: 'Past Month', value: 'short_term' },\\n    { name: 'Past 6 Months', value: 'medium_term' },\\n    { name: 'All Time', value: 'long_term' }\\n];\\nconst tracks = {\\n    short_term: null,\\n    medium_term: null,\\n    long_term: null\\n};\\nlet selectedRange = options[0].value;\\n$: if (browser) {\\n    fetchTopTracks(selectedRange);\\n}\\nfunction fetchTopTracks(range) {\\n    if (tracks[range])\\n        return;\\n    tracks[range] = [];\\n    fetch('/api/top-tracks?time_range=' + range)\\n        .then(res => res.json())\\n        .then(res => {\\n        tracks[range] = res;\\n    });\\n}\\n$: currentRange = tracks[selectedRange];\\n<\/script>\\n\\n<Meta\\n\\ttitle=\\"Music – vornexx\\"\\n\\tdescription=\\"Tracks I've listened to the most on Spotify.\\"\\n/>\\n\\n<main>\\n\\t<div class=\\"wrapper fade\\">\\n\\t\\t<h1 class=\\"header\\">Music</h1>\\n\\n\\t\\t<p class=\\"mt-4 text-gray-400\\">\\n\\t\\t\\tTracks I've listened to the most on Spotify (all data provided by my Spotify Account API 🐈).\\n\\t\\t</p>\\n\\n\\t\\t<div class=\\"mt-8 flex flex-wrap gap-x-8 gap-y-2 text-gray-400\\">\\n\\t\\t\\t{#each options as { name, value }}\\n\\t\\t\\t\\t<label\\n\\t\\t\\t\\t\\tclass=\\"transition cursor-pointer\\n\\t\\t\\t\\t\\t\\t{selectedRange === value ? 'text-white' : ''}\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\ttype=\\"radio\\"\\n\\t\\t\\t\\t\\t\\tname=\\"time_range\\"\\n\\t\\t\\t\\t\\t\\t{value}\\n\\t\\t\\t\\t\\t\\tbind:group={selectedRange}\\n\\t\\t\\t\\t\\t\\tclass=\\"sr-only\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t{name}\\n\\t\\t\\t\\t</label>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t</div>\\n\\n\\t{#key selectedRange}\\n\\t\\t<div\\n\\t\\t\\tclass=\\"fade fade-delay mt-8 mx-auto max-w-screen-xl px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-dense\\"\\n\\t\\t>\\n\\t\\t\\t{#each currentRange ?? [] as track, i}\\n\\t\\t\\t\\t{@const big = i % 10 === 0}\\n\\n\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\thref={track.external_urls.spotify}\\n\\t\\t\\t\\t\\ttarget=\\"_blank\\"\\n\\t\\t\\t\\t\\trel=\\"noopener noreferrer\\"\\n\\t\\t\\t\\t\\tclass=\\"aspect-square relative group transition rounded-xl overflow-hidden\\n\\t\\t\\t\\t\\t\\t{big ? 'sm:col-span-2 sm:row-span-2' : ''}\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<object\\n\\t\\t\\t\\t\\t\\tdata={track.album.images[0].url}\\n\\t\\t\\t\\t\\t\\ttype=\\"image/png\\"\\n\\t\\t\\t\\t\\t\\tclass=\\"w-full h-full rounded-xl bg-gray-800 transition duration-300\\n\\t\\t\\t\\t\\t\\t\\t\\tgroup-hv:brightness-50 group-hv:scale-[1.02]\\"\\n\\t\\t\\t\\t\\t\\taria-label=\\"Album Art\\"\\n\\t\\t\\t\\t\\t/>\\n\\n\\t\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\t\\tclass=\\"z-20 absolute inset-4 flex flex-col justify-end transition duration-300\\n\\t\\t\\t\\t\\t\\t\\tscale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100\\n\\t\\t\\t\\t\\t\\t\\t{big ? 'sm:scale-[0.975]' : ''}\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"font-bold sm:text-xl line-clamp-3 !leading-tight mb-1\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t{track.name}\\n\\t\\t\\t\\t\\t\\t</p>\\n\\n\\t\\t\\t\\t\\t\\t{#each track.artists as artist}\\n\\t\\t\\t\\t\\t\\t\\t<p\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"text-xs sm:text-sm text-gray-200 !leading-tight\\"\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t{artist.name}\\n\\t\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t{/each}\\n\\t\\t</div>\\n\\t{/key}\\n</main>\\n\\n<style lang=\\"postcss\\">\\n\\tlabel:has(:focus-visible) {\\n\\t\\toutline: 2px solid white;\\n\\t\\toutline-offset: 4px;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AA6GC,oBAAK,KAAK,cAAc,CAAE,CACzB,OAAO,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACxB,cAAc,CAAE,GACjB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentRange;
  const options = [
    { name: "Past Month", value: "short_term" },
    {
      name: "Past 6 Months",
      value: "medium_term"
    },
    { name: "All Time", value: "long_term" }
  ];
  const tracks = {
    short_term: null,
    medium_term: null,
    long_term: null
  };
  let selectedRange = options[0].value;
  $$result.css.add(css);
  currentRange = tracks[selectedRange];
  return `${validate_component(Meta, "Meta").$$render(
    $$result,
    {
      title: "Music – vornexx",
      description: "Tracks I've listened to the most on Spotify."
    },
    {},
    {}
  )} <main><div class="wrapper fade"><h1 class="header" data-svelte-h="svelte-qaipbz">Music</h1> <p class="mt-4 text-gray-400" data-svelte-h="svelte-r1kiwh">Tracks I&#39;ve listened to the most on Spotify (all data provided by my Spotify Account API 🐈).</p> <div class="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-gray-400">${each(options, ({ name, value }) => {
    return `<label class="${"transition cursor-pointer " + escape(selectedRange === value ? "text-white" : "", true) + " svelte-1lm6zrf"}"><input type="radio" name="time_range"${add_attribute("value", value, 0)} class="sr-only"${value === selectedRange ? add_attribute("checked", true, 1) : ""}> ${escape(name)} </label>`;
  })}</div></div> <div class="fade fade-delay mt-8 mx-auto max-w-screen-xl px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 grid-flow-dense">${each(currentRange ?? [], (track, i) => {
    let big = i % 10 === 0;
    return ` <a${add_attribute("href", track.external_urls.spotify, 0)} target="_blank" rel="noopener noreferrer" class="${"aspect-square relative group transition rounded-xl overflow-hidden " + escape(big ? "sm:col-span-2 sm:row-span-2" : "", true)}"><object${add_attribute("data", track.album.images[0].url, 0)} type="image/png" class="w-full h-full rounded-xl bg-gray-800 transition duration-300 group-hv:brightness-50 group-hv:scale-[1.02]" aria-label="Album Art"></object> <div class="${"z-20 absolute inset-4 flex flex-col justify-end transition duration-300 scale-95 opacity-0 group-hv:scale-100 group-hv:opacity-100 " + escape(big ? "sm:scale-[0.975]" : "", true)}"><p class="font-bold sm:text-xl line-clamp-3 !leading-tight mb-1">${escape(track.name)}</p> ${each(track.artists, (artist) => {
      return `<p class="text-xs sm:text-sm text-gray-200 !leading-tight">${escape(artist.name)} </p>`;
    })}</div> </a>`;
  })}</div> </main>`;
});
export {
  Page as default
};
