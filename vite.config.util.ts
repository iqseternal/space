import type { ProxyOptions, AliasOptions, Alias, Plugin, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { ENV, PLATFORMS } from './target.config';
import eslintPlugin from 'vite-plugin-eslint';
import * as path from 'path';
import * as webConfig from './tsconfig.web.json';
import * as nodeConfig from './tsconfig.node.json';

const START_OPTIONS = {
  LINT_ON_DEV: false // dev 模式下启用 lint
}

export const define = (mode: string) => {
  return {
    CURRENT_PLATFORM: PLATFORMS.WINDOWS,
    CURRENT_ENV: ENV.DEV
  }
}

export const webAlias = resolveAlias(webConfig.compilerOptions.paths);

export const nodeAlias = resolveAlias(nodeConfig.compilerOptions.paths);

// 没有作用
export const webProxy = (mode: string): Record<string, string | ProxyOptions> => {
  const env = loadEnv(mode, __dirname, ['SPACE_', 'VITE_']);

  return {
    [env.SPACE_API_BASE_URL]: {
      target: 'https://www.oupro.cn:3000/api/v1.0.0',
      ws: true,
      secure: true,
      changeOrigin: true,
      rewrite: path => path.replace(env.SPACE_API_BASE_URL, '')
    }
  }
};

export function resolveAlias(aliasPath: Record<string, string[]>): AliasOptions {
  if (!aliasPath) return [];
  const alias: Alias[] = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(__dirname, aliasPath[key][0].replace('/*', '')) });
  return alias;
}

/**
 * 检查Vue文件名的插件
 * @returns
 */
export function vitecheckVueNamePlugin(): Plugin {
  return {
    name: 'vite-plugin-check-file-name',
    transform(code, id) {
      if (!id.endsWith('vue')) return { code };

      const filename = id.substring(id.lastIndexOf('/'));

      if (/^((?=^.*\/.*\.vue$)(.*\/)((index)|([A-Z].*))\.vue$)|(^.*(?<!\.vue$))$/.test(filename)) return { code };

      throw new Error('错误的文件名称, Vue文件名应该大驼峰或者为index.vue');
    }
  }
}

/**
 * 加载lint插件
 * @returns
 */
export function loadLintDevPlugins(): Plugin[] {
  if (!START_OPTIONS.LINT_ON_DEV) return [];

  return [
    vitecheckVueNamePlugin(),
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
  ]
}
