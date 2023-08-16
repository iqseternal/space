import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite';
import { webAlias, nodeAlias } from './alias.config';
import { join } from 'path';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(() => ({
  main: {
    plugins: [
      /**
       * 已测试, 依赖处理项 puppeteer 有问题, 如果自动排除依赖那么启动时出现:
       *    A JavaScript error occured in the main process.
       *    TypeError: http_proxy_agent_1.HttpProxyAgent.protocols is not iterable。
       * 目前看来, 与字节码插件无关, 只和插件 externalizeDepsPlugin 的配置以及是否正确打包 puppeteer 有关
       *
       * 如果不将 electron 作为外部依赖处理，那么字节码插件在解析electron源码时会出现异常
       * */
      externalizeDepsPlugin({

      }), bytecodePlugin()
    ],
    resolve: {
      alias: nodeAlias
    },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: 'terser',

      terserOptions: {
        compress: {
          // drop_console: true,
          // drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          exports: 'auto',
          format: 'es',
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
          input: {
            index: join(__dirname, './src/renderer/index.html'),
            setting: join(__dirname, './src/renderer/setting.html')
          }
        },
        outDir: join(__dirname, './out/renderer')
      }
    }
  })
}));




