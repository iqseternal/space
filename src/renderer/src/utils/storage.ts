
import { loGet, loSet, loClear, loRemove } from '@suey/packages';

const TOKEN_KEY = '__token__';

export const getToken = (decrypt = false) => loGet<string>(TOKEN_KEY, {
  decrypt
});

export const setToken = (value: string) => loSet(TOKEN_KEY, value);

export const removeToken = () => loRemove(TOKEN_KEY);
