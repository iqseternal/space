// electron.vite.config.ts
import { defineConfig, defineViteConfig, externalizeDepsPlugin, bytecodePlugin } from "electron-vite";

// alias.config.ts
import * as path from "path";

// tsconfig.web.json
var compilerOptions = {
  target: "ESNext",
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
    "@/*": ["src/renderer/*"],
    "@renderer/*": ["src/renderer/src/*"],
    "@pages/*": ["src/renderer/src/pages/*"],
    "@scss/*": ["src/renderer/src/styles/*"]
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
import svgLoader from "vite-svg-loader";
var __electron_vite_injected_dirname2 = "C:\\Users\\SueyYen\\Desktop\\space";
var electron_vite_config_default = defineConfig(() => ({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()],
    resolve: {
      alias: nodeAlias
    },
    build: {
      chunkSizeWarningLimit: 2e3,
      minify: "terser",
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
      rollupOptions: {}
    }
  },
  renderer: defineViteConfig(() => {
    return {
      resolve: { alias: webAlias },
      plugins: [vue(), vueJsx(), svgLoader({ defaultImport: "url" })],
      server: {
        hmr: true,
        host: "0.0.0.0",
        proxy: {}
      },
      build: {
        chunkSizeWarningLimit: 2e3,
        assetsDir: "static",
        minify: "terser",
        terserOptions: {
          // compress: {
          //   drop_console: true,
          //   drop_debugger: true
          // }
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
