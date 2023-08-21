
import { app } from 'electron';
import { spawn , type ChildProcess} from 'child_process';
import { join } from 'path';

import { PrinterService } from '../service/PrinterService';

export class ReptileService {
  private process: ChildProcess = spawn(
    'node', [join(__dirname, '../../scripts/reptile/index.js')], { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] }
  );

  constructor() {
    app.on('will-quit', () => this.distory());

    this.process.stdout?.on('data', message => {
      console.log(message.toString());
    });
    this.process.stdin?.on('data', message => {
      console.log(message.toString());
    });
    this.process.stderr?.on('data', message => {
      console.log(message.toString());
    });

  }

  async obtainImg() {
    this.send();

    this.process.on('message', data => {
      PrinterService.printInfo(data.toString());
    })

  }

  private send() {
    this.process.send({
      ok: true
    })
  }

  distory() {
    if (this.process) this.process.kill('SIGTERM')
  }
}
