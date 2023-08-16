// ;(async () => {

//   const images = [];

//   // Create an instance of the JSDOMCrawler class - crawler that automatically
//   // loads the URLs and parses their HTML using the jsdom library.
//   const crawler = new JSDOMCrawler({
//     // The crawler downloads and processes the web pages in parallel, with a concurrency
//     // automatically managed based on the available system memory and CPU (see AutoscaledPool class).
//     // Here we define some hard limits for the concurrency.
//     minConcurrency: 10,
//     maxConcurrency: 50,
//     // On error, retry each page at most once.
//     maxRequestRetries: 1,
//     // Increase the timeout for processing of each page.
//     requestHandlerTimeoutSecs: 30,
//     // Setting the `runScripts` option to `true` allows the crawler to execute client-side
//     // JavaScript code on the page. This is required for some websites (such as the React application in this example), but may pose a security risk.
//     runScripts: true,
//     // This function will be called for each crawled URL.
//     // Here we extract the window object from the options and use it to extract data from the page.
//     requestHandler: async ({ window, request }) => {
//       const { document } = window;

//       document.querySelectorAll('img').forEach(el => {
//         images.push(el.src);
//       });
//     },
//   });

//   // Run the crawler and wait for it to finish.
//   await crawler.run([
//     'https://cn.bing.com/images/search?q=%e5%9b%be%e7%89%87&qft=+filterui:imagesize-wallpaper+filterui:aspect-wide+filterui:photo-photo&form=IRFLTR&first=1',
//   ]);


//   console.log(images.filter(src => !src.includes('base') || !src));

//   log.debug('Crawler finished.');
// })();
