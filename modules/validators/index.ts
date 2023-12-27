import { isString, isDecimal, isDef } from '@suey/pkg-utils';

/**
 * 校验目标字符串是一个非空串
 * @param str
 * @returns
 */
export const validatorIsSpaceStr = (str: string) => isString(str) && str.trim() === '';

/**
 * 校验字符串是否有效，即非空字符串
 * @param str
 * @returns
 */
export const validatorValidStr = (str: string) => !validatorIsSpaceStr(str);

/**
 * 校验用户真实姓名是否符合规范，是否在Unicode码中并且支持译名
 * @param str
 * @returns
 */
export const validatorRealName = (str: string) => isString(str) && /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/.test(str);

/**
 * 返回一个验证函数，验证改值是否在指定数字范围中
 * @param min
 * @param max
 * @returns
 */
export const validatorNumberRange = (min: number, max: number) => (value: string | number) => {
  const vn = +value;
  if (vn < min || vn > max) return false;
  return true;
}

