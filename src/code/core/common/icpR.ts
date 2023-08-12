
export class IcpResponseBase<T> implements IcpResponse<T> {
  constructor(
    public readonly ok: boolean,
    public readonly data: T,
    public readonly flag: string,
    public readonly descriptor: string = ''
  ) {}
}

export class IcpResponseOk<T> extends IcpResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(true, data, 'IcpResponseOk', descriptor);
  }
}

export class IcpResponseFail<T> extends IcpResponseBase<T> {
  constructor(
    public readonly data: T,
    public readonly descriptor: string = ''
  ) {
    super(false, data, 'IcpResponseFail', descriptor);
  }
}

/**
 * 创建一个 icp 回复正确信息，因在 resolve 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const ok = <T>(data: T, descriptor?: string): IcpResponse<T> => new IcpResponseOk(data, descriptor);

/**
 * 创建一个 icp 回复错误信息，因在 reject 中返回
 * @param data
 * @param descriptor
 * @returns
 */
export const fail = <T>(data: T, descriptor?: string): IcpResponse<T> => new IcpResponseFail(data, descriptor);

type IcpPromiseCall = <T>(data: T, descriptor?: string) => void;

/**
 * icp 的回复函数, 使用 r 函数将会返回一个 promise，允许你像 promise 一样调用，但 resolve 的数据会被规程化，变为 IcpResponse
 * @param callback
 * @returns
 */
export const icpR = (callback: (ok: IcpPromiseCall, fail: IcpPromiseCall) => void): Promise<IcpResponse> => {
  return new Promise((resolve, reject)=> {

    const oks: IcpPromiseCall = <T>(data: T, descriptor?: string): void => resolve(ok(data, descriptor));

    const fails: IcpPromiseCall = <T>(data: T, descriptor?: string): void => reject(fail(data, descriptor));

    callback(oks, fails);
  });
}
