import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false,
      strict: true
    }),
    paths: {
      base: '/bell-main'
    },
    prerender: {
      entries: ['*', '/projects', '/music'],
      handleHttpError: ({ path, referrer, message }) => {
        // ignore deliberate link to API routes
        if (path.startsWith('/api/')) {
          return;
        }

        // otherwise fail the build
        throw new Error(message);
      }
    }
  },
  preprocess: preprocess(),
};
