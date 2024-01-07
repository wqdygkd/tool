chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === 'install') {
    await chrome.storage.local.clear()
    // 插件安装后打开页面
    // chrome.tabs.create({
    //   active: true,
    //   url: chrome.runtime.getURL('./src/install/index.html'),
    // })
  }

  // 插件更新后打开页面
  if (opt.reason === 'update') {
    // chrome.tabs.create({
    //   active: true,
    //   url: chrome.runtime.getURL('./src/update/index.html'),
    // })
  }

  chrome.action.setBadgeText({
    text: 'OFF'
  })
})
