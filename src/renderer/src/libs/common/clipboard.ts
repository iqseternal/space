



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

/**
 * 是否可以复制文本
 * @returns
 */
export const canCopyText = () => {
  const selection = window.getSelection();
  if (!selection) return false;
  return selection.toString() !== '';
}
