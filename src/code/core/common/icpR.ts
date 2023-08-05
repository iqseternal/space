
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

export const ok = <T>(data: T, descriptor?: string): IcpResponse<T> => new IcpResponseOk(data, descriptor);

export const fail = <T>(data: T, descriptor?: string): IcpResponse<T> => new IcpResponseFail(data, descriptor);

type IcpPromiseCall = <T>(data: T, descriptor?: string) => void;

export const r = (callback: (ok: IcpPromiseCall, fail: IcpPromiseCall) => void): Promise<IcpResponse> => {
  return new Promise((resolve, reject)=> {

    const oks: IcpPromiseCall = <T>(data: T, descriptor?: string): void => resolve(ok(data, descriptor));

    const fails: IcpPromiseCall = <T>(data: T, descriptor?: string): void => reject(fail(data, descriptor));

    callback(oks, fails);
  });
}
