
import type { ElectronAPI as BASE_ElectionAPI } from '@electron-toolkit/preload';
import type { NodeProcess, IpcRenderer as BASE_IcpRenderer, WebFrame } from '@electron-toolkit/preload';

import type { MainEventHandlers } from '#/constants';

/**
 * 原本的 IcpRenderer 返回类型为 Promise<any>, 所需需要自己重新修改一下返回值
 */
export interface IpcRenderer extends BASE_IcpRenderer {
  // 向主进程发送事件
  invoke<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): Promise<ReturnType<F>>;
  send<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): void;
  sendSync<T extends keyof MainEventHandlers, F = MainEventHandlers[T]>(channel: T, ...args: Parameters<F>): void;
}

export interface ElectronAPI extends BASE_ElectionAPI {
  ipcRenderer: IpcRenderer;
  webFrame: WebFrame;
  process: NodeProcess;
}
