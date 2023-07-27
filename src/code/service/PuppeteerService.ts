
import { type Page, launch } from 'puppeteer';

export class PuppeteerService {
  private page?: Page;
  public url?: string;

  async obtainSourceInit(url: string) {
    const browser = await launch({ headless: true });
    this.page = await browser.newPage();
    this.url = url;
    await this.page?.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async changeUrl(url: string) {
    if (typeof url !== 'string') return;
    if (!url.includes('http')) return;

    if (this.url === url) return;

    this.url = url;
    await this.page?.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async waitScrollForEvaluate(fn: () => any) {
    await this.autoScroll();
    return await this.page?.evaluate(fn);
  }

  private async autoScroll() {
    return new Promise<void>(async (resolve, reject) => {
      await this.page?.evaluate(() => {
        return new Promise<void>((resolve) => {
          let totalHeight = 0;
          const distance = 100; // 每次滚动的距离
          let maxScrollTries = 20; // 最大滚动次数

          const timer = setInterval(() => {
            const scrollHeight = document.body.scrollHeight;
            window.scrollBy(0, distance);
            totalHeight += distance;

            if (totalHeight >= scrollHeight || maxScrollTries === 0) {
              clearInterval(timer);
              resolve();
            }

            maxScrollTries --;
          }, 100); // 每次滚动的间隔时间
        });
      }).then(() => {
        resolve();
      })
    })
  }
}
