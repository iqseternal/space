
export class IpcResponseBase<T> implements IpcResponse<T> {
  constructor(
    public readonly ok: boolean,
    public readonly data: T,
    public readonly flag: string,
    public readonly descriptor: string = ''
  ) {}
}

export class IpcResponseOk<T> extends IpcResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(true, data, 'IpcResponseOk', descriptor);
  }
}

export class IpcResponseFail<T> extends IpcResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(false, data, 'IpcResponseFail', descriptor);
  }
}

/**
 * 创建一个 Ipc 回复正确信息，因在 resolve 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const ok = <T>(data: T, descriptor?: string): IpcResponse<T> => new IpcResponseOk(data, descriptor);

/**
 * 创建一个 Ipc 回复错误信息，因在 reject 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const fail = <T>(data: T, descriptor?: string): IpcResponse<T> => new IpcResponseFail(data, descriptor);

type IpcPromiseCall = <T>(data: T, descriptor?: string) => void;

/**
 * Ipc 的回复函数, 使用 r 函数将会返回一个 promise，允许你像 promise 一样调用，但 resolve 的数据会被规程化，变为 IpcResponse
 * @param callback
 * @returns
 */
export const ipcR = (callback: (ok: IpcPromiseCall, fail: IpcPromiseCall) => void): Promise<IpcResponse> => {
  return new Promise((resolve, reject)=> {

    const oks: IpcPromiseCall = <T>(data: T, descriptor?: string): void => resolve(ok(data, descriptor));

    const fails: IpcPromiseCall = <T>(data: T, descriptor?: string): void => reject(fail(data, descriptor));

    callback(oks, fails);
  });
}
