import { join } from 'path';
import { BrowserWindow, shell, type BrowserWindowConstructorOptions } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowMinSize, setWindowOpenHandler, setWindowCaption } from '../core/common/window';

import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config';

import icon from '#/../resources/icon.png?asset';

const DEFAILT_OPTIONS: Partial<BrowserWindowConstructorOptions> = {
  show: false,
  autoHideMenuBar: true,
  disableAutoHideCursor: false,
  frame: true, // 是否带有边框的窗口
  alwaysOnTop: false,
  transparent: false, // 设置为 true, 窗口会变得透明
  hasShadow: true
};

interface Options {
  url: string;
  autoShow: boolean;
}

export class WindowService {
  public readonly window: BrowserWindow;

  constructor(
    windowOptions: Partial<BrowserWindowConstructorOptions>,
    public readonly options: Options
  ) {
    this.window = setWindowCross(new BrowserWindow({
      width: 1650,
      height: 780,
      ...DEFAILT_OPTIONS,
      ...windowOptions,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: true,
        devTools: true,
        webSecurity: true
      }
    }));
    setWindowMaxSize(this.window);

    // Menu.setApplicationMenu(null);

    if (this.options.autoShow) this.window.on('ready-to-show', () => this.window.show());

    setWindowCaption(this.window, icon, 'Percious');

    setWindowOpenHandler(this.window);
  }

  open(url?: string) {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) this.window.loadURL(url ?? this.options.url);
    else this.window.loadFile(PAGES_WINDOW_MAIN);
  }

  async close(): Promise<boolean> {
    return new Promise((resolve, rejecet) => {
      if (this.window.closable) {

        this.window.close();
        resolve(true);
      }
      else rejecet(false);
    });
  }

  distory() {
    this.window.destroy();
  }
}


