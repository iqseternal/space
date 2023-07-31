import { app } from 'electron';
import { join } from 'path';
import { FileService } from './FileService';
import { DownloadService } from './DownloadService';

export class AppDataService {
  public readonly sourcePath: string;

  constructor(
    public readonly relativeSourcePath: 'home' | 'appData' | 'userData' | 'sessionData' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps',
    public readonly absoluteSourcePath: string
  ) {
    this.sourcePath = join(app.getPath(relativeSourcePath), absoluteSourcePath);
  }

  saveFile(url: string): Promise<string>
  saveFile(source: Source): Promise<string>

  saveFile(fu: string | Source): Promise<string> {
    return new Promise(async (resolve, reject) => {
      if (typeof fu === 'string') {
        const distPath = join(this.sourcePath, (fu.substring(fu.lastIndexOf('\\') + 1)))

        FileService.copyFile(fu, distPath).then(() => {
          resolve(distPath);
        }).catch(err => {
          console.error(err.descriptor);
          reject();
        });
        return;
      }

      if (typeof fu === 'object') {

        console.log(this.sourcePath);

        console.log(fu);

        new DownloadService().download(fu.src).then(bin => {

        }).catch(reject);
        return;
      }
    });
  }
}
