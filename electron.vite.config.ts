import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './alias.config';
import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(() => ({
  main: {
    plugins: [bytecodePlugin()],
    resolve: {
      alias: nodeAlias
    },
    build: {
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        output: {
          exports: 'named',
          format: 'cjs'
        }
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    resolve: {
      alias: nodeAlias
    },
    build: {
      rollupOptions: {

      }
    }
  },
  renderer: defineViteConfig(({ command, mode }) => {
    return {
      root: 'src/renderer',
      resolve: { alias: webAlias },
      plugins: [vue(), vueJsx()],
      server: {

      },
      build: {
        chunkSizeWarningLimit: 2000,
        assetsDir: 'static'
      }
    }
  })
}));
