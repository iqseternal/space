import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';

export interface AppOptions {
  modelId: string;
};

export const DEFAULT_APP_OPTIONS: Required<AppOptions> = {
  modelId: 'com.electron'
};

export const setupApp = async (startApp: () => void, ops?: Partial<AppOptions>): Promise<void> => {
  const options = { ...DEFAULT_APP_OPTIONS, ...ops } as Required<AppOptions>;

  app.whenReady().then(() => {
    electronApp.setAppUserModelId(options.modelId);

    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    startApp();

    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) startApp();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    };
  });

  return Promise.resolve();
}
