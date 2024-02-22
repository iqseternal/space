import type { UserConfig, UserConfigExport, UserConfigFn } from 'electron-vite';
import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias, loadLintDevPlugins, define } from './vite.config.util';
import { join } from 'path';
import { obfuscator } from 'rollup-obfuscator';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { AndDesignVueResolve } from 'vite-plugin-style-import';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

import autoImport from 'unplugin-auto-import/vite';

import eslintPlugin from 'vite-plugin-eslint';
import components from 'unplugin-vue-components/vite';

export type ConfigEnv = Parameters<UserConfigFn>[0];

const mainConfig = ({ mode }: ConfigEnv): UserConfig['main'] => ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintDevPlugins()
  ],
  resolve: {
    alias: nodeAlias
  },
  define: define(mode),
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
});

const preloadConfig = ({ mode }: ConfigEnv): UserConfig['preload'] => ({
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    ...loadLintDevPlugins()
  ],
  define: define(mode),
  resolve: {
    alias: nodeAlias
  }
});

const rendererConfig = ({ mode }: ConfigEnv): UserConfig['renderer'] => {
  return {
    resolve: {
      alias: webAlias,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue({
        script: {
          defineModel: true
        }
      }),
      vueJsx(),
      svgLoader({ defaultImport: 'url' }),
      components({
        transformer: 'vue3',
        extensions: ['vue', 'jsx', 'tsx'],
        dirs: [],
        dts: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
            resolveIcons: true,
            cjs: false
          })
        ]
      }),
      ...loadLintDevPlugins()
    ],
    define: define(mode),
    server: {
      port: 8888,
      hmr: true,
      host: '0.0.0.0',
      proxy: {

      }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      assetsDir: 'static',
      minify: 'terser',
      manifest: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        input: {
          index: join(__dirname, './src/renderer/index.html'),
          setting: join(__dirname, './src/renderer/setting.html'),
          dialog: join(__dirname, './src/renderer/dialog.html')
        }
      },
      outDir: join(__dirname, './out/renderer')
    }
  }
};

export default defineConfig((configEnv) => ({
  main: mainConfig(configEnv),
  preload: preloadConfig(configEnv),
  renderer: rendererConfig(configEnv)
}));
