export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","fonts/Inter-Black.woff2","fonts/Inter-BlackItalic.woff2","fonts/Inter-Bold.woff2","fonts/Inter-BoldItalic.woff2","fonts/Inter-ExtraBold.woff2","fonts/Inter-ExtraBoldItalic.woff2","fonts/Inter-ExtraLight.woff2","fonts/Inter-ExtraLightItalic.woff2","fonts/Inter-Italic.woff2","fonts/Inter-Light.woff2","fonts/Inter-LightItalic.woff2","fonts/Inter-Medium.woff2","fonts/Inter-MediumItalic.woff2","fonts/Inter-Regular.woff2","fonts/Inter-SemiBold.woff2","fonts/Inter-SemiBoldItalic.woff2","fonts/Inter-Thin.woff2","fonts/Inter-ThinItalic.woff2","fonts/InterDisplay-Black.woff2","fonts/InterDisplay-BlackItalic.woff2","fonts/InterDisplay-Bold.woff2","fonts/InterDisplay-BoldItalic.woff2","fonts/InterDisplay-ExtraBold.woff2","fonts/InterDisplay-ExtraBoldItalic.woff2","fonts/InterDisplay-ExtraLight.woff2","fonts/InterDisplay-ExtraLightItalic.woff2","fonts/InterDisplay-Italic.woff2","fonts/InterDisplay-Light.woff2","fonts/InterDisplay-LightItalic.woff2","fonts/InterDisplay-Medium.woff2","fonts/InterDisplay-MediumItalic.woff2","fonts/InterDisplay-Regular.woff2","fonts/InterDisplay-SemiBold.woff2","fonts/InterDisplay-SemiBoldItalic.woff2","fonts/InterDisplay-Thin.woff2","fonts/InterDisplay-ThinItalic.woff2","images/projects/boids.png","images/projects/brave_JDsQ9aBzkQ.png"]),
	mimeTypes: {".png":"image/png",".woff2":"font/woff2"},
	_: {
		client: {start:"_app/immutable/entry/start.DRV3XNlY.js",app:"_app/immutable/entry/app.ByPVnfDZ.js",imports:["_app/immutable/entry/start.DRV3XNlY.js","_app/immutable/chunks/-sW8skVC.js","_app/immutable/chunks/_OcMX5iL.js","_app/immutable/chunks/WWsiE_FM.js","_app/immutable/entry/app.ByPVnfDZ.js","_app/immutable/chunks/_OcMX5iL.js","_app/immutable/chunks/PjhOgUpK.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js'))
		],
		routes: [
			{
				id: "/(home)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/now-playing",
				pattern: /^\/api\/now-playing\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/now-playing/_server.ts.js'))
			},
			{
				id: "/api/top-tracks",
				pattern: /^\/api\/top-tracks\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/top-tracks/_server.ts.js'))
			},
			{
				id: "/music",
				pattern: /^\/music\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/projects",
				pattern: /^\/projects\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
