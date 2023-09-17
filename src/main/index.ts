import '#/globalForNode';
import '#/code/measure/unhandledWarning';

import { setupApp } from './setupApp';
import { setupService } from './setupService';
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
import { IPC_WALLPAPER } from '#/constants';

import { execShell } from '#code/core/shell/execShell';
import { spawn } from 'child_process';
import { print, printClear, toColor } from '@suey/printer';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '#/config';
import { webContents } from 'electron/main';

import './setupHandle';

setupApp(async () => {
  const { windowService } = await setupService();
});


new Error('');
