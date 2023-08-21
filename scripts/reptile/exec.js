const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');

const { PlaywrightCrawler, Dataset, PuppeteerCrawler } = require('crawlee');
const { JSDOMCrawler, log } = require('crawlee');
const { print, printInfo } = require('@suey/printer');
const { Crawler } = require('./crawler');

const crawler = new Crawler();


;(async () => {

  const res = await crawler.obtainImg();


  console.log(res);
})();
