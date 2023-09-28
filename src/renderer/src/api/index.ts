import { request, apiGet, apiPost, createApi, REQ_METHODS } from '@renderer/utils/request';

export { request, apiGet, apiPost };

export const apiPut = createApi(REQ_METHODS.PUT);

export const apiDel = createApi(REQ_METHODS.DELETE);

export const apiUrl = {

  login: '/user/login',
  register: '/user/register',
  getUserinfo: '/user/getUserinfo',


}
