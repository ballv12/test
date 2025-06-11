import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
export default {
  kit: {
    adapter: vercel(),
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
