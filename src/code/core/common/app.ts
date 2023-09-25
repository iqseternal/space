
import { app } from 'electron';

export const reloadApp = () => {
  app.relaunch();

  app.exit();
}

