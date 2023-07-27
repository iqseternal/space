
import { printError } from '@suey/printer';

import { PuppeteerService } from './PuppeteerService';

export class ObtainWebPageService extends PuppeteerService {
  async obtainImg() {
    return (await this.waitScrollForEvaluate(async () => {
      const imageUrls: { t: number, src: string }[] = [];

      document.querySelectorAll('img').forEach(img => {
        const imageUrl = img.src;
        img.remove();

        if (!imageUrl || imageUrl.includes('base64')) return;

        imageUrls.push({
          t: Date.now(),
          src: imageUrl
        });
      });

      return imageUrls;
    }) as { t: number, src: string }[]).map(src => ({
      t: src.t, src: src.src, source: this.url
    }));
  }

  obtainVedio() {

  }
}
