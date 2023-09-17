import { app } from 'electron';
import { FileService } from './FileService';
import { PrinterService } from './PrinterService';
import { SingleInstanceService } from './SingleInstanceService';
import appConfigJson from 'app.config.json'; // 引入只为获取类型, 请勿使用, 请使用require动态引入
import { join } from 'path';

/**
 * AppConfigJson的维护类
 */
export class AppConfigService extends SingleInstanceService<AppConfigService> {
  public readonly config: typeof appConfigJson = require(join(__dirname, '../../app.config.json'));

  static getInstance<T = AppConfigService>() {
    return super.getInstance<T>();
  }

  distory(): void {
    if (this.config.miscellaneous.appJson.overwrite) {
      PrinterService.printWarn(`当前开启了 AppConfigJson 的覆写, 但是不建议开启, 它应该是开发者配置选项`);

      FileService.saveObjToJson(this.config, join(__dirname, '../../app.config.json')).then(() => {
        PrinterService.printInfo('应用程序即将退出, 覆写 AppConfigJson');
      }).catch(() => {
        PrinterService.printWarn('应用程序即将退出, 覆写 AppConfigJson 失败！！');
      });
    }
  }
}
