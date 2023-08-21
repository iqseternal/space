const { Dataset } = require('crawlee');
const { JSDOMCrawler, log } = require('crawlee');

const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');
const { print, printInfo, printError, printClear, printWarn } = require('@suey/printer');

module.exports.obtainImgForStatic = async (urls = []) => {
  return new Promise(async (resolve, reject) => {
    if (!urls || !urls.length) {
      printWarn(`爬取的路径URL 为空`);
      resolve([]);
      return;
    }

    const images = [];

    // Create an instance of the JSDOMCrawler class - crawler that automatically
    // loads the URLs and parses their HTML using the jsdom library.
    const crawler = new JSDOMCrawler({
      // The crawler downloads and processes the web pages in parallel, with a concurrency
      // automatically managed based on the available system memory and CPU (see AutoscaledPool class).
      // Here we define some hard limits for the concurrency.
      minConcurrency: userConfig.nodeServer.static.minConcurrency,
      maxConcurrency: userConfig.nodeServer.static.maxConcurrency,
      // On error, retry each page at most once.
      maxRequestRetries: userConfig.nodeServer.static.maxRequestRetries,
      // Increase the timeout for processing of each page.
      requestHandlerTimeoutSecs: userConfig.nodeServer.static.requestHandlerTimeoutSecs,
      // Setting the `runScripts` option to `true` allows the crawler to execute client-side
      // JavaScript code on the page. This is required for some websites (such as the React application in this example), but may pose a security risk.
      runScripts: true,
      // This function will be called for each crawled URL.
      // Here we extract the window object from the options and use it to extract data from the page.
      requestHandler: async ({ window, request }) => {
        const { document } = window;

        printInfo(`当前处于： ${request.url}`);

        document.querySelectorAll('img').forEach(el => {
          images.push(el.src);
          el.remove();
        });
      },
    });

    // Run the crawler and wait for it to finish.
    await crawler.run(urls);
    resolve(images);
  });
}
