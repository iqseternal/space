
import { printError } from '@suey/printer';

import { PuppeteerService } from './PuppeteerService';

type SourceFix = Omit<Omit<Source, 'source'>, 'isOnline'>;

export class ObtainWebPageService extends PuppeteerService {
  async obtainImg(): Promise<Source[]> {
    return Promise.resolve((await this.waitScrollForEvaluate(async () => {
      const imageUrls: SourceFix[] = [];
      document.querySelectorAll('img').forEach(img => {
        const imageUrl = img.src;
        img.remove();

        if (!imageUrl || imageUrl.includes('base64')) return;
        imageUrls.push({ t: Date.now(), src: imageUrl });
      });
      return imageUrls;
    }) as SourceFix[]).map(s => ({ t: s.t, src: s.src, source: (this.url as string), isOnline: true })));
  }

  async obtainVedio() {
    printError(`不支持获得视频`);
  }
}
