
import { copySelectionText, copySpecifiedText } from '@libs/common';

/**
 * 复制文字, 指定参数则复制指定文本, 否则复制当前选中的文本
 * @param text
 * @returns
 */
export const copyText = (text?: string) => {
  if (text) copySpecifiedText(text);
  else copySelectionText();
}
