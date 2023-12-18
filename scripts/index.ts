
import { rsaGetKey, aesEncrypt, aesDecrypt } from '@suey/pkg-utils';
import { printClear, printError, Printer, printInfo, printWarn } from '@suey/printer';

// const [pubKey] = rsaGetKey({
//   bytes: 1024
// })

// printInfo(pubKey, pubKey);

const notCamelCaseRegex = /^((?=^.*\/.*\.vue$)(.*\/)((index)|([A-Z].*))\.vue$)|(^.*(?<!^.*\/.*\.vue$))$/;

// 示例用法
const strings = ['c://sadsadas/sadasdasdcasc/a.vue', 'c:/as/ABC123.ts', 'c:/asd/camelCase.vue', 'x:/asdsadas/12345.vue', 'C:/asd/CamelCase.vue', 'C:/asdasdsa/index.vue', 'a.ts', 'A.ts', 'a.scss'];

strings.forEach(str => {

  if (notCamelCaseRegex.test(str)) {
    console.log(`${str}: 字符串符合规则`);
  } else {
    console.log(`${str}: 字符串不符合规则`);
  }
});
