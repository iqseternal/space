
const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');

const { PlaywrightCrawler, Dataset, PuppeteerCrawler } = require('crawlee');
const { JSDOMCrawler, log } = require('crawlee');
const { print, printInfo } = require('@suey/printer');
const { Crawler } = require('./crawler');

process.on('message', data => {
  console.log(data);


})

;(async () => {
  const crawler = new Crawler();

  print(11);

  crawler.obtainImg();
})();
