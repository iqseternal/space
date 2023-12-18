import type { UserConfig, UserConfigExport } from 'electron-vite';
import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './vite.config.util';
import { join } from 'path';
import { obfuscator } from 'rollup-obfuscator';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { AndDesignVueResolve } from 'vite-plugin-style-import';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

import autoImport from 'unplugin-auto-import/vite';
import styleImport from 'vite-plugin-style-import';

import eslintPlugin from 'vite-plugin-eslint';
import components from 'unplugin-vue-components/vite';


const mainConfig: UserConfig['main'] = {
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.vue'
      ],
      overrideConfigFile: './.eslintrc.js',
      useEslintrc: true,
      cache: true,
      fix: false
    })
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
    }
  }
};

const preloadConfig: UserConfig['main'] = {
  plugins: [
    externalizeDepsPlugin(),
    bytecodePlugin(),
    eslintPlugin({
      include: [
        'src/**/*.ts',
        'src/**/*.vue'
      ],
      overrideConfigFile: './.eslintrc.js',
      useEslintrc: true,
      cache: true,
      fix: false
    })
  ],
  resolve: {
    alias: nodeAlias
  }
};


const rendererConfig = defineViteConfig(() => {
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
      vue(),
      eslintPlugin({
        include: [
          'src/**/*.ts',
          'src/**/*.vue'
        ],
        overrideConfigFile: './.eslintrc.js',
        useEslintrc: true,
        cache: true,
        fix: false
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
      })
    ],
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
})

export default defineConfig(() => ({
  main: mainConfig,
  preload: preloadConfig,
  renderer: rendererConfig
}));
