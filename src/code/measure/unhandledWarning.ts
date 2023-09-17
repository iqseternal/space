import { PrinterService } from '../service/PrinterService';

// 捕捉没有 处理 Catch 的 Promise
process.on('unhandledRejection', (reason, promise) => {
  if (reason instanceof Error) {
    PrinterService.printError(reason.stack);
    return;
  }

  PrinterService.printWarn(`出现了未处理Promise REJECTED:: ${reason}`);
});

// 处理没有捕捉的异常
process.on('uncaughtException', (reason, exception) => {
  PrinterService.printError(reason.stack);
});
