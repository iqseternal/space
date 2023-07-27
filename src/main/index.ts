
import { dialog } from 'electron';
import { setupApp } from './setupApp';
import { setupService } from './setupService';

import '#code/measure/unhandledPromiseRejectionWarning';

setupApp(async () => {
  const { windowService, appDataService } = await setupService();



});

