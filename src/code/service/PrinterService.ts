import { print, toColor, printClear, type PrintTargetType, toPrintClear } from '@suey/printer';
import { getCurDate, getCurFullDate, getCurTime } from '../core/common/common';
import { AppConfigService } from './AppConfigService';

const appConfigService = AppConfigService.getInstance();
type PrintColor = ReturnType<typeof toColor>;

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
      toPrintClear(), ' ',
      timeColor, `[${getCurFullDate()}]`,
      toPrintClear(), ' ',
      typeColor, `${typeMessage}`,
      toPrintClear(), ' ',
      toColor(['cyan']), `[${thread}]:`,
      toPrintClear(), ' ',
      messageColor, ...message,
      toPrintClear()
    ]
  }
}

export class PrinterService {
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
