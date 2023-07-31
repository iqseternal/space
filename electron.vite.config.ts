import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './alias.config';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(() => ({
  main: {
    plugins: [
      externalizeDepsPlugin(), bytecodePlugin()
    ],
    resolve: {
      alias: nodeAlias
    },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          exports: 'auto',
          format: 'cjs',
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
        assetsDir: 'static',
        minify: 'terser',
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        rollupOptions: {


        }
      }
    }
  })
}));




