
import { rsaGetKey } from '@suey/pkg-utils';


const [pubKey, priKey] = rsaGetKey({
  bytes: 1024
});


console.log(pubKey, priKey);
