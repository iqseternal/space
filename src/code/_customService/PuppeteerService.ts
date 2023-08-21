import { app, BrowserWindow } from 'electron';
import { launch } from 'puppeteer';

/**
 * 模拟网页
 */
export class PuppeteerService {
  private page?: any;
  public url?: string;

  /**
   * 初始化窗口, 以及打开需要浏览的页面
   * @param url
   */
  async obtainSourceInit(url: string) {
    const browser = await launch({
      args: [
        `--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3477.0 Safari/537.36`
        // `--proxy-server=127.0.0.1:7890`
      ],
      headless: 'new'
    });
    this.page = await browser.newPage();

    this.url = url;
    await this.page?.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * 更改浏览的页面
   * @param url
   * @returns
   */
  async changeUrl(url: string) {
    if (typeof url !== 'string') return;
    if (!url.includes('http')) return;

    if (this.url === url) return;

    this.url = url;
    await this.page?.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * 等待滚动之后完成某些操作
   * @param fn
   * @returns
   */
  async waitScrollForEvaluate(fn: () => any) {
    await this.autoScroll();
    return await this.page?.evaluate(fn) ?? [];
  }

  /**
   * 实现模拟窗口空间下的自动滚动
   * @returns
   */
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
