import { defineStartConfig } from './vite.config.util';
import type { DevConfig, BuildConfig } from './vite.config.util';
import { PLATFORMS, ENV } from './target.config';

export default defineStartConfig(({ env, plactform }) => {

  const devConfig: DevConfig = {
    lintFileName: true
  }

  const buildConfig: BuildConfig = {

  }


  return { devConfig, buildConfig }
})
