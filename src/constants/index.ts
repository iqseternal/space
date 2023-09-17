
export class IPC_WALLPAPER {
  public static readonly GET_WALLPAPER = 'ipc::render::wallpaper::get';
  public static readonly SET_WALLPAPER = 'ipc::render::wallpaper::set';
  public static readonly MORE_WALLPAPER = 'ipc::render::wallpaper::more';
  public static readonly DOWNLOAD_WALLPAPER = 'ipc::render::wallpaper::download';
}


export class IPC_WINDOW {
  public static readonly WINDOW_MAX_SIZE = 'WINDOW_MAX_SIZE'; // 最大化窗口
  public static readonly WINDOW_MIN_SIZE = 'WINDOW_MIN_SIZE'; // 最小化窗口
  public static readonly WINDOW_REDUCTION = 'WINDOW_REDUCTION'; // 还原窗口
  public static readonly WINDOW_DOUBLE_CLICK = 'WINDOW_DOUBLE_CLICK'; // 双击了标题栏
  public static readonly WINDOW_CLOSE = 'WINDOW_CLOSE';

  public static readonly OPEN_WINDOW = 'ipc::renderer::window::open';
  public static readonly CLOSE_WINDOW = 'ipc::renderer:window::close';
}


export type MainEventHandlers = {
  [IPC_WINDOW.WINDOW_MAX_SIZE]: () => IpcResponse<void>;
  [IPC_WINDOW.WINDOW_MIN_SIZE]: () => IpcResponse<void>;
  [IPC_WINDOW.WINDOW_REDUCTION]: () => IpcResponse<void>;
  [IPC_WINDOW.WINDOW_DOUBLE_CLICK]: () => IpcResponse<void>;
  [IPC_WINDOW.WINDOW_CLOSE]: () => IpcResponse<void>;

  [IPC_WALLPAPER.GET_WALLPAPER]: () => IpcResponse<string>;
  [IPC_WALLPAPER.SET_WALLPAPER]: (source: Source) => IpcResponse<string>;
  [IPC_WALLPAPER.MORE_WALLPAPER]: () => IpcResponse<Source[]>;
  [IPC_WALLPAPER.DOWNLOAD_WALLPAPER]: (source: Source) => IpcResponse<string>;

  [IPC_WINDOW.OPEN_WINDOW]: (string: string) => IpcResponse<void>;
  [IPC_WINDOW.CLOSE_WINDOW]: (id: number) => IpcResponse<void>;
}
