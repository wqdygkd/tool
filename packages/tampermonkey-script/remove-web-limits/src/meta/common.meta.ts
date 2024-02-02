export default {
  name: '网页限制解除',
  namespace: '@wqdy',
  version: '0.0.0',
  description: '网页限制解除',
  author: 'zhang333',
  match: ['://*/*'],
  'run-at': 'document-start',
  grant: ['unsafeWindow', 'GM_getValue', 'GM_setValue', 'GM_registerMenuCommand'],
  require: ['https://cdn.jsdelivr.net/npm/vue@3.4.13/dist/vue.global.js'],
  icon: ''
}
