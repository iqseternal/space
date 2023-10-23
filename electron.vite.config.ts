import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './alias.config';
import { join } from 'path';
import { obfuscator } from 'rollup-obfuscator';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';

export default defineConfig(() => ({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin({
      protectedStrings: ['ABC'] // 保护的字符串
    })],
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
        manifest: true,
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
          },
          plugins: [
            obfuscator({
              include: [
                'src/**/*.js', 'src/**/*.jsx',
                'src/**/*.ts', 'src/**/*.tsx'
              ],
              compact: true,
              controlFlowFlattening: true,
              controlFlowFlatteningThreshold: 1,
              deadCodeInjection: true,
              deadCodeInjectionThreshold: 1,
              debugProtection: false,
              disableConsoleOutput: false,
              identifierNamesGenerator: 'hexadecimal',
              log: false,
              numbersToExpressions: true,
              renameGlobals: false,
              rotateStringArray: true,
              selfDefending: true,
              shuffleStringArray: true,
              simplify: true,
              splitStrings: true,
              splitStringsChunkLength: 5,
              stringArray: true,
              stringArrayEncoding: ['rc4'],
              stringArrayIndexShift: true,
              stringArrayWrappersCount: 5,
              stringArrayWrappersChainedCalls: true,
              stringArrayWrappersParametersMaxCount: 5,
              stringArrayWrappersType: 'function',
              stringArrayThreshold: 1,
              transformObjectKeys: true,
              unicodeEscapeSequence: false
            })
          ]
        },
        outDir: join(__dirname, './out/renderer')
      },
    }
  })
}));




