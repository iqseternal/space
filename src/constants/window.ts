

export class IPC_WINDOW {
  public static readonly OPEN_WINDOW = 'ipc::renderer::window::open';

  public static readonly CLOSE_WINDOW = 'ipc::renderer:window::close';

  public readonly OPEN_WINDOW = IPC_WINDOW.OPEN_WINDOW;
  public readonly CLOSE_WINDOW = IPC_WINDOW.CLOSE_WINDOW;
}
