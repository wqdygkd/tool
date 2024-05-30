/// <reference types="vite/client" />

interface Window {
  __realConsole: any
  [key: string]: any
}

declare
{
  var __namespace: string
  var __APP_ENV__: string
}
