
const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');

const { PlaywrightCrawler, Dataset, PuppeteerCrawler } = require('crawlee');
const { JSDOMCrawler, log } = require('crawlee');
const { print, printInfo } = require('@suey/printer');
const { Crawler } = require('./crawler');

const crawler = new Crawler();

process.on('message', async data => {
  console.log(data);

  if (data.ok) {
    const res = await crawler.obtainImg();
    process.send(res);
  }
})