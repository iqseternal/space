import { createApiRequest } from '@suey/packages';
import { getToken } from './storage';

const isOkStatus = (status: number): boolean => {
  if (status >= 200 && status < 300) return true;
  if (status === 400) console.log('失败的请求');
  if (status === 403) console.log('服务器拒绝了此请求');
  if (status === 404) console.log('目标地址未找到');
  if (status >= 500) console.log('服务器内部错误');
  return false;
}

export const { apiGet, apiPost, request } = createApiRequest<{
  needAuth?: boolean;
}, {
  status: number;
  flag: string;
  data: any;
}>('https://www.oupro.cn:3000/api/v1.0.0/', {}, {
  onFulfilled: config => {
    if (config.hConfig?.needAuth) {
      if (!config.headers) config.headers = {};
      if (getToken()) config.headers['authorization'] = 'Bearer ' + getToken(true);
    }
  },
  onRejected: config => Promise.reject(config)
}, {
  onFulfilled: response => {
    if (response.data.status && response.data.flag) {
      const status = response.data.status;
      if (!isOkStatus(+status)) return Promise.reject(response.data);
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response);
  },
  onRejected: err => {
    if (err.data && err.data.status && err.data.flag) err.data = err.data.data as any;
    return Promise.reject(err);
  }
});
