// ==UserScript==
// @name         switcher-useragent
// @namespace    http://tampermonkey.net/
// @version      0.0.1
// @description
// @icon
// @author       zhang333
// @include      *://wx.gptalk.today*
// @match
// @exclude
// @connect
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  var script = document.getElementById("useragent-switcher")
  if (script) script.parentNode.removeChild(script)
  script = document.createElement("script")
  script.setAttribute("type", "text/javascript");
  script.setAttribute("id", "useragent-switcher");

  script.textContent = 'Object.defineProperty(navigator, "userAgent", {  value: "Mozill/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",  writable: false  })'

  var T_runUA = setInterval(() => {
    if (document.head && document.head.prepend) {
      clearInterval(T_runUA);
      document.head.prepend(script);
    }
  }, 10)

  function switcher(value) {
    Object.defineProperty(window.unsafeWindow.navigator, 'userAgent', {
      value,
      writable: false
    })
  }
  switcher('Mozill/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36')
  // navigator.defineGetter("userAgent", function () { return "Mozillbbb/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36" })

  const originFetch = fetch
  console.log(originFetch)
  window.unsafeWindow.fetch = (url, options) => {
    console.log(options)
    return originFetch(url, options).then(async (response) => {
      console.log(url)
      if (url === '/api/chatgpt/recharge/info') {
        const responseClone = response.clone()
        let res = await responseClone.json()
        // res.data.push('油猴脚本修改数据')
        console.log(res)
        res.data.left_times = 5
        res.data.used_times = 0
        const responseNew = new Response(JSON.stringify(res), response)
        return responseNew
      } else {
        return response
      }
    })
  }
})()
