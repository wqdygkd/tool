// ==UserScript==
// @name         fetch-hook
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description
// @icon
// @author       zhang333
// @include
// @match
// @exclude
// @connect
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  const originFetch = fetch
  console.log(originFetch)
  window.unsafeWindow.fetch = (url, options) => {
    console.log(options)
    return originFetch(url, options).then(async response => {
      console.log(url)
      if (url === '/api/chatgpt/recharge/info') {
        const responseClone = response.clone()
        const res = await responseClone.json()
        res.data.push('油猴脚本修改数据')
        const responseNew = new Response(JSON.stringify(res), response)
        console.log(responseNew)
        return responseNew
      } else {
        return response
      }
    })
  }
})()
