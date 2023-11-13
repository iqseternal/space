import type { ProxyOptions, AliasOptions, Alias } from 'vite';
import { loadEnv } from 'vite';
import * as path from 'path'
import * as webConfig from './tsconfig.web.json';
import * as nodeConfig from './tsconfig.node.json';

const resolveAlias = (aliasPath: Record<string, string[]>): AliasOptions => {
  if (!aliasPath) return [];
  const alias: Alias[] = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(__dirname, aliasPath[key][0].replace('/*', '')) });
  return alias;
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
      secure: false,
      changeOrigin: true,
      rewrite: path => path.replace(env.SPACE_API_BASE_URL, '')
    }
  }
};
