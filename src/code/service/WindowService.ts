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
  disableAutoHideCursor: true,
  frame: true,
  alwaysOnTop: false,
};

export class WindowService {
  public readonly window: BrowserWindow;

  constructor(
    options: Partial<BrowserWindowConstructorOptions>
  ) {
    this.window = setWindowCross(new BrowserWindow({
      width: 1650,
      height: 780,
      ...options,
      ...DEFAILT_OPTIONS,
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

    this.window.on('ready-to-show', () => this.window.show());

    setWindowCaption(this.window, icon, 'Percious');

    setWindowOpenHandler(this.window);
  }

  open(url: string) {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) this.window.loadURL(url);
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


