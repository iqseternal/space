import { is } from '@electron-toolkit/utils';
import { join } from 'path';

/**
 * Config , 并不存储在 JSON 中, 不希望用户更改
 */
const makeStartUrl = (url: string) => {
  if (is.dev && process.env['ELECTRON_RENDERER_URL'])
    return `${process.env['ELECTRON_RENDERER_URL']}/${url}`;

  return join(__dirname, `../renderer/${url}`);
}

// const PAGE_WINDOW_LOGIN_NAME = 'login.html';
// export const PAGES_WINDOW_LOGIN = makeStartUrl(PAGE_WINDOW_LOGIN_NAME);

const PAGES_WINDOW_MAIN_NAME = 'index.html';
export const PAGES_WINDOW_MAIN = makeStartUrl(PAGES_WINDOW_MAIN_NAME);

const PAGES_WINDOW_SETTING_NAME = 'setting.html';
export const PAGES_WINDOW_SETTING = makeStartUrl(PAGES_WINDOW_SETTING_NAME);
