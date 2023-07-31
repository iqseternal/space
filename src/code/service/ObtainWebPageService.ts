import { PuppeteerService } from './PuppeteerService';

type SourceFix = Omit<Omit<Source, 'source'>, 'isOnline'>;


/**
 * 浏览Web页面服务
 */
export class ObtainWebPageService extends PuppeteerService {
  /** 从页面中获得图片 */
  async obtainImg(): Promise<Source[]> {
    return new Promise(async (resolve) => {
      const imageUrls = await this.waitScrollForEvaluate(async () => {

        const imageUrls: SourceFix[] = [];
        document.querySelectorAll('img').forEach(img => {
          const imageUrl = img.src;
          img.remove();

          if (!imageUrl || imageUrl.includes('base64')) return;
          if (imageUrl.endsWith('svg')) return;

          imageUrls.push({ t: Date.now(), src: imageUrl });
        });
        return imageUrls;
      }) as Source[];

      if (Array.isArray(imageUrls)) {
        resolve(imageUrls.map(s => ({ t: s.t, src: s.src, source: (this.url as string), isOnline: true })));
        return;
      }

      resolve([]);
    });
  }

  /** 从页面中获得视频 */
  async obtainVedio() {

  }
}
