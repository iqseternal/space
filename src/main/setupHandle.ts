
import { type IpcMainInvokeEvent } from 'electron';
import { ipcMain } from 'electron';

export const setupIcpHandle = (icp: string, listener: (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<void> | any)): void => {
  ipcMain.handle(icp, listener);
};
