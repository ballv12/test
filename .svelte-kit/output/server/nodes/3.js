

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/music/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.CCEBsMQE.js","_app/immutable/chunks/scheduler.BmcN4ySG.js","_app/immutable/chunks/index.Bnm7UYtR.js","_app/immutable/chunks/each.Bt0Xezx6.js","_app/immutable/chunks/Meta.DaG-iyb9.js"];
export const stylesheets = ["_app/immutable/assets/3.BJfP06gv.css"];
export const fonts = [];
