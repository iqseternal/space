/**
 * ==========================================
 * IPC 常量编写, 多关于窗口
 * ==========================================
 */
import type { CONFIG } from './config';

export class IPC_DEV {
  public static readonly DEV_OPEN_TOOL = 'DEV_OPEN_TOOL'; // 打开 devtools
}

export class IPC_MAIN_WINDOW {
  public static readonly WINDOW_MAX_SIZE = 'WINDOW_MAX_SIZE'; // 最大化窗口
  public static readonly WINDOW_MIN_SIZE = 'WINDOW_MIN_SIZE'; // 最小化窗口
  public static readonly WINDOW_REDUCTION = 'WINDOW_REDUCTION'; // 还原窗口

  public static readonly WINDOW_RESIZE_ABLE = 'WINDOW_RESIZE_ABLE'; // 窗口是否可以调整大小
  public static readonly WINDOW_RELAUNCH = 'WINDOW_RELAUNCH'; // 重新加载应用程序
  public static readonly WINDOW_SET_SIZE = 'WINDOW_SET_SIZE'; // 设置窗口大小
  public static readonly WINDOW_RESET_CUSTOM_SIZE = 'WINDOW_CUSTOM_SIZE'; // 重置为用户设置的大小

  public static readonly WINDOW_SET_POSITION = 'WINDOW_SET_POSITION'; // 设置窗口的位置

  public static readonly WINDOW_OPEN = 'WINDOW_OPEN'; // 打开一个窗口
  public static readonly WINDOW_CLOSE = 'WINDOW_CLOSE'; // 关闭窗口
  public static readonly WINDOW_SHOW = 'WINDOW_SHOW'; // 隐藏窗口
}

export class IPC_RENDER_WINDOW {
  public static readonly WINDOW_STATUS = 'WINDOW_STATUS'; // 当前窗口的窗台, true => 最大化, false => 正常
}

export class IPC_RENDER_DIALOG_WINDOW {
  public static readonly DIALOG_TYPE = 'DIALOG_TYPE';
}

/** 定义每一个 Channel 所对应的类型 */
export type MainEventHandlers = {
  [IPC_DEV.DEV_OPEN_TOOL]: (status: boolean, options?: {
    mode: ('left' | 'right' | 'bottom' | 'undocked' | 'detach');
    activate?: boolean;
  }) => IpcResponse<boolean>;

  [IPC_MAIN_WINDOW.WINDOW_MAX_SIZE]: (id?: number) => IpcResponse<void>;
  [IPC_MAIN_WINDOW.WINDOW_MIN_SIZE]: (id?: number) => IpcResponse<void>;
  [IPC_MAIN_WINDOW.WINDOW_REDUCTION]: (id?: number) => IpcResponse<boolean>;

  [IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE]: (able: boolean) => IpcResponse<boolean>;
  [IPC_MAIN_WINDOW.WINDOW_RELAUNCH]: () => IpcResponse<void>;
  [IPC_MAIN_WINDOW.WINDOW_SET_SIZE]: (width: number, height: number) => IpcResponse<boolean>;
  [IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE]: (type: 'mainWindow') => IpcResponse<void>;

  [IPC_MAIN_WINDOW.WINDOW_SET_POSITION]: (x: number | 'center' | 'left' | 'right' | 'top' | 'bottom', y?: number) => IpcResponse<boolean>;

  [IPC_MAIN_WINDOW.WINDOW_OPEN]: (pageType: 'windowMain' | 'windowSetting') => IpcResponse<boolean>; // 三个页面, 登录、主窗口、设置页面
  [IPC_MAIN_WINDOW.WINDOW_CLOSE]: (id?: number) => IpcResponse<boolean>;
  [IPC_MAIN_WINDOW.WINDOW_SHOW]: (isShow: boolean, id?: number) => IpcResponse<boolean>; // 是否展示改窗口
}

export type RendererEventHandlers = {
  [IPC_RENDER_WINDOW.WINDOW_STATUS]: () => IpcResponse<boolean>;

  [IPC_RENDER_DIALOG_WINDOW.DIALOG_TYPE]: () => IpcResponse<typeof CONFIG.DIALOG[keyof typeof CONFIG.DIALOG]['NAME']>;
}
