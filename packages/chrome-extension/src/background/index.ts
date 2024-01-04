console.log('background is running')

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})

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

// 插件按钮点击
chrome.action.onClicked.addListener(async tab => {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id })
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  })

  if (nextState === 'ON') {
    console.log('ON')
    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        files: ['script.js']
      })
      .then(() => console.log('script injected'))
  } else if (nextState === 'OFF') {
    console.log('OFF')
  }
})
