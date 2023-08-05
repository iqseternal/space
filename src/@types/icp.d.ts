
interface IcpResponse<T = any> {
  ok: boolean;

  data: T;

  flag: string;

  descriptor: string;
}
