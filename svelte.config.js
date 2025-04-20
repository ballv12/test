import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/test' : ''
    }
  },
  preprocess: preprocess(),
};
