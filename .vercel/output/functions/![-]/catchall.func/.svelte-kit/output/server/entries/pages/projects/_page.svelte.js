import { c as create_ssr_component, b as add_attribute, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import { M as Meta } from "../../../chunks/Meta.js";
const Project = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { href } = $$props;
  let { src } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  return `<div class="mt-4"><a${add_attribute("href", href, 0)} target="_blank" rel="noopener noreferrer" class="grid sm:grid-cols-2 rounded-xl overflow-hidden hv:scale-[1.02] transition duration-300"><div class="p-6 md:p-8 bg-gray-900 max-sm:row-start-2"><h2 class="font-bold text-2xl">${escape(name)}</h2> <p class="mt-2 text-gray-400">${slots.default ? slots.default({}) : ``}</p></div> <div class="relative overflow-hidden max-sm:h-24"><img${add_attribute("src", src, 0)} alt="" class="absolute top-0 left-0 w-full h-full object-cover"></div></a></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Meta, "Meta").$$render(
    $$result,
    {
      title: "Projects – vornexx",
      description: "My projects."
    },
    {},
    {}
  )} <main class="wrapper fade"><h1 class="header" data-svelte-h="svelte-19ap564">Projects</h1> <p class="mt-4 mb-8 text-gray-400" data-svelte-h="svelte-6693xw">Some of my projects.</p> ${validate_component(Project, "Project").$$render(
    $$result,
    {
      name: "vnx.pages.dev",
      href: "https://vnx.pages.dev",
      src: "/images/projects/brave_JDsQ9aBzkQ.png"
    },
    {},
    {
      default: () => {
        return `The page you&#39;re currently on.`;
      }
    }
  )}</main>`;
});
export {
  Page as default
};
