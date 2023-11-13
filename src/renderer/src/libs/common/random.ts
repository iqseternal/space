

/**
 *
 * @param min
 * @param max
 * @returns
 */
export const randomRegion = (min: number, max: number) => (Math.random() * (max - min) + min);

/**
 *
 * @param min 请传入一个整数
 * @param max 请传入一个整数
 * @returns
 */
export const randomRegionForInt = (min: number, max: number) => Math.round(randomRegion(min - 0.5, max + 0.5));


