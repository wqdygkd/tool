// 插件按钮点击 如果有pop 此行为将失效
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
