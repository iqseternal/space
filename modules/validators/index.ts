import { isString, isDecimal, isDef } from '@suey/pkg-utils';

/** 
 * 校验目标字符串是一个空串
 * @param str
 * @returns
 */
export const validatorIsSpace = (str: string) => isString(str) && str.trim() === '';

