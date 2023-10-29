
import { apiGet, apiPost, apiAuthGet, apiAuthPost } from './api';

import { rsaEncrypt } from '@renderer/utils/crypt';

import { userApiUrl } from './url';

export const sendPhoneCodeReq = ({ phone = '' }) => {
  return apiGet(userApiUrl.sendPhoneCode, {
    params: { phone }
  })
}

export const sendMailCodeReq = ({ email = '' }) => {
  return apiGet(userApiUrl.sendMailCode, {
    params: { email }
  })
}

export const loginReq = ({ username = '', password = '' }) => {
  return apiPost(userApiUrl.login, {
    data: { username, password: rsaEncrypt(password) },
    timeout: 2000
  })
}

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
