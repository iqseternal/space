

import { IPC_MAIN_WINDOW } from '#/constants';

export const openSettingPage = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_OPEN, 'windowSetting');
