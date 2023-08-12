
import type { ElectronAPI as BASE_ElectionAPI } from '@electron-toolkit/preload';
import type { NodeProcess, IpcRenderer as BASE_IcpRenderer, WebFrame } from '@electron-toolkit/preload';

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 */
export interface IpcRenderer extends BASE_IcpRenderer {
  invoke<T>(channel: string, ...args: any[]): Promise<IcpResponse<T>>;
}

export interface ElectronAPI extends BASE_ElectionAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}
