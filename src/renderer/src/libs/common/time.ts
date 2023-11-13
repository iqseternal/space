

/**
 * 获取当前的日期
 * @returns
 */
export const getCurDate = () => {
  const date = new Date();
  return `${date.getFullYear()}.${date.getMonth()}.${date.getDay()}`;
}

/**
 * 获取当前的时间
 * @returns
 */
export const getCurTime = () => {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

/**
 * 获取当前的日期时间
 * @returns
 */
export const getCurFullDate = () => `${getCurDate()} ${getCurTime()}`;
