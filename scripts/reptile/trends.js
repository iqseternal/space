const { PlaywrightCrawler, Dataset, PuppeteerCrawler } = require('crawlee');
const { JSDOMCrawler, log } = require('crawlee');

const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');
const { print, printInfo, printError, printClear, printWarn } = require('@suey/printer');


module.exports.obtainImgForTrends = async (urls = []) => {

  const crawler = new PlaywrightCrawler({
      async requestHandler({ page, request }) {
          // This function is called to extract data from a single web page
          // 'page' is an instance of Playwright.Page with page.goto(request.url) already called
          // 'request' is an instance of Request class with information about the page to load

          await (page).evaluate(() => {
            return new Promise((resolve) => {
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
          })

          const res = await page.evaluate(() => {
            const images = [];

            document.querySelectorAll('img').forEach(img => {
              img.remove();
              images.push(img.src)
            })

            return images
          })
          await Dataset.pushData({
              title: await page.title(),
              url: request.url,
              succeeded: true,
              list: res
          })
      },
      async failedRequestHandler({ request }) {
          // This function is called when the crawling of a request failed too many times
          await Dataset.pushData({
              url: request.url,
              succeeded: false,
              errors: request.errorMessages,
          })
      },
  });

  await crawler.run([
    'https://cn.bing.com/images/search?q=%e5%9b%be%e7%89%87&qft=+filterui:imagesize-wallpaper+filterui:aspect-wide+filterui:photo-photo&form=IRFLTR&first=1'
  ]);



};
