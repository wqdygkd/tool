console.log('background is running')
import './contextMenus'
import './runtime.onInstalled'
import './action.onClicked'

chrome.runtime.onMessage.addListener((request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }
})
