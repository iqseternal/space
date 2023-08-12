import '#/globalForNode';
import '#code/measure/unhandledPromiseRejectionWarning';

import { setupApp } from './setupApp';
import { setupService } from './setupService';
import { setupUi } from './setupUi';

import { dialog } from 'electron';

import { DownloadService } from '#code/service/DownloadService';
import { FileService } from '#/code/service/FileService';

import { AppDataService } from '#/code/service/AppDataService';

import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { WindowService } from '#/code/service/WindowService';

import appConfigJson from '../../app.config.json';

setupApp(async () => {
  // const appDataService = new AppDataService('userData', 'download');

  // const downloadService = new DownloadService();

  // const bitData = await downloadService.download('https://tse3-mm.cn.bing.net/th/id/OIP-C.Md86Wi2EYiKHNPldRZiD4gHaEo?w=276&h=180&c=7&r=0&o=5&pid=1.7');


  // const appConfigService = AppConfigService.getInstance();

  new WindowService(appConfigJson.windows.mediumPopupWindow).open();

  // FileService.saveFile(appDataService.sourcePath, bitData).then(() => {

  //   console.log('ok');
  // }).catch(err => {
  //   console.log(err);
  // })

});
