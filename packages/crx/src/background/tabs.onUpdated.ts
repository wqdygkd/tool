chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log('onUpdated', tabId, changeInfo, tab)
  if (changeInfo.status === 'loading') {
    // chrome.runtime.sendMessage({ type: 'winex.console', value: 'update' })
    // chrome.scripting
    // .executeScript({
    //   target : { tabId },
    //   files : [ "contentScript/console.js" ],
    // })
    // .then(() => console.log("script injected on target frames"));
  }
})
