
import { print, toColor, printClear, type PrintTargetType, toPrintClear } from '@suey/printer';
import { getCurDate, getCurFullDate, getCurTime } from '../core/common/common';

import appConfig from '../../../app.config.json';

type PrintColor = ReturnType<typeof toColor>;

function makePrintMessage(
  appColor: PrintColor,
  timeColor: PrintColor,
  typeColor: PrintColor, typeMessage: string,
  thread: string,
  ...message: unknown[]
) {
  const ms = message.reduce((pre: string, cur: unknown) => pre + cur, `[${appConfig.appName.toUpperCase()}] [${getCurFullDate()}] [${typeMessage}] [${thread}:]`);
  return {
    ms,
    typeMs: [
      appColor, `[${appConfig.appName.toUpperCase()}]`,
      toPrintClear(), ' ',
      timeColor, `[${getCurFullDate()}]`,
      toPrintClear(), ' ',
      typeColor, `${typeMessage}`,
      toPrintClear(), ' ',
      toColor(['cyan']), `[${thread}]:`,
      toPrintClear(), ' ',
      ...message,
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
        ...message
      ).typeMs
    );
  }
}
