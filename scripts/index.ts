
import { rsaGetKey, aesEncrypt, aesDecrypt, rsaEncryptAlgorithm, rsaDecryptAlgorithm } from '@suey/pkg-utils';
import { printClear, printError, Printer, printInfo, printWarn, print } from '@suey/printer';

const [pubKey, priKey] = rsaGetKey({
  bytes: 1024
});

// print(pubKey, priKey);

const text = 'Hello';

const encryptText = rsaEncryptAlgorithm(text, pubKey);

const decryptText = rsaDecryptAlgorithm(encryptText, priKey);

print(encryptText, decryptText);
