export default {
  name: '网页限制解除',
  namespace: '@wqdy',
  version: '0.0.0',
  description: '解除禁止复制、剪切、选择文本、右键菜单的限制',
  author: 'zhang333',
  match: ['://blog.csdn.net/*'],
  'run-at': 'document-start',
  grant: ['unsafeWindow', 'GM_getValue', 'GM_setValue', 'GM_setClipboard', 'GM_addStyle'],
  icon: ''
}
