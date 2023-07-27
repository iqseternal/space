import { app } from 'electron';
import { exec } from 'child_process';
import { join } from 'path';
import { FileService } from './FileService';
import { printError } from '@suey/printer';
import * as fs from 'fs';

export class AppDataService {
  public readonly sourcePath: string;

  constructor(
    public readonly relativeSourcePath: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps',
    public readonly absoluteSourcePath: string
  ) {
    this.sourcePath = join(app.getPath(relativeSourcePath), absoluteSourcePath);
  }

  saveFile(url: string): Promise<string>
  saveFile(file: File): Promise<string>
  saveFile(fu: string | File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const distPath = typeof fu === 'string'
        ? join(this.sourcePath, (fu.substring(fu.lastIndexOf('\\') + 1)))
        : fu.path;

      if (typeof fu === 'string') {
        FileService.copyFile(fu, distPath).then(() => {
          resolve(distPath);
        }).catch(err => {

          printError(err.descriptor);
          reject();
        });
        return;
      }

      reject();
    });
  }
}
