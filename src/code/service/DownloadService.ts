import { net, type IncomingMessage } from 'electron';

export class DownloadService {
  download(url: string) {
    return new Promise((resolve, reject) => {
      if (!net.isOnline()) {
        reject();
        return;
      }

      let data = '';

      const req = net.request({
        url,
        method: 'GET',
      });

      req.on('response', (r: IncomingMessage) => {
        data += r;
      });

      req.on('finish', () => {
        resolve(data);
      });

      req.on('error', () => {
        reject();
      })
    });
  }
}

