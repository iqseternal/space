



process.on('unhandledRejection', (reason, promise) => {

  console.warn(`未处理的Promise REJECTED:: ${reason}`);
});


process.on('uncaughtException', (reason, exception) => {


  console.warn(`出现了异常 ${reason}`);

});

