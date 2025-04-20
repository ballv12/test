import { n as noop, c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const NavLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { href } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0) $$bindings.href(href);
  active = href === $page.url.pathname;
  $$unsubscribe_page();
  return `<li><a${add_attribute("href", href, 0)} class="${"transition " + escape(active ? "text-white" : "", true)}">${slots.default ? slots.default({}) : ``}</a></li>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function tick_spring(ctx, last_value, current_value, target_value) {
  if (typeof current_value === "number" || is_date(current_value)) {
    const delta = target_value - current_value;
    const velocity = (current_value - last_value) / (ctx.dt || 1 / 60);
    const spring2 = ctx.opts.stiffness * delta;
    const damper = ctx.opts.damping * velocity;
    const acceleration = (spring2 - damper) * ctx.inv_mass;
    const d = (velocity + acceleration) * ctx.dt;
    if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
      return target_value;
    } else {
      ctx.settled = false;
      return is_date(current_value) ? new Date(current_value.getTime() + d) : current_value + d;
    }
  } else if (Array.isArray(current_value)) {
    return current_value.map(
      (_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i])
    );
  } else if (typeof current_value === "object") {
    const next_value = {};
    for (const k in current_value) {
      next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
    }
    return next_value;
  } else {
    throw new Error(`Cannot spring ${typeof current_value} values`);
  }
}
function spring(value, opts = {}) {
  const store = writable(value);
  const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
  let last_time;
  let task;
  let current_token;
  let last_value = value;
  let target_value = value;
  let inv_mass = 1;
  let inv_mass_recovery_rate = 0;
  let cancel_task = false;
  function set(new_value, opts2 = {}) {
    target_value = new_value;
    const token = current_token = {};
    if (value == null || opts2.hard || spring2.stiffness >= 1 && spring2.damping >= 1) {
      cancel_task = true;
      last_time = now();
      last_value = new_value;
      store.set(value = target_value);
      return Promise.resolve();
    } else if (opts2.soft) {
      const rate = opts2.soft === true ? 0.5 : +opts2.soft;
      inv_mass_recovery_rate = 1 / (rate * 60);
      inv_mass = 0;
    }
    if (!task) {
      last_time = now();
      cancel_task = false;
      task = loop((now2) => {
        if (cancel_task) {
          cancel_task = false;
          task = null;
          return false;
        }
        inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
        const ctx = {
          inv_mass,
          opts: spring2,
          settled: true,
          dt: (now2 - last_time) * 60 / 1e3
        };
        const next_value = tick_spring(ctx, last_value, value, target_value);
        last_time = now2;
        last_value = value;
        store.set(value = next_value);
        if (ctx.settled) {
          task = null;
        }
        return !ctx.settled;
      });
    }
    return new Promise((fulfil) => {
      task.promise.then(() => {
        if (token === current_token) fulfil();
      });
    });
  }
  const spring2 = {
    set,
    update: (fn, opts2) => set(fn(target_value, value), opts2),
    subscribe: store.subscribe,
    stiffness,
    damping,
    precision
  };
  return spring2;
}
const css$1 = {
  code: "canvas.svelte-c9inur{view-transition-name:background}",
  map: '{"version":3,"file":"BackgroundEffect.svelte","sources":["BackgroundEffect.svelte"],"sourcesContent":["<script lang=\\"ts\\">var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {\\n    if (kind === \\"m\\") throw new TypeError(\\"Private method is not writable\\");\\n    if (kind === \\"a\\" && !f) throw new TypeError(\\"Private accessor was defined without a setter\\");\\n    if (typeof state === \\"function\\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\\"Cannot write private member to an object whose class did not declare it\\");\\n    return (kind === \\"a\\" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;\\n};\\nvar __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {\\n    if (kind === \\"a\\" && !f) throw new TypeError(\\"Private accessor was defined without a getter\\");\\n    if (typeof state === \\"function\\" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError(\\"Cannot read private member from an object whose class did not declare it\\");\\n    return kind === \\"m\\" ? f : kind === \\"a\\" ? f.call(receiver) : f ? f.value : state.get(receiver);\\n};\\nvar _Boid_r;\\nimport { onMount } from \'svelte\';\\nimport { spring } from \'svelte/motion\';\\nlet canvas;\\nlet refDiv;\\nlet ctx;\\nlet width;\\nlet height;\\nclass Boid {\\n    constructor() {\\n        _Boid_r.set(this, void 0);\\n        __classPrivateFieldSet(this, _Boid_r, Math.random() * 1 + 1, \\"f\\");\\n        this.x = Math.random() * (width + 2 * this.r) - this.r;\\n        this.y = Math.random() * (height + 2 * this.r) - this.r;\\n        this.vx = 0;\\n        this.vy = 0;\\n        this.hue = Math.random() * 60 + 240;\\n    }\\n    get r() {\\n        return (__classPrivateFieldGet(this, _Boid_r, \\"f\\") * width * height * devicePixelRatio) / 8000;\\n    }\\n}\\n_Boid_r = new WeakMap();\\nconst boids = [];\\nfunction resize() {\\n    ctx.resetTransform();\\n    const dw = window.innerWidth / width;\\n    const dh = refDiv.clientHeight / height;\\n    for (const boid of boids) {\\n        boid.x *= dw;\\n        boid.y *= dh;\\n    }\\n    width = window.innerWidth;\\n    height = refDiv.clientHeight;\\n    canvas.width = width * devicePixelRatio;\\n    canvas.height = height * devicePixelRatio;\\n    ctx.scale(devicePixelRatio, devicePixelRatio);\\n    const amount = 20;\\n    if (boids.length < amount) {\\n        while (boids.length < amount) {\\n            boids.push(new Boid());\\n        }\\n    }\\n    else if (boids.length > amount) {\\n        while (boids.length > amount) {\\n            boids.pop();\\n        }\\n    }\\n}\\nconst mousePosition = spring({ x: 0, y: 0 }, {\\n    stiffness: 0.1,\\n    damping: 0.3\\n});\\nconst mouseStrength = spring(0);\\nconst mousePressed = spring(0);\\nfunction draw() {\\n    // Clear the canvas but the black background comes from CSS\\n    ctx.clearRect(0, 0, width, height);\\n    for (const boid of boids) {\\n        ctx.beginPath();\\n        ctx.arc(boid.x, boid.y, boid.r, 0, Math.PI * 2);\\n        const color = `hsla(${boid.hue}, 100%, 50%, 0.1)`;\\n        const gradient = ctx.createRadialGradient(boid.x, boid.y, 0, boid.x, boid.y, boid.r);\\n        gradient.addColorStop(0, color);\\n        gradient.addColorStop(1, `hsla(${boid.hue}, 100%, 50%, 0)`);\\n        ctx.fillStyle = gradient;\\n        ctx.fill();\\n    }\\n    ctx.beginPath();\\n    ctx.arc($mousePosition.x, $mousePosition.y, $mouseStrength * 100, 0, Math.PI * 2);\\n    const gradient = ctx.createRadialGradient($mousePosition.x, $mousePosition.y, 0, $mousePosition.x, $mousePosition.y, $mouseStrength * 100);\\n    gradient.addColorStop(0, `hsla(270, 100%, 50%, ${$mouseStrength * ($mousePressed * 0.125 + 0.125)})`);\\n    gradient.addColorStop(1, `hsla(270, 100%, 50%, 0)`);\\n    ctx.fillStyle = gradient;\\n    ctx.fill();\\n}\\nfunction update() {\\n    for (const boid of boids) {\\n        boid.x += boid.vx;\\n        boid.y += boid.vy;\\n        if (boid.x < -boid.r) {\\n            boid.x += width + 2 * boid.r;\\n        }\\n        else if (boid.x > width + boid.r) {\\n            boid.x -= width + 2 * boid.r;\\n        }\\n        if (boid.y < -boid.r) {\\n            boid.y += height + 2 * boid.r;\\n        }\\n        else if (boid.y > height + boid.r) {\\n            boid.y -= height + 2 * boid.r;\\n        }\\n        for (const other of boids) {\\n            if (boid === other)\\n                continue;\\n            const dx = boid.x - other.x;\\n            const dy = boid.y - other.y;\\n            const dist = Math.hypot(dx, dy);\\n            if (dist < 200) {\\n                boid.vx += (dx / dist / dist) * 0.5;\\n                boid.vy += (dy / dist / dist) * 0.5;\\n            }\\n        }\\n        boid.vx *= 0.99;\\n        boid.vy *= 0.99;\\n    }\\n    if ($mousePressed < 0.01) {\\n        $mouseStrength = $mouseStrength * 0.9;\\n    }\\n    else {\\n        $mouseStrength = $mouseStrength * 0.9 + 0.1;\\n    }\\n}\\nlet animationFrameRequest;\\nfunction loop() {\\n    update();\\n    draw();\\n    animationFrameRequest = requestAnimationFrame(loop);\\n}\\nonMount(() => {\\n    ctx = canvas.getContext(\'2d\');\\n    resize();\\n    loop();\\n    return () => cancelAnimationFrame(animationFrameRequest);\\n});\\n<\/script>\\n\\n<svelte:window\\n\\ton:resize={resize}\\n\\ton:mousemove={e => {\\n\\t\\t$mousePosition = { x: e.clientX, y: e.clientY };\\n\\t\\t$mouseStrength = 1;\\n\\t}}\\n\\ton:touchmove={e => {\\n\\t\\t$mousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };\\n\\t\\t$mouseStrength = 1;\\n\\t}}\\n\\ton:mousedown={() => {\\n\\t\\t$mousePressed = 1;\\n\\t}}\\n\\ton:touchstart={() => {\\n\\t\\t$mousePressed = 1;\\n\\t\\t$mouseStrength = 1;\\n\\t}}\\n\\ton:mouseup={() => {\\n\\t\\t$mousePressed = 0;\\n\\t}}\\n\\ton:touchend={() => {\\n\\t\\t$mousePressed = 0;\\n\\t}}\\n\\ton:mouseleave={() => {\\n\\t\\t$mousePressed = 0;\\n\\t}}\\n\\ton:touchcancel={() => {\\n\\t\\t$mousePressed = 0;\\n\\t}}\\n\\ton:blur={() => {\\n\\t\\t$mousePressed = 0;\\n\\t}}\\n/>\\n\\n<div aria-hidden=\\"true\\" class=\\"h-[100lvh] fixed\\" bind:this={refDiv}></div>\\n\\n<canvas\\n\\tclass=\\"w-screen h-screen fixed -z-10 top-0 left-0 bg-black pointer-events-none\\"\\n\\tbind:this={canvas}\\n></canvas>\\n\\n<style lang=\\"postcss\\">\\n\\tcanvas {\\n\\t\\tview-transition-name: background;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAoLC,oBAAO,CACN,oBAAoB,CAAE,UACvB"}'
};
const BackgroundEffect = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_mouseStrength;
  let $$unsubscribe_mousePressed;
  let $$unsubscribe_mousePosition;
  (function(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  });
  (function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  });
  let canvas;
  let refDiv;
  const mousePosition = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.3 });
  $$unsubscribe_mousePosition = subscribe(mousePosition, (value) => value);
  const mouseStrength = spring(0);
  $$unsubscribe_mouseStrength = subscribe(mouseStrength, (value) => value);
  const mousePressed = spring(0);
  $$unsubscribe_mousePressed = subscribe(mousePressed, (value) => value);
  $$result.css.add(css$1);
  $$unsubscribe_mouseStrength();
  $$unsubscribe_mousePressed();
  $$unsubscribe_mousePosition();
  return ` <div aria-hidden="true" class="h-[100lvh] fixed"${add_attribute("this", refDiv, 0)}></div> <canvas class="w-screen h-screen fixed -z-10 top-0 left-0 bg-black pointer-events-none svelte-c9inur"${add_attribute("this", canvas, 0)}></canvas>`;
});
const css = {
  code: "@keyframes svelte-1szx1eg-fade-in{from{opacity:0}}@keyframes svelte-1szx1eg-fade-out{to{opacity:0}}@keyframes svelte-1szx1eg-slide-in{from{transform:translateX(calc(-1 * theme(width.8) * var(--direction)))}}@keyframes svelte-1szx1eg-slide-out{to{transform:translateX(calc(theme(width.8) * var(--direction)))}}:root::view-transition-old(content){animation:90ms cubic-bezier(0.4, 0, 1, 1) both svelte-1szx1eg-fade-out,\n			300ms cubic-bezier(0.4, 0, 0.2, 1) both svelte-1szx1eg-slide-out}:root::view-transition-new(content){animation:210ms cubic-bezier(0, 0, 0.2, 1) 90ms both svelte-1szx1eg-fade-in,\n			300ms cubic-bezier(0.4, 0, 0.2, 1) both svelte-1szx1eg-slide-in}nav.svelte-1szx1eg{view-transition-name:nav}div.svelte-1szx1eg{view-transition-name:content}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import '../app.postcss';\\nimport { onNavigate } from '$app/navigation';\\nimport NavLink from './NavLink.svelte';\\nimport BackgroundEffect from './BackgroundEffect.svelte';\\nfunction getBaseRoute(pathname) {\\n    return pathname?.match(/\\\\/[^/]*/)?.[0] ?? '/';\\n}\\nconst order = ['/', '/projects', '/music'];\\nonNavigate(navigation => {\\n    if (!document.startViewTransition)\\n        return;\\n    const from = getBaseRoute(navigation.from?.url.pathname);\\n    const to = getBaseRoute(navigation.to?.url.pathname);\\n    const fromIndex = order.indexOf(from);\\n    const toIndex = order.indexOf(to);\\n    const direction = fromIndex < toIndex ? '-1' : '1';\\n    document.documentElement.style.setProperty('--direction', direction);\\n    return new Promise(resolve => {\\n        document.startViewTransition(async () => {\\n            resolve();\\n            await navigation.complete;\\n        });\\n    });\\n});\\n<\/script>\\n\\n<BackgroundEffect />\\n\\n<nav class=\\"wrapper mt-20 md:mt-32 text-gray-400\\">\\n\\t<ul class=\\"flex flex-wrap gap-x-12 gap-y-2\\">\\n\\t\\t<NavLink href=\\"/\\">Home</NavLink>\\n\\t\\t<NavLink href=\\"/projects\\">Projects</NavLink>\\n\\t\\t<NavLink href=\\"/music\\">Music</NavLink>\\n\\t</ul>\\n</nav>\\n\\n<div class=\\"mt-16 md:mt-20 mb-20 md:mb-32\\">\\n\\t<slot />\\n</div>\\n\\n<style>\\n\\t@keyframes fade-in {\\n\\t\\tfrom {\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes fade-out {\\n\\t\\tto {\\n\\t\\t\\topacity: 0;\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes slide-in {\\n\\t\\tfrom {\\n\\t\\t\\ttransform: translateX(calc(-1 * theme(width.8) * var(--direction)));\\n\\t\\t}\\n\\t}\\n\\n\\t@keyframes slide-out {\\n\\t\\tto {\\n\\t\\t\\ttransform: translateX(calc(theme(width.8) * var(--direction)));\\n\\t\\t}\\n\\t}\\n\\n\\t:root::view-transition-old(content) {\\n\\t\\tanimation:\\n\\t\\t\\t90ms cubic-bezier(0.4, 0, 1, 1) both fade-out,\\n\\t\\t\\t300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-out;\\n\\t}\\n\\n\\t:root::view-transition-new(content) {\\n\\t\\tanimation:\\n\\t\\t\\t210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in,\\n\\t\\t\\t300ms cubic-bezier(0.4, 0, 0.2, 1) both slide-in;\\n\\t}\\n\\n\\tnav {\\n\\t\\tview-transition-name: nav;\\n\\t}\\n\\n\\tdiv {\\n\\t\\tview-transition-name: content;\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAyCC,WAAW,sBAAQ,CAClB,IAAK,CACJ,OAAO,CAAE,CACV,CACD,CAEA,WAAW,uBAAS,CACnB,EAAG,CACF,OAAO,CAAE,CACV,CACD,CAEA,WAAW,uBAAS,CACnB,IAAK,CACJ,SAAS,CAAE,WAAW,KAAK,EAAE,CAAC,CAAC,CAAC,MAAM,KAAK,EAAE,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CACnE,CACD,CAEA,WAAW,wBAAU,CACpB,EAAG,CACF,SAAS,CAAE,WAAW,KAAK,MAAM,KAAK,EAAE,CAAC,CAAC,CAAC,CAAC,IAAI,WAAW,CAAC,CAAC,CAC9D,CACD,CAEA,KAAK,sBAAsB,OAAO,CAAE,CACnC,SAAS,CACR,IAAI,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,uBAAQ;AAChD,GAAG,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,wBAC1C,CAEA,KAAK,sBAAsB,OAAO,CAAE,CACnC,SAAS,CACR,KAAK,CAAC,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,sBAAO;AACrD,GAAG,KAAK,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,uBAC1C,CAEA,kBAAI,CACH,oBAAoB,CAAE,GACvB,CAEA,kBAAI,CACH,oBAAoB,CAAE,OACvB"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(BackgroundEffect, "BackgroundEffect").$$render($$result, {}, {}, {})} <nav class="wrapper mt-20 md:mt-32 text-gray-400 svelte-1szx1eg"><ul class="flex flex-wrap gap-x-12 gap-y-2">${validate_component(NavLink, "NavLink").$$render($$result, { href: "/" }, {}, {
    default: () => {
      return `Home`;
    }
  })} ${validate_component(NavLink, "NavLink").$$render($$result, { href: "/projects" }, {}, {
    default: () => {
      return `Projects`;
    }
  })} ${validate_component(NavLink, "NavLink").$$render($$result, { href: "/music" }, {}, {
    default: () => {
      return `Music`;
    }
  })}</ul></nav> <div class="mt-16 md:mt-20 mb-20 md:mb-32 svelte-1szx1eg">${slots.default ? slots.default({}) : ``} </div>`;
});
export {
  Layout as default
};
