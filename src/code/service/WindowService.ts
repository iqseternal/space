import { join } from 'path';
import { BrowserWindow, shell } from 'electron';
import { is } from '@electron-toolkit/utils';
import { Tray, Menu, app, screen } from 'electron';

import icon from '#/../resources/icon.png?asset';

export class WindowService {
  constructor(

  ) {
    const window = new BrowserWindow({
      width: 1650,
      minWidth: 900,
      height: 780,
      minHeight: 500,
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
    });

    app.whenReady().then(() => {
      const { width: maxWidth, height: maxHeight } = screen.getPrimaryDisplay().size;

      window.setMaximumSize(maxWidth, maxHeight);
    });

    // Menu.setApplicationMenu(null);

    window.on('ready-to-show', () => window.show());

    window.setIcon(icon);
    window.setTitle('Precious');
    // const tray = new Tray(icon);

    // // 自定义托盘图标的内容菜单
    // const contextMenu = Menu.buildFromTemplate([
    //   {
    //     // 点击退出菜单退出程序
    //     label: '退出', click: function () {
    //       window.destroy()
    //       app.quit();
    //     }
    //   }
    // ])

    // tray.setToolTip('demo')  // 设置鼠标指针在托盘图标上悬停时显示的文本
    // tray.setContextMenu(contextMenu)  // 设置图标的内容菜单
    // // 点击托盘图标，显示主窗口
    // tray.on("click", () => {
    //   new WindowService();

    //   // window.show();
    // });


    window.webContents.session.webRequest.onBeforeSendHeaders((details, callback) => {
      callback({ requestHeaders: { origin: '*', ...details.requestHeaders } });
    });
    window.webContents.session.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: { 'Access-Control-Allow-Origin': ['*'], ...details.responseHeaders }
      });
    });

    window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url);

      return { action: 'deny' };
    });

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      window.loadURL(process.env['ELECTRON_RENDERER_URL']);
    }
    else {
      window.loadFile(join(__dirname, '../renderer/index.html'));
    }
  }
}


