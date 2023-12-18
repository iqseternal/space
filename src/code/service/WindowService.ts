import { join } from 'path';
import { BrowserWindow, shell, type BrowserWindowConstructorOptions } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowMinSize, setWindowOpenHandler, setWindowCaption, setWindowDevtoolsDetach } from '../core/common/window';

import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config';
import { CONFIG } from '#/constants';
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
  private openBeforeCbs: WindowCb[] = [];
  private openThenCbs: BaseCb[] = [];
  private openCatchCbs: BaseCb[] = [];

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
        devTools: true,

        webSecurity: true,
        nodeIntegration: true,
        contextIsolation: true,
        nodeIntegrationInSubFrames: true,
        nodeIntegrationInWorker: true
      },
    }));
    setWindowMaxSize(this.window);

    // Menu.setApplicationMenu(null);

    if (this.options.autoShow) this.window.on('ready-to-show', () => this.window.show());

    setWindowCaption(this.window, icon, CONFIG.PROJECT);

    setWindowOpenHandler(this.window);
  }

  addOpenBeforeCb(cb: WindowCb) { this.openBeforeCbs.push(cb); }
  addOpenThenCb(cb: BaseCb) { this.openThenCbs.push(cb); }
  addOpenCatchCb(cb: BaseCb) { this.openCatchCbs.push(cb); }

  open(beforeCb?: WindowCb, ok?: BaseCb, fail?: BaseCb) {
    return new Promise<void>(async (resolve, reject) => {
      let p: undefined | Promise<void> = void 0;

      beforeCb && await beforeCb(this.window);

      await this.openBeforeCbs.forEach(cb => cb(this.window));

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) p = this.window.loadURL(this.options.url);
      else p = this.window.loadFile(PAGES_WINDOW_MAIN);

      p.then(async () => {
        ok && ok();
        this.openThenCbs.forEach(cb => cb());
        resolve();
      }).catch(async () => {
        fail && fail();
        this.openCatchCbs.forEach(cb => cb());
        reject();
      });
    });
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


