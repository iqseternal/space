
import { app } from 'electron';
import { spawn , type ChildProcess} from 'child_process';
import { join } from 'path';

import { PrinterService } from '../service/PrinterService';

import { AppConfigService } from '../service/AppConfigService';

const appConfigService = AppConfigService.getInstance();

/**
 * 爬虫程序子进程通信
 */
export class ReptileService {
  private process: ChildProcess | null | undefined;

  constructor() {
    this.init();

    app.on('will-quit', () => {
      if (this) this.distory();
    });

    if (appConfigService.config.miscellaneous.script.reptile.log) {
      this.process?.stdout?.on('data', message => {
        console.log(message.toString());
      });
      this.process?.stdin?.on('data', message => {
        console.log(message.toString());
      });
      this.process?.stderr?.on('data', message => {
        console.log(message.toString());
      });
    }
  }

  async obtainImg() {
    PrinterService.printInfo('爬取任务开始...');

    return new Promise((resolve, reject) => {
      if (!this.process) {
        PrinterService.printError('爬取进程已经被销毁');
        return reject();
      }

      this.process.send({
        ok: true
      })

      this.process.on('message', data => {
        const source = data.toString().split(',').filter(e => e).map(src => ({
          src: src
        }));

        PrinterService.printInfo(`爬取结束, ${source.length} 条.`)

        resolve(source);
      })
    });
  }

  init() {
    PrinterService.printInfo('爬取进程初始化');
    this.process = spawn(
      'node', [join(__dirname, '../../scripts/reptile/index.js')], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] }
    );
  }

  distory() {
    if (this.process) {
      PrinterService.printInfo('爬取进程销毁...');

      this.process.kill('SIGTERM');
      this.process = null;
    }
  }
}
