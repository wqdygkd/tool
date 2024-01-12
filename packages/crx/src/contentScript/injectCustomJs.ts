// 向页面注入JS
export default function (jsPath: string): void {
  // jsPath需要在 web_accessible_resources 中配置
  var temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  temp.src = chrome.runtime.getURL(jsPath) // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    // this.parentNode.removeChild(this);
  }
  document.head.appendChild(temp)
}
