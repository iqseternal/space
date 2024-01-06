import { print, toColor, printClear, type PrintTargetType, toPrintClear } from '@suey/printer';
import { getCurDate, getCurFullDate, getCurTime } from '../core/common/common';
import { AppConfigService } from './AppConfigService';

const appConfigService = AppConfigService.getInstance();
type PrintColor = ReturnType<typeof toColor>;

/**
 * 按照格式创建打印的Message信息
 * @param appColor
 * @param timeColor
 * @param typeColor
 * @param typeMessage
 * @param thread
 * @param messageColor
 * @param message
 * @returns
 */
function makePrintMessage(
  appColor: PrintColor,
  timeColor: PrintColor,
  typeColor: PrintColor, typeMessage: string,
  thread: string, messageColor: PrintColor,
  ...message: unknown[]
) {
  const ms = message.reduce((pre: string, cur: unknown) => pre + cur, `[${appConfigService.config.appName.toUpperCase()}] [${getCurFullDate()}] [${typeMessage}] [${thread}:]`);
  return {
    ms,
    typeMs: [
      appColor, `[${appConfigService.config.appName.toUpperCase()}]`,
      toPrintClear(),
      timeColor, `[${getCurFullDate()}]`,
      toPrintClear(),
      typeColor, `${typeMessage}`,
      toPrintClear(),
      toColor(['cyan']), `[${thread}]:`,
      toPrintClear(),
      messageColor, ...message,
      toPrintClear()
    ]
  }
}

export class PrinterService {
  /**
   * 打印一条普通日志，蓝色
   * @param message
   */
  static printInfo(...message: unknown[]) {
    print(
      ...makePrintMessage(
        toColor(['magenta', 'bright']),
        toColor(['cyan', 'bright']),
        toColor(['blue', 'underline']), 'INFO',
        'MAIN',
        toColor(['blue']),
        ...message
      ).typeMs
    );
  }

  /**
   * 打印一条警告信息
   * @param message
   */
  static printWarn(...message: unknown[]) {
    print(
      ...makePrintMessage(
        toColor(['magenta', 'bright']),
        toColor(['cyan', 'bright']),
        toColor(['yellow', 'underline']), 'WARN',
        'MAIN',
        toColor(['yellow']),
        ...message
      ).typeMs
    );
  }

  /**
   * 打印一条错误信息
   * @param message
   */
  static printError(...message: unknown[]) {
    print(
      ...makePrintMessage(
        toColor(['magenta', 'bright']),
        toColor(['cyan', 'bright']),
        toColor(['red', 'underline']), 'ERROR',
        'MAIN',
        toColor(['red']),
        ...message
      ).typeMs
    );
  }
}
