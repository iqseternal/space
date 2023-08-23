import { app } from 'electron';
import { FileService } from './FileService';
import { SingleInstanceService } from './SingleInstanceService';
import userConfigJson from 'user.config.json';
import { join } from 'path';
import { PrinterService } from './PrinterService';

/**
 * 维护 UserConfig 的内容信息
 */
export class UserConfigService extends SingleInstanceService<UserConfigService> {
  public config: typeof userConfigJson = require(join(__dirname, '../../user.config.json'));

  static getInstance<T = UserConfigService>() {
    return super.getInstance<T>();
  }

  distory(): void {
    FileService.saveObjToJson(this.config, join(__dirname, '../../user.config.json')).then(() => {
      PrinterService.printInfo('应用程序即将退出, 复写 UserConfigJson');
    }).catch(() => {
      PrinterService.printWarn('应用程序即将退出, 复写 UserConfigJson 失败!!');
    });
  }
}
