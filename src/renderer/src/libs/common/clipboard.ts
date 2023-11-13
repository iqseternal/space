



/**
 * 复制选中的文字
 * @returns
 */
export const copySelectionText = () => {
  const context = window.getSelection()?.toString();
  if (context) window.navigator.clipboard.writeText(context);
}


/**
 * 复制某段指定文字
 * @param text
 */
export const copySpecifiedText = (text: string) => {
  if (text) window.navigator.clipboard.writeText(text);
}
