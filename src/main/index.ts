import { setupApp } from './setupApp';
import { setupService } from './setupService';

import { dialog } from 'electron';

import '#code/measure/unhandledPromiseRejectionWarning';

setupApp(async () => {
  const {
    windowService
  } = await setupService();

});
