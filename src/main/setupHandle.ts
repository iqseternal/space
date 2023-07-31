
import { type IpcMainInvokeEvent } from 'electron';
import { ipcMain, ipcRenderer } from 'electron';


export const setupIcpMainHandle = (icp: string, listener: (event: IpcMainInvokeEvent, ...args: any[]) => (Promise<void> | any)): void => {
  ipcMain.handle(icp, listener);
};
