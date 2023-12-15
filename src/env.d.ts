/// <reference types="vite/client" />

declare module 'app.config.json' {
  import json from '#/../app.config.json';
  export type AppJsonType = typeof json;
}

declare module 'user.config.json' {
  import json from '#/../user.config.json';
  export type UserJsonType = typeof json;
}

