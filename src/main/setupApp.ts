import { app, BrowserView, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from '#/code/service/PrinterService';
import { print } from '@suey/printer';

import './setupHandles';

export interface AppOptions {
  modelId: string;
};

export const DEFAULT_APP_OPTIONS: Required<AppOptions> = {
  modelId: 'com.electron'
};

export const setupApp = async (startApp: () => void, ops?: Partial<AppOptions>): Promise<void> => {
  print();
  PrinterService.printInfo('应用程序构建, setupApp...');
  const options = { ...DEFAULT_APP_OPTIONS, ...ops } as Required<AppOptions>;

  app.whenReady().then(() => {
    electronApp.setAppUserModelId(options.modelId);

    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    if (BrowserWindow.getAllWindows().length !== 0) {
      BrowserWindow.getAllWindows()[0].focus();
    }
    else startApp();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        try { startApp(); }
        catch { app.quit(); }
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
      app.quit();
    };
  });

  return Promise.resolve();
}
