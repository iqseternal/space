// @ts-nocheck

const arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];

let res = 0;
let currentRes = 0;

for (let i = 0;i < arr.length;i ++) {
  currentRes = currentRes + arr[i];

  if (currentRes > 0) {
    res = Math.max(res, currentRes);
  }
  else currentRes = 0;
}

console.log(res);
