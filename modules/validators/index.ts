import { isString, isDecimal, isDef } from '@suey/pkg-utils';

export const validatorNotSpace = (str: string) => isString(str) && str.trim() !== '';

