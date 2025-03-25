import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],

    kit: {
        adapter: adapter({
            out: 'public' // Specify the output directory
        }),
        // Add the following lines if you need to specify the output directory or other options
        // paths: {
        //     base: '',
        //     assets: ''
        // },
        // prerender: {
        //     default: true
        // }
    }
};

export default config;
