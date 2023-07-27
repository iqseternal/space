
import { printWarn } from "@suey/printer";

process.on('unhandledRejection', (reason, promise) => {
  printWarn(`Unhandled Promise Rejection: ${reason}`);
});
