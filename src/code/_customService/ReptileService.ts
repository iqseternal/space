
import { app } from 'electron';
import { spawn , type ChildProcess} from 'child_process';
import { join } from 'path';

import { PrinterService } from '../service/PrinterService';

import appConfigJson from '../../../app.config.json';

export class ReptileService {
  private process: ChildProcess | null | undefined;

  constructor() {
    this.init();

    app.on('will-quit', () => {
      if (this) this.distory();
    });

    if (appConfigJson.miscellaneous.script.reptile.log) {
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
    return new Promise((resolve, reject) => {
      if (!this.process) return reject();

      this.process.send({
        ok: true
      })

      this.process.on('message', data => {
        resolve(data.toString().split(',').filter(e => e).map(src => ({
          src: src
        })));
      })
    });
  }

  init() {
    this.process = spawn(
      'node', [join(__dirname, '../../scripts/reptile/index.js')], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] }
    );
  }

  distory() {
    if (this.process) {
      this.process.kill('SIGTERM');
      this.process = null;
    }
  }
}
