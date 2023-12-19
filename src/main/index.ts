import '#/global';
import '#/code/measure/unhandledWarning';
import './setupHandles';
import { setupApp } from './setupApp';
import { setupMainWindow, setupSettingWindow, setupDialogWindow } from './setupService';
import { setupUi } from './setupUi';
import { dialog, ipcMain, app, BrowserWindow, Notification } from 'electron';
import { FileService } from '#service/FileService';
import { AppDataService } from '#service/AppDataService';
import { AppConfigService } from '#service/AppConfigService';
import { UserConfigService } from '#service/UserConfigService';
import { WindowService } from '#service/WindowService';
import { PrinterService } from '#service/PrinterService';
import { ReptileService } from '#service/ReptileService';
import { NotificationService } from '#service/NotificationService';
import { WindowStateService } from '#service/WindowStateService';
import { execShell } from '#code/core/shell/execShell';
import { spawn } from 'child_process';
import { print, printClear, toColor } from '@suey/printer';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '#/config';
import { CONFIG } from '#/constants';

setupApp(async () => {
  const windowStateService = WindowStateService.getInstance();


  windowStateService.appendMainWindow(await setupMainWindow());


  windowStateService.startMainWindow();
  // const settingWindow = await setupSettingWindow();
  // settingWindow.open();

  // const dialog = await setupDialogWindow({
  //   type: 'info'
  // });

  // dialog.open();
});
