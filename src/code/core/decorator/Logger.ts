
import { getCurFullDate } from '../common/common';

const createLogMessage = (type: 'info' | 'warn' | 'error', message: string) => {
  return `[${getCurFullDate()}] [levell: ${type}] ${message}`;
}

export function LoggerWarn() {

}

export function LoggerError() {

}

export function LoggerInfo() {

}

export default { LoggerWarn, LoggerError, LoggerInfo };
