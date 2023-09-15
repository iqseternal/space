import { PrinterService } from '../service/PrinterService';

process.on('unhandledRejection', (reason, promise) => {
  if (reason instanceof Error) {
    PrinterService.printError(reason.stack);
    return;
  }

  PrinterService.printWarn(`出现了未处理Promise REJECTED:: ${reason}`);
});

process.on('uncaughtException', (reason, exception) => {
  PrinterService.printError(reason.stack);
});
