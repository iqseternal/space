import { app } from 'electron';
import { FileService } from './FileService';

/**
 * 维护 UserConfig 的内容信息
 */
export class UserConfigService {
  private static instance: UserConfigService | undefined = void 0;
  private userConfig: Record<string, any>;

  constructor() {
    this.userConfig = require('../../../user.config.json');

    app.on('will-quit', () => {
      this.save();
    });
  }

  /**
   * 采用单实例做法, 这样可以保持应用程序数据的统一, 保持数据的一致性
   * @returns
   */
  static getInstance() {
    if (!UserConfigService.instance) UserConfigService.instance = new UserConfigService();
    return UserConfigService.instance;
  }


  private save() {


  }
}
