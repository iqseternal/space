import { app } from 'electron';

export class AppConfigService {
  private static instance: AppConfigService | undefined = void 0;


  constructor() {


    app.on('will-quit', () => {
      this.save();
    })
  }

  static getInstance() {
    if (!AppConfigService.instance) AppConfigService.instance = new AppConfigService();
    return AppConfigService.instance;
  }


  private save() {

  }
}
