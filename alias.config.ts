import * as path from 'path'
import * as webConfig from './tsconfig.web.json';
import * as nodeConfig from './tsconfig.node.json';
import { AliasOptions, Alias } from 'vite';

const resolveAlias = (aliasPath: Record<string, string[]>): AliasOptions => {
  if (!aliasPath) return [];
  const alias: Alias[] = [];

  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(__dirname, aliasPath[key][0].replace('/*', '')) });

  return alias;
}

export const webAlias = resolveAlias(webConfig.compilerOptions.paths);

export const nodeAlias = resolveAlias(nodeConfig.compilerOptions.paths);
