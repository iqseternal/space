import { apiGet } from "./utils/request";

const obtainHTML = (url: string) => apiGet(url, {
  timeout: 5000
});

obtainHTML('https://www.pexels.com/').then(res => {
  const html = res.data;

  const reg = /<img src=[\'\"]?([^\'\"]*)[\'\"]?/g;

  if (typeof html !== 'string') return;

  const arr = [...html.matchAll(reg)].map(_ => _[1]);

  console.log(arr);
});

