import build from '@hono/vite-cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'
import honoPlugin from '@hono/vite-cloudflare-pages';
import path from 'path';

/*
export default defineConfig({
  plugins: [
    build(),
    devServer({
      adapter,
      entry: 'src/index.tsx'
    })
  ]
});
*/


export default defineConfig(({ mode }) => {
  const isClient = mode === 'client';

  return {
    build: {
      outDir: 'dist',
      rollupOptions: isClient ? {
        input: './src/main.tsx',
        output: {
          entryFileNames: 'static/main.js',
        },
      } : {},
    },
    publicDir: 'dist', // tells to use the dist folder as the public folder for static files
    plugins: isClient ? [] : [
      build(),
      devServer({
        adapter,
        entry: 'src/index.tsx',
      }),
    ]
  };
});
