import { join } from 'path';
import { BrowserWindow, shell } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';
import { setWindowCross, setWindowMaxSize, setWindowMinSize } from '../core/common/window';

import icon from '#/../resources/icon.png?asset';

export class WindowService {
  public readonly window: BrowserWindow;

  constructor(

  ) {
    this.window = setWindowCross(new BrowserWindow({
      width: 1650,
      height: 780,
      show: false,
      autoHideMenuBar: true,
      disableAutoHideCursor: true,
      frame: true,
      alwaysOnTop: false,

      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        nodeIntegration: true,
        devTools: true,
        webSecurity: true
      }
    }));

    setWindowMinSize(this.window, 900, 500);
    setWindowMaxSize(this.window);

    // Menu.setApplicationMenu(null);

    this.window.on('ready-to-show', () => this.window.show());

    this.window.setIcon(icon);
    this.window.setTitle('Precious');

    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);

      return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.window.loadURL(process.env['ELECTRON_RENDERER_URL']);
    }
    else {
      this.window.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }
}


