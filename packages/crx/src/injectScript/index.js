// 该脚本会注入到真实页面中
console.info('injectScript is running')
let realConsole
let isInJectConsole

function injectRealConsole () {
  const iframe = document.createElement('iframe')
  iframe.style.width = '0'
  iframe.style.height = '0'
  iframe.style.border = 'none'
  iframe.style.display = 'block'
  document.body.append(iframe)
  realConsole = iframe.contentWindow.console

  for (const item of ['log', 'info']) {
    Object.defineProperty(window.console, item, {
      get () {
        return isInJectConsole ? realConsole[item] : window.console[item]
      },
      set () {}
    })
  }

  window.addEventListener('message', e => {
    console.log(e)
    isInJectConsole = e.data
  }, false)
}

injectRealConsole()

// 修改计时器速度
// 修改new Date() 默认时间
