import react from '@vitejs/plugin-react';
import { HtmlTagDescriptor, defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import tsconfigPaths from 'vite-tsconfig-paths';

const injectHtmlsServe: HtmlTagDescriptor[] = [
  { tag: 'script', attrs: { src: '/env.js' }, injectTo: 'body' },
  {
    tag: 'script',
    attrs: { src: '/colorPresets.js' },
    injectTo: 'body',
  },
];

const injectHtmlsBuild: HtmlTagDescriptor[] = [
  ...injectHtmlsServe,
  { tag: 'script', attrs: { src: '/configs/env-local.js' }, injectTo: 'body' },
  {
    tag: 'script',
    attrs: { src: '/configs/colorPresets.js' },
    injectTo: 'body',
  },
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),

    // support type checking
    checker({
      typescript: { tsconfigPath: 'tsconfig.tsc.json' },
    }),

    // support tsconfig paths
    tsconfigPaths(),

    // polyfill nodejs modules for browser
    nodePolyfills({
      exclude: ['constants'],
      globals: {
        global: 'dev',
        process: 'dev',
      },
    }),

    // append link, script when serve (dev)
    {
      name: 'inject-htmls-serve',
      apply: 'serve',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => {
          return {
            html,
            tags: injectHtmlsServe,
          };
        },
      },
    },
    // append link, script when build
    {
      name: 'inject-htmls-build',
      apply: 'build',
      transformIndexHtml: {
        order: 'pre',
        handler: (html) => {
          return {
            html,
            tags: injectHtmlsBuild,
          };
        },
      },
    },
  ],
  server: {
    open: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
  },
});
