function GM_getValue(key: string, defaultValue: any) {
  let value
  try {
    value = JSON.parse(sessionStorage.getItem('GM_hock_' + key) as string)
  } finally {
    return value || defaultValue
  }
}
function GM_setValue(key: string, value: any) {
  sessionStorage.setItem('GM_hock_' + key, JSON.stringify(value))
}

function GM_addStyle (value: any) {
  const style = document.createElement('style')
  style.innerHTML = value
  document.head.appendChild(style)
}

if (process.env.NODE_ENV !== 'production') {
  window.unsafeWindow = window as typeof unsafeWindow
  window.GM_getValue = GM_getValue
  window.GM_setValue = GM_setValue
  window.GM_addStyle = GM_addStyle
  window.GM_registerMenuCommand = (() => {}) as any
}
