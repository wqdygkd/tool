https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=zh-cn
https://github.com/GoogleChrome/chrome-extensions-samples/tree/main

https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html

Chrome插件的JS主要可以分为这5类：injected script、content-script、popup js、background js和devtools js
5种类型的JS对比

| JS种类          | 可访问的API                                    | DOM访问情况  | JS访问情况 | 直接跨域 |
| --------------- | ---------------------------------------------- | ------------ | ---------- | -------- |
| injected-script | 和普通JS无任何差别，不能访问任何扩展API        | 可以访问     | 可以访问   | 不可以   |
| content script  | 只能访问 extension、runtime等部分API           | 可以访问     | 不可以     | 不可以   |
| popup js        | 可访问绝大部分API，除了devtools系列            | 不可直接访问 | 不可以     | 可以     |
| background js   | 可访问绝大部分API，除了devtools系列            | 不可直接访问 | 不可以     | 可以     |
| devtools js     | 只能访问 devtools、extension、runtime等部分API | 可以         | 可以       | 不可以   |

互相通信

| -               | injected-script                      | content-script                               | popup-js                                          | background-js                                      |
| --------------- | ------------------------------------ | -------------------------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| injected-script | -                                    | window.postMessage                           | -                                                 | -                                                  |
| content-script  | window.postMessage                   | -                                            | chrome.runtime.sendMessage chrome.runtime.connect | chrome.runtime.sendMessage  chrome.runtime.connect |
| popup-js        | -                                    | chrome.tabs.sendMessage  chrome.tabs.connect | -                                                 | chrome.extension.getBackgroundPage()              |
| background-js   | -                                    | chrome.tabs.sendMessage chrome.tabs.connect  | chrome.extension.getViews                         | -                                                  |
| devtools-js     | chrome.devtools.inspectedWindow.eval | -                                            | chrome.runtime.sendMessage                        | chrome.runtime.sendMessage                         |

injected-script <=> content.js <=> background.js <=> [options.js, popup.js]

sendMessage(from, to, data) {
  from => background  content injected popup options
  to => background  content injected popup options
}

onMessage(from, to, data) {

}
