
const userConfig = require('../../user.config.json');
const appConfig = require('../../app.config.json');
const { print, printInfo, printError, printClear, printWarn } = require('@suey/printer');

const { obtainImgForTrends } = require('./trends');
const { obtainImgForStatic } = require('./static');

class Crawler {
  constructor() {

  }

  async obtainImg() {
    return Promise(async (resolve, reject) => {
      const trendsSource = [];
      const staticSource = [];

      userConfig.nodeServer.source.forEach(src => {
        if (!src.enable) return;

        if (src.static) staticSource.push(src);
        else trendsSource.push(src);
      });

      const resForTrends = await obtainImgForTrends(trendsSource);

      const resForStatic = await obtainImgForStatic(staticSource);

      resolve([
        ...resForTrends,
        ...resForStatic
      ])
    });
  }

  async restart() {

  }


}

module.exports.Crawler = Crawler;
