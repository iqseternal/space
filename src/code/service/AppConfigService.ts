import { app } from 'electron';
import { FileService } from './FileService';
import { PrinterService } from './PrinterService';
import appConfigJson from '../../../test.config.json';
import { SingleInstanceService } from './SingleInstanceService';

export class AppConfigService extends SingleInstanceService {
  private static isNew: boolean = true;
  private static instance: AppConfigService | undefined = void 0;
  public config: typeof appConfigJson;

  constructor() {
    super();
    if (AppConfigService.isNew) {
      throw new Error(`请不要使用 New 操作符手动实例化 AppConfigService, 请使用 AppConfigService.getInstance().`);
    }

    this.config = appConfigJson;
    app.on('will-quit', () => this.save());
  }

  static getInstance() {
    if (!AppConfigService.instance) {
      AppConfigService.isNew = false;
      AppConfigService.instance = new AppConfigService();
      AppConfigService.isNew = true;
    }
    return AppConfigService.instance;
  }

  private save() {
    FileService.saveFile(JSON.stringify(this.config), '../../../test.config.json');
  }
}
