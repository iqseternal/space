import '#/globalForNode';
import '#/code/measure/unhandledWarning';

import { setupApp } from './setupApp';
import { setupMainWindow } from './setupService';
import { setupUi } from './setupUi';

import { dialog, ipcMain, app, BrowserWindow } from 'electron';

import { FileService } from '#/code/service/FileService';
import { AppDataService } from '#/code/service/AppDataService';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { WindowService } from '#/code/service/WindowService';

import { PrinterService } from '#/code/service/PrinterService';
import { ReptileService } from '#/code/service/ReptileService';

import { join } from 'path';

import { execShell } from '#code/core/shell/execShell';
import { spawn } from 'child_process';
import { print, printClear, toColor } from '@suey/printer';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '#/config';
import { webContents } from 'electron/main';

setupApp(async () => {
  // const { windowService } = await setupService();
  const mainWindow = await setupMainWindow();

  mainWindow.open();


  setTimeout(() => {
    if (!mainWindow.window.isVisible()) {
      PrinterService.printError('渲染进程代码出错, 请检查');

      mainWindow.window.show();
    }
  }, 2000);
});

