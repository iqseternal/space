
import { rsaGetKey, aesEncrypt, aesDecrypt } from '@suey/pkg-utils';
import { printClear, printError, Printer, printInfo, printWarn } from '@suey/printer';


const [pubKey] = rsaGetKey({
  bytes: 1024
})


printInfo(pubKey, pubKey);
