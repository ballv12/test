import { c as create_ssr_component, a as subscribe, e as escape } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<main class="wrapper fade"><h1 class="header">${escape($page.status)} –
		${escape($page.error?.message ?? "Unknown error")}</h1> <p class="mt-4 text-gray-400" data-svelte-h="svelte-1w4jwwz">Seems like this page doesn&#39;t exist. Let&#39;s go back
		<a href="/" class="text-white">home</a>.</p></main>`;
});
export {
  Error as default
};
