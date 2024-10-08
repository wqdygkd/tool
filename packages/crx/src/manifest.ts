import { defineManifest } from '@crxjs/vite-plugin'
// @ts-ignore
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png'
  },

  // 点击插件按钮弹出页面
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: 'img/logo-48.png'
  },
  // 右键插件-选项
  options_page: 'src/options/index.html',
  // options_ui: {
  //   page: 'src/options/index.html'
  // },

  // 调试控制台
  devtools_page: 'src/devtools/index.html',

  // 常驻后台
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module'
  },
  // 需要直接注入页面的JS
  // content-scripts和原始页面共享DOM，但是不共享JS，如要访问页面JS（例如某个JS变量），只能通过injected js来实现
  content_scripts: [
    {
      matches: ['<all_urls>'], // 所有页面
      // 多个JS按顺序注入
      js: ['src/contentScript/index.ts'],
      run_at: 'document_start'
    }
    // {
    //   matches: ['<all_urls>'], // 所有页面
    //   // 多个JS按顺序注入
    //   js: ['js/jquery-1.8.3.js', 'js/content-script.js'],
    //   // css的注
    //   css: ['css/custom.css'],
    //   // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
    //   run_at: 'document_start'
    // },
    // {
    //   matches: ['http://*/*', 'https://*/*'],
    //   js: ['src/contentScript/index.ts']
    // }
  ],
  side_panel: {
    default_path: 'src/sidepanel/index.html'
  },

  // 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: ['<all_urls>']
    },
    {
      matches: ['<all_urls>'], // 所有页面
      resources: ['src/injectScript/index.js']
    }
  ],
  permissions: [
    'sidePanel',
    'storage', // 插件本地存储
    'contextMenus', // 右键菜单
    'tabs', // 标签
    'scripting' // 向页面注入 css js
    // 'notifications', // 通知
    // 'webRequest', // web请求
    // 'webRequestBlocking',
    // 'http://*/*', // 可以通过executeScript或者insertCSS访问的网站
    // 'https://*/*' // 可以通过executeScript或者insertCSS访问的网站
  ],

  // 覆盖特定页面  ，一个插件只能替代一个默认页
  chrome_url_overrides: {
    newtab: 'src/newtab/index.html', // 覆盖浏览器默认的新标签页
    // history: 'history.html',
    // bookmarks: 'bookmarks.html'
  },
  // 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
  omnibox: { keyword: 'tool' }
})
