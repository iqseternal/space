import { join } from "path";

/**
 * 静态 Config , 并不存储在 JSON 中, 不希望用户更改
 */

export const PAGES_WINDOW_MAIN = join(__dirname, '../renderer/index.html');

export const PAGES_WINDOW_SETTING = join(__dirname, '../renderer/setting.html');
