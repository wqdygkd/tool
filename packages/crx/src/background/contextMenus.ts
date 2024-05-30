// https://developer.chrome.com/docs/extensions/reference/api/contextMenus?hl=zh-cn

// 右键一级菜单
chrome.contextMenus.create({
  title: '开启/关闭页面编辑',
  id: 'editHtml',
  contexts: ['all'], // 上下文环境，可选：["all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"]，默认page
  type: 'normal' // "normal", "checkbox", "radio", "separator"
})

// 右键二级菜单-关闭
chrome.contextMenus.create(
  {
    title: '关闭',
    id: 'editHtmlOff',
    parentId: 'editHtml',
    contexts: ['all'],
    type: 'radio', // "normal", "checkbox", "radio", "separator"
    checked: true
  },
  () => {
    console.log('OFF contextMenus are created.')
  }
)

// 右键二级菜单-开启
chrome.contextMenus.create(
  {
    title: '开启',
    id: 'editHtmlOn',
    parentId: 'editHtml',
    contexts: ['all'],
    type: 'radio', // "normal", "checkbox", "radio", "separator"
    checked: false
  },
  () => {
    console.log('ON contextMenus are created.')
  }
)

// 监听右键菜单被点击事件
chrome.contextMenus.onClicked.addListener((menuInfo, tabInfo) => {
  // 菜单信息，具体内容请自行查看调试窗口的调试日志
  console.log('menuInfo:', JSON.stringify(menuInfo))
  // 页面信息，具体内容请自行查看调试窗口的调试日志
  console.log('tabInfo:', JSON.stringify(tabInfo))

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },
    (tabs) => {
      // 页签信息，具体内容请自行查看调试窗口的调试日志
      console.log('tabs:', JSON.stringify(tabs))
      // 向当前页签（即tabs[0]）发送消息
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          menuInfo: menuInfo,
          tabInfo: tabInfo,
          msg: 'msg from background'
        },
        (res) => {
          console.info(JSON.stringify('res:', res))
          if (res) {
            // 发送系统通知
            chrome.notifications.create('reminder', {
              type: 'basic',
              iconUrl: 'notifications.png',
              title: '出错！！!',
              message: '开启页面编辑出错！！!' + JSON.stringify(res)
            })
            return
          }
          // 发送系统通知
          chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: './notifications.png', // 通知使用的图标
            title: (menuInfo.menuItemId == 'editHtmlOn' ? '已开启' : '已关闭') + '编辑功能', // 通知标题，一定要有内容，哪怕是空字符串，否则不会发送通知
            message: '当前页面已' + (menuInfo.menuItemId == 'editHtmlOn' ? '开启' : '关闭') + '编辑功能' // 通知内容，一定要有内容，哪怕是空字符串，否则不会发送通知
          })
        }
      )
    }
  )
})
