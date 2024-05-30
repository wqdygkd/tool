// ==UserScript==
// @name         Your Script (dev mode)
// @namespace    https://your.site/
// @version      0.1.0
// @description  What does your script do
// @author       zhang333
// @match        https://127.0.0.1:7051/*
// @grant        GM_addElement
// ==/UserScript==

(function () {
  'use strict'
  // source: https://cn.vitejs.dev/guide/backend-integration.html
  GM_addElement('script', {
    src: 'http://localhost:5173/@vite/client',
    type: 'module'
  })

  GM_addElement('script', {
    src: 'http://localhost:5173/src/main.ts',
    type: 'module'
  })
})()
