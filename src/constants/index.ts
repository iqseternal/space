
export class IPC_WALLPAPER {
  public static readonly GET_WALLPAPER = 'ipc::render::wallpaper::get';
  public static readonly SET_WALLPAPER = 'ipc::render::wallpaper::set';
  public static readonly MORE_WALLPAPER = 'ipc::render::wallpaper::more';
  public static readonly DOWNLOAD_WALLPAPER = 'ipc::render::wallpaper::download';
}


export class IPC_WINDOW {
  public static readonly OPEN_WINDOW = 'ipc::renderer::window::open';
  public static readonly CLOSE_WINDOW = 'ipc::renderer:window::close';
}

export type MainEventHandlers = {
  [IPC_WALLPAPER.GET_WALLPAPER]: () => IpcResponse<string>;
  [IPC_WALLPAPER.SET_WALLPAPER]: (source: Source) => IpcResponse<string>;
  [IPC_WALLPAPER.MORE_WALLPAPER]: () => IpcResponse<Source[]>;
  [IPC_WALLPAPER.DOWNLOAD_WALLPAPER]: (source: Source) => IpcResponse<string>;

  [IPC_WINDOW.OPEN_WINDOW]: (string: string) => IpcResponse<void>;
  [IPC_WINDOW.CLOSE_WINDOW]: (id: number) => IpcResponse<void>;
}
