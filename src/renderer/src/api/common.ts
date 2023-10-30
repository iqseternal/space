
import { apiGet, apiPost, apiAuthGet, apiAuthPost } from './api';

import { rsaEncrypt } from '@renderer/utils/crypt';

import { userApiUrl } from './url';

/**
 * 发送手机验证码
 */
export const sendPhoneCodeReq = ({ phone = '' }) => {
  return apiGet(userApiUrl.sendPhoneCode, {
    params: { phone }
  })
}

/**
 * 发送邮箱验证码
 */
export const sendMailCodeReq = ({ email = '' }) => {
  return apiGet(userApiUrl.sendMailCode, {
    params: { email }
  })
}

/**
 * 发送登录请求
 */
export const loginReq = ({ username = '', password = '' }) => {
  return apiPost(userApiUrl.login, {
    data: { username, password: rsaEncrypt(password) },
    timeout: 2000
  })
}

/**
 * 发送注册请求
 */
export const registerReq = ({ username = '', password = '', code = '' }) => {
  return apiPost(userApiUrl.register, {
    data: {
      username,
      password: rsaEncrypt(password),
      verificationCode: code
    },
    timeout: 2000
  })
}