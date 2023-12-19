import { app } from 'electron';
import { SingleInstanceService } from './SingleInstanceService';
import { WindowService } from './WindowService';
import { isUndefined } from '@suey/pkg-utils';
import { PrinterService } from './PrinterService';

class WindowListNode {
  public prevNode: WindowListNode | undefined = void 0;
  public nextNode: WindowListNode | undefined = void 0;
  public headNode: WindowListNode | undefined = void 0;

  constructor(
    public readonly currentWindow: WindowService
  ) { }

  isHead() { return isUndefined(this.headNode); }
  prev() { return this.prevNode; }
  next() { return this.headNode; }
}

/**
 * 窗口管理状态机
 *
 * 创建窗口层叠关系, 因为目前项目中使用了不同的 html 创建页面，所有页面层级关系需要自己处理
 *
 *
 */
export class WindowStateService extends SingleInstanceService<WindowStateService> {
  public readonly stateMap = new Map();
  public mainWindow: WindowService | undefined = void 0;

  public readonly nodeMap = new Map<string | number, WindowListNode>();

  private linkWindow(window: WindowService, prevWindow?: WindowService) {
    const curNode = new WindowListNode(window);

    if (prevWindow) {
      let cur = this.nodeMap.get(prevWindow.window.id);
      if (isUndefined(cur)) {
        PrinterService.printError(`状态机: 错误得链接方式, 尝试将一个window链接到未定义的节点中`);
        return;
      }

      curNode.headNode = cur.headNode;
      curNode.prevNode = cur;
      cur.nextNode = curNode;
      this.nodeMap.set(window.window.id, curNode);
      return;
    }

    curNode.headNode = void 0;
    this.nodeMap.set(window.window.id, curNode);
  }

  /**
   * 创建得主窗口
   * @param window
   */
  appendMainWindow(window: WindowService) {
    this.mainWindow = window;
    this.linkWindow(window);
    this.mainWindow.window.addListener('closed', () => {
      app.quit();
    });
  }
  appendWindow(window: WindowService, parentWindow?: WindowService) {
    this.linkWindow(window, parentWindow);
  }
  startMainWindow(...args: Parameters<WindowService['open']>) {
    if (this.mainWindow) this.mainWindow.open(...args);
  }

  static getInstance<T = WindowStateService>(): T {
    return super.getInstance<T>();
  }

  distory(): void {

  }
}
