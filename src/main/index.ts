
import { dialog } from 'electron';
import { setupApp } from './setupApp';
import { setupService } from './setupService';

import '#code/measure/unhandledPromiseRejectionWarning';

setupApp(async () => {
  const { windowService, appDataService, wallpaperService, obtainService } = setupService();


  await obtainService.obtainSourceInit('https://cn.bing.com/images/search?q=%e5%9b%be%e7%89%87&form=HDRSC3&first=1');

  const urls = await obtainService.obtainImg();
  console.log(urls);


  const u = await obtainService.obtainImg();
  console.log(u);

});

