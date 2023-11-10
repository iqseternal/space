


/**
 * 复制文字
 * @param text
 * @returns
 */
export const copyText = (text?: string) => {
  const context = text ?? window.getSelection()?.toString();
  if (context) window.navigator.clipboard.writeText(context);
}
