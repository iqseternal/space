import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './alias.config';
import { join } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import svgLoader from 'vite-svg-loader';

export default defineConfig(() => ({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
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
  renderer: defineViteConfig(() => {
    return {
      resolve: { alias: webAlias },
      plugins: [vue(), vueJsx(), svgLoader({ defaultImport: 'url' })],
      server: {
        hmr: true,
        host: '0.0.0.0',
        proxy: {

        }
      },
      build: {
        chunkSizeWarningLimit: 2000,
        assetsDir: 'static',
        minify: 'terser',
        terserOptions: {
          // compress: {
          //   drop_console: true,
          //   drop_debugger: true
          // }
        },
        rollupOptions: {
          input: {
            index: join(__dirname, './src/renderer/index.html'),
            setting: join(__dirname, './src/renderer/setting.html')
          }
        },
        outDir: join(__dirname, './out/renderer')
      },
    }
  })
}));




