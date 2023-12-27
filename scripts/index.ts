
import { rsaGetKey, aesEncrypt, aesDecrypt, rsaEncryptAlgorithm, rsaDecryptAlgorithm } from '@suey/pkg-utils';
import { printClear, printError, Printer, printInfo, printWarn, print } from '@suey/printer';

const map = new WeakMap();

const obj = {
  value: 1
};
const obj2 = {
  value: 1
}

// map.set(obj, 1);
map.set({}, 1);


print(map.get({}));
