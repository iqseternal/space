import { isArray, isFunction, isString } from '@suey/pkg-utils';

/** 有关样式的类型声明 */
export namespace CSSTypes {
  /** 像素值 */
  export type PixelValue = `${number}px`;

  /** CSS Style 声明映射表 */
  export type CSSStyleProperttDeclaration = Omit<CSSStyleDeclaration, symbol>;

  /** 带有 变量的 CSS Style 声明映射表 */
  export type CSSStyleVarsDeclaration = CSSStyleProperttDeclaration & Record<`--${string}`, string | number>;
}

/** Css 值设置时得各种转换 */
export class CssValueConverts {
  /**
   * 将一个数字值转换为一个像素值
   * @param value
   */
  static toPixcel(value: number): CSSTypes.PixelValue;
  static toPixcel(value: string): CSSTypes.PixelValue;
  static toPixcel(value: number | string): CSSTypes.PixelValue {
    if (isString(value)) {
      value = parseInt(value);
      if (isNaN(value)) value = 0;
    }
    const pixcel = value + 'px' as CSSTypes.PixelValue;

    return pixcel;
  }
}

/** 在为 dom 设置样式属性值的时候会进行调用的转换函数, 可以将值转换为特定的格式并返回 */
export type CssValueSetterCovertFn<T extends string = string> = (value: T) => string;

/** 为 dom 设置样式属性值的选项 */
export type CssValueSetterOptions = {
  isImportant?: boolean;
  convert?: CssValueSetterCovertFn | CssValueSetterCovertFn[];
}

/**
 * 获取一个 dom 的 style 属性值
 * @param node
 * @param propertyName
 * @returns
 */
export const getStyleProperty = <Key extends keyof CSSTypes.CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key) => {
  return node.style.getPropertyValue(propertyName as string);
}

/**
 * 设置一个 dom 的 style 属性值
 * @param node
 * @param propertyName
 * @param value
 * @param isImportant
 * @returns
 */
export const setStyleProperty = <Key extends keyof CSSTypes.CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key, value: CSSTypes.CSSStyleProperttDeclaration[Key], options: CssValueSetterOptions = {}) => {
  let valueStr = value as string;

  if (Array.isArray(options.convert)) {
    options.convert.forEach(convertFn => {
      valueStr = convertFn(valueStr) as string;
    })
  }
  else if (isFunction(options.convert)) valueStr = options.convert(valueStr);

  return node.style.setProperty(propertyName as string, valueStr, options.isImportant ? 'important' : '');
}

/**
 * 设置多个 dom 的 style 属性值
 * @param node
 * @param properties
 * @returns
 */
export const setStyleProperties = (node: HTMLElement, properties: Partial<CSSTypes.CSSStyleProperttDeclaration>, options: Omit<CssValueSetterOptions, 'isImportant'>) => {
  return Object.keys(properties).forEach((propertyName) => setStyleProperty(node, propertyName as keyof CSSTypes.CSSStyleProperttDeclaration, properties[propertyName], {
    convert: options.convert
  }));
}

/**
 * 获得一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @returns
 */
export const getCssVar = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key) => {
  return getStyleProperty(node, cssVarName as keyof CSSTypes.CSSStyleProperttDeclaration);
}

/**
 * 设置一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @param value
 * @returns
 */
export const setCssVar = <Key extends keyof CSSTypes.CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, value: CSSTypes.CSSStyleVarsDeclaration[Key], options: CssValueSetterOptions = {}) => {
  return setStyleProperty(node, cssVarName as keyof CSSTypes.CSSStyleProperttDeclaration, value, options);
}

/**
 * 设置多个 dom 的 css 变量值
 * @param node
 * @param cssVars
 * @returns
 */
export const setCssVars = (node: HTMLElement, cssVars: Partial<CSSTypes.CSSStyleVarsDeclaration>, options: Omit<CssValueSetterOptions, 'isImportant'> = {}) => {
  return Object.keys(cssVars).forEach((cssVarName) => setCssVar(node, cssVarName as keyof CSSTypes.CSSStyleVarsDeclaration, cssVars[cssVarName], {
    convert: options.convert
  }));
}