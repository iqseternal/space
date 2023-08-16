import '#/globalForNode';
import '#code/measure/unhandledPromiseRejectionWarning';

import { setupApp } from './setupApp';
import { setupService } from './setupService';
import { setupUi } from './setupUi';

import { dialog, ipcMain } from 'electron';

import { AppDataService } from '#/code/service/AppDataService';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { WindowService } from '#/code/service/WindowService';

import appConfigJson from '../../app.config.json';
import { join } from 'path';
import { IPC_WALLPAPER } from '#/constants';

import { app, BrowserWindow } from 'electron';


import { execShell } from '#code/core/shell/execShell';

setupApp(async () => {
  // const {} = await setupService();

  new WindowService(appConfigJson.windows.mainWindow).open();

  execShell(`node ${join(__dirname, '../../scripts/reptile/index.js')}`)

});


