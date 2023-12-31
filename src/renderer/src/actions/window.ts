import { IPC_MAIN_WINDOW, IPC_DEV } from '#/constants';
import type { MainEventHandlers } from '#/constants/ipc';

/**
 * 刷新页面
 * @returns
 */
export const windowReload = () => window.location.reload();

/**
 * 是否展示页面
 * @param show
 * @param id
 * @returns
 */
export const windowShow = (show: boolean, id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, show, id);

/**
 * 窗口是否可以调整大小
 * @param able
 * @returns
 */
export const windowResizeAble = (able: boolean) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, able);

/**
 * 设置窗口的大小
 * @param width
 * @param height
 * @returns
 */
export const windowSetSize = (width: number, height: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, width, height);

/**
 * 设置窗口的位置
 * @param args
 * @returns
 */
export const windowSetPosition = (...args: Parameters<MainEventHandlers[typeof IPC_MAIN_WINDOW.WINDOW_SET_POSITION]>) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_POSITION, ...args)

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);

/**
 * 恢复窗口为定制化大小
 * @param type
 * @returns
 */
export const windowResetCustomSize = (type: Parameters<MainEventHandlers[typeof IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE]>[0]) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, type);

/**
 * 最大化窗口
 * @param id
 * @returns
 */
export const windowMax = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE, id);

/**
 * 最小化窗口
 * @param id
 * @returns
 */
export const windowMin = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE, id);

/**
 * 还原窗口
 * @param id
 * @returns
 */
export const windowReduction = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_REDUCTION, id);

/**
 * 关闭窗口
 * @param id
 * @returns
 */
export const windowClose = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_CLOSE, id);

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = (...args: Parameters<MainEventHandlers[typeof IPC_DEV.DEV_OPEN_TOOL]>) => window.electron.ipcRenderer.invoke(IPC_DEV.DEV_OPEN_TOOL, ...args);
