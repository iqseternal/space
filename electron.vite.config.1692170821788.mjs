// electron.vite.config.ts
import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from "electron-vite";

// alias.config.ts
import * as path from "path";

// tsconfig.web.json
var compilerOptions = {
  target: "ESNext",
  module: "ESNext",
  moduleResolution: "Node",
  noEmit: true,
  noEmitOnError: true,
  noUncheckedIndexedAccess: false,
  noUnusedLocals: false,
  noUnusedParameters: false,
  noImplicitAny: false,
  allowUnusedLabels: true,
  allowImportingTsExtensions: true,
  removeComments: true,
  isolatedModules: false,
  esModuleInterop: true,
  composite: true,
  sourceMap: false,
  baseUrl: ".",
  paths: {
    "#/*": ["src/*"],
    "#constants/*": ["src/constants/*"],
    "@renderer/*": ["src/renderer/src/*"],
    "@pages/*": ["src/renderer/src/pages/*"]
  }
};

// tsconfig.node.json
var compilerOptions2 = {
  noEmit: true,
  noEmitOnError: true,
  noUncheckedIndexedAccess: false,
  noUnusedLocals: false,
  noUnusedParameters: false,
  noImplicitAny: false,
  allowUnusedLabels: true,
  isolatedModules: false,
  composite: true,
  types: ["electron-vite/node"],
  baseUrl: ".",
  paths: {
    "#/*": ["src/*"],
    "#code/*": ["src/code/*"],
    "#constants/*": ["src/constants/*"]
  }
};

// alias.config.ts
var __electron_vite_injected_dirname = "C:\\Users\\SueyYen\\Desktop\\space";
var resolveAlias = (aliasPath) => {
  if (!aliasPath)
    return [];
  const alias = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace("/*", ""), replacement: path.resolve(__electron_vite_injected_dirname, aliasPath[key][0].replace("/*", "")) });
  return alias;
};
var webAlias = resolveAlias(compilerOptions.paths);
var nodeAlias = resolveAlias(compilerOptions2.paths);

// electron.vite.config.ts
import { join } from "path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
var __electron_vite_injected_dirname2 = "C:\\Users\\SueyYen\\Desktop\\space";
var electron_vite_config_default = defineConfig(() => ({
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
      externalizeDepsPlugin({}),
      bytecodePlugin()
    ],
    resolve: {
      alias: nodeAlias
    },
    build: {
      chunkSizeWarningLimit: 2e3,
      minify: "terser",
      terserOptions: {
        compress: {
          // drop_console: true,
          // drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          exports: "auto",
          format: "cjs"
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
      rollupOptions: {}
    }
  },
  renderer: defineViteConfig(({ command, mode }) => {
    return {
      root: "src/renderer",
      resolve: { alias: webAlias },
      plugins: [vue(), vueJsx()],
      server: {},
      build: {
        chunkSizeWarningLimit: 2e3,
        assetsDir: "static",
        minify: "terser",
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        rollupOptions: {
          input: {
            index: join(__electron_vite_injected_dirname2, "./src/renderer/index.html"),
            setting: join(__electron_vite_injected_dirname2, "./src/renderer/setting.html")
          }
        },
        outDir: join(__electron_vite_injected_dirname2, "./out/renderer")
      }
    };
  })
}));
export {
  electron_vite_config_default as default
};
