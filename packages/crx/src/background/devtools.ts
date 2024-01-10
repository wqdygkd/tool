// 监听页面更新
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('onUpdated', tabId, changeInfo, tab)
  if (changeInfo.status === 'loading') {
    chrome.runtime.sendMessage({ type: 'winex.console', value: 'update' })
  }
})
