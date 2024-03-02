/** CSS Style 声明映射表 */
export type CSSStyleProperttDeclaration = Omit<CSSStyleDeclaration, symbol>;

/** 带有 变量的 CSS Style 声明映射表 */
export type CSSStyleVarsDeclaration = CSSStyleProperttDeclaration & Record<`--${string}`, string | number>;

/**
 * 为 style 的属性函数转换 important 字符
 * @param isImportant
 * @returns
 */
export const toImportant = (isImportant: boolean = false) => isImportant ? 'important' : '';

/**
 * 获取一个 dom 的 style 属性值
 * @param node
 * @param propertyName
 * @returns
 */
export const getStyleProperty = <Key extends keyof CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key) => {
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
export const setStyleProperty = <Key extends keyof CSSStyleProperttDeclaration>(node: HTMLElement, propertyName: Key, value: CSSStyleProperttDeclaration[Key], isImportant?: boolean) => {
  return node.style.setProperty(propertyName as string, value as string, toImportant(isImportant));
}

/**
 * 设置多个 dom 的 style 属性值
 * @param node
 * @param properties
 * @returns
 */
export const setStyleProperties = (node: HTMLElement, properties: Partial<CSSStyleProperttDeclaration>) => {
  return Object.keys(properties).forEach((propertyName) => setStyleProperty(node, propertyName as keyof CSSStyleProperttDeclaration, properties[propertyName]));
}

/**
 * 获得一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @returns
 */
export const getCssVar = <Key extends keyof CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key) => {
  return getStyleProperty(node, cssVarName as keyof CSSStyleProperttDeclaration);
}

/**
 * 设置一个 dom 的 css 变量值
 * @param node
 * @param cssVarName
 * @param value
 * @returns
 */
export const setCssVar = <Key extends keyof CSSStyleVarsDeclaration>(node: HTMLElement, cssVarName: Key, value: CSSStyleVarsDeclaration[Key]) => {
  return setStyleProperty(node, cssVarName as keyof CSSStyleProperttDeclaration, value);
}

/**
 * 设置多个 dom 的 css 变量值
 * @param node
 * @param cssVars
 * @returns
 */
export const setCssVars = (node: HTMLElement, cssVars: Partial<CSSStyleVarsDeclaration>) => {
  return Object.keys(cssVars).forEach((cssVarName) => setCssVar(node, cssVarName as keyof CSSStyleVarsDeclaration, cssVars[cssVarName]));
}
