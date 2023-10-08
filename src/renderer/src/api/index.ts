import { request, apiGet, apiPost, createApi, REQ_METHODS, type RequestConfig, HConfig } from '@renderer/utils/request';

export { request, apiGet, apiPost };

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDel = createApi(REQ_METHODS.DELETE);

export type ApiAuthFn = <T extends {}>(url: string, data?: T, hConfig?: RequestConfig<HConfig>['hConfig'], config?: Omit<RequestConfig<HConfig>, 'hConfig'>) => ReturnType<typeof request>;

export const apiAuthGet: ApiAuthFn = (url, params?, hConfig?, config?) => apiGet(url, {
  ...config,
  ...hConfig,
  hConfig: {
    needAuth: true
  },
  params
});

export const apiAuthPost: ApiAuthFn = (url, data, hConfig?, config?) => apiPost(url, {
  ...config,
  ...hConfig,
  hConfig: {
    needAuth: true
  },
  data: data
});


export const apiUrl = {
  login: '/user/login',
  register: '/user/register',
  getUserinfo: '/user/getUserinfo',
}


